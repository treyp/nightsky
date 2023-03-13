import { useReducer, createContext, useEffect, useContext } from "react";
import {
  getLocalStorage,
  removeItemLocalStorage,
  setLocalStorage,
} from "./utils/localStorage";
import { Navigate, useLocation } from "react-router-dom";
import { AtpAgent } from "@atproto/api";

// Local storage keys
export const SERVICE_LOCAL_STORAGE_KEY = "service";
export const SESSION_LOCAL_STORAGE_KEY = "session";

// Auth reducer action types
export const AUTH_ACTION_INIT_COMPLETE = "INIT_COMPLETE";
export const AUTH_ACTION_RESUME_SESSION = "RESUME_SESSION";
export const AUTH_ACTION_RESUME_SESSION_FAIL = "RESUME_SESSION_FAIL";
export const AUTH_ACTION_RESUME_SESSION_SUCCESS = "RESUME_SESSION_SUCCESS";
export const AUTH_ACTION_LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const AUTH_ACTION_LOGOUT = "LOGOUT";

const initialAuthState = {
  service: null,
  session: null,
  agent: null,
  isResuming: false,
  isInitialized: false,
};

const authReducer = (state, action) => {
  console.log("Auth reducer action dispatched", action.type);
  switch (action.type) {
    case AUTH_ACTION_INIT_COMPLETE:
      return { ...state, isInitialized: true };
    case AUTH_ACTION_RESUME_SESSION:
      return { ...state, isResuming: true };
    case AUTH_ACTION_RESUME_SESSION_FAIL:
      return { ...state, isResuming: false };
    case AUTH_ACTION_RESUME_SESSION_SUCCESS:
      return {
        ...state,
        service: action.payload.service,
        session: action.payload.session,
        agent: action.payload.agent,
        isResuming: false,
      };
    case AUTH_ACTION_LOGIN_SUCCESS:
      setLocalStorage(SERVICE_LOCAL_STORAGE_KEY, action.payload.service);
      setLocalStorage(
        SESSION_LOCAL_STORAGE_KEY,
        JSON.stringify(action.payload.session)
      );
      return {
        ...state,
        service: action.payload.service,
        session: action.payload.session,
        agent: action.payload.agent,
      };
    case AUTH_ACTION_LOGOUT:
      removeItemLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
      removeItemLocalStorage(SESSION_LOCAL_STORAGE_KEY);
      return {
        ...state,
        session: null,
        agent: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // Attempt to resume session on page load
  useEffect(() => {
    if (!authState.session && getLocalStorage(SESSION_LOCAL_STORAGE_KEY)) {
      attemptResumeSession(authDispatch).finally(() => {
        authDispatch({ type: AUTH_ACTION_INIT_COMPLETE });
      });
    } else {
      authDispatch({ type: AUTH_ACTION_INIT_COMPLETE });
    }
  }, []);

  // Respond to storage changes from another document.
  // The `storage` event only fires when session is updated in another document,
  // not the current one:
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
  useEffect(() => {
    function handleStorageEvent(storageEvent) {
      if (storageEvent.storageArea !== localStorage) {
        return;
      }
      if (
        storageEvent.key === null ||
        storageEvent.key === SESSION_LOCAL_STORAGE_KEY ||
        storageEvent.key === SERVICE_LOCAL_STORAGE_KEY
      ) {
        attemptResumeSession(authDispatch);
      }
    }
    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const login = (service, identifier, password) => {
    return attemptLogin(authDispatch, service, identifier, password);
  };

  const logout = () => {
    authDispatch({ type: AUTH_ACTION_LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ state: authState, dispatch: authDispatch, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }) {
  let { state } = useAuth();
  let location = useLocation();

  if (state.isInitialized && !state.agent) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they sign in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getLastUsedService() {
  return getLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
}

// Returns a promise that resolves when resuming session was successful, rejects when not
export function attemptResumeSession(authDispatch) {
  return new Promise((resolve, reject) => {
    const service = getLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
    const agent = new AtpAgent({
      service: service,
    });
    let session;
    try {
      session = JSON.parse(getLocalStorage(SESSION_LOCAL_STORAGE_KEY));
    } catch (error) {
      const errorReason = "Could not deserialize session data";
      console.error(errorReason);
      reject(errorReason);
      return;
    }
    authDispatch({ type: AUTH_ACTION_RESUME_SESSION });
    agent.resumeSession(session).then(
      ({ success, data }) => {
        if (!success) {
          const errorReason = "Resume session failed";
          console.error(errorReason);
          authDispatch({ type: AUTH_ACTION_RESUME_SESSION_FAIL });
          reject(errorReason);
          return;
        }
        console.log("Resume session success", success, data);
        const payload = {
          service: service,
          session: data,
          agent: agent,
        };
        authDispatch({
          type: AUTH_ACTION_RESUME_SESSION_SUCCESS,
          payload,
        });
        resolve(payload);
      },
      (reason) => {
        console.error("Resume session failure", reason);
        authDispatch({ type: AUTH_ACTION_RESUME_SESSION_FAIL });
        reject(reason);
      }
    );
  });
}

// Returns a promise that resolves when login was successful, rejects when not
export function attemptLogin(authDispatch, service, identifier, password) {
  return new Promise((resolve, reject) => {
    const agent = new AtpAgent({ service: service });

    agent.login({ identifier: identifier, password: password }).then(
      ({ success, data }) => {
        if (!success) {
          console.error("Login failed");
          reject();
          return;
        }
        console.log("Login success", success, data);
        authDispatch({
          type: AUTH_ACTION_LOGIN_SUCCESS,
          payload: {
            service: service,
            session: data,
            agent: agent,
          },
        });
        resolve(data);
      },
      (reason) => {
        console.error("Login failure", reason);
        reject(reason);
      }
    );
  });
}
