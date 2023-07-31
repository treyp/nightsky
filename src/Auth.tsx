/* eslint-disable react-refresh/only-export-components */
import {
  useReducer,
  createContext,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import {
  getLocalStorage,
  removeItemLocalStorage,
  setLocalStorage,
} from "./utils/localStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { AtpAgent } from "@atproto/api";
import { OutputSchema } from "@atproto/api/dist/client/types/com/atproto/server/getSession";

// Local storage keys
const SERVICE_LOCAL_STORAGE_KEY = "service";
const SESSION_LOCAL_STORAGE_KEY = "session";

// Auth reducer action types
const AUTH_ACTION_INIT_COMPLETE = "INIT_COMPLETE";
const AUTH_ACTION_RESUME_SESSION = "RESUME_SESSION";
const AUTH_ACTION_RESUME_SESSION_FAIL = "RESUME_SESSION_FAIL";
const AUTH_ACTION_RESUME_SESSION_SUCCESS = "RESUME_SESSION_SUCCESS";
const AUTH_ACTION_LOGIN_SUCCESS = "LOGIN_SUCCESS";
const AUTH_ACTION_LOGOUT = "LOGOUT";

interface AuthState {
  service?: string;
  session?: OutputSchema;
  agent?: AtpAgent;
  isResuming: boolean;
  isInitialized: boolean;
}

const initialAuthState: AuthState = {
  service: undefined,
  session: undefined,
  agent: undefined,
  isResuming: false,
  isInitialized: false,
};

type AuthSuccessResponse = Required<
  Pick<AuthState, "service" | "session" | "agent">
>;

type AuthReducerAction =
  | { type: typeof AUTH_ACTION_INIT_COMPLETE }
  | { type: typeof AUTH_ACTION_RESUME_SESSION }
  | { type: typeof AUTH_ACTION_RESUME_SESSION_FAIL }
  | {
      type: typeof AUTH_ACTION_RESUME_SESSION_SUCCESS;
      payload: AuthSuccessResponse;
    }
  | {
      type: typeof AUTH_ACTION_LOGIN_SUCCESS;
      payload: AuthSuccessResponse;
    }
  | { type: typeof AUTH_ACTION_LOGOUT };

const authReducer = (state: AuthState, action: AuthReducerAction) => {
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
        session: undefined,
        agent: undefined,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthReducerAction>;
  login: (
    service: string,
    identifier: string,
    password: string
  ) => Promise<OutputSchema>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  // Attempt to resume session on page load
  useEffect(() => {
    if (!authState.session) {
      if (getLocalStorage(SESSION_LOCAL_STORAGE_KEY)) {
        attemptResumeSession(authDispatch).finally(() => {
          authDispatch({ type: AUTH_ACTION_INIT_COMPLETE });
        });
      } else {
        authDispatch({ type: AUTH_ACTION_INIT_COMPLETE });
      }
    }
  }, [authState.session]);

  // Respond to storage changes from another document.
  // The `storage` event only fires when session is updated in another document,
  // not the current one:
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
  useEffect(() => {
    function handleStorageEvent(storageEvent: StorageEvent) {
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

  const login: AuthContextType["login"] = (service, identifier, password) => {
    return attemptLogin(authDispatch, service, identifier, password);
  };

  const logout: AuthContextType["logout"] = () => {
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

export function RequireAuth({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (state.isInitialized && !state.agent) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they sign in.
    navigate("/login", { state: { from: location }, replace: true });
    return null;
  }

  return <>{children}</>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext has not been provided");
  }
  return context;
}

export function getLastUsedService() {
  return getLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
}

// Returns a promise that resolves when resuming session was successful, rejects when not
export function attemptResumeSession(
  authDispatch: AuthContextType["dispatch"]
): Promise<AuthSuccessResponse> {
  return new Promise((resolve, reject) => {
    const service = getLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
    if (!service) {
      const errorReason = "Service not specified in localStorage";
      console.error(errorReason);
      reject(errorReason);
      return;
    }
    const agent = new AtpAgent({
      service: service,
    });
    let session;
    const savedSession = getLocalStorage(SESSION_LOCAL_STORAGE_KEY);
    if (!savedSession) {
      const errorReason = "Session not found in localStorage";
      console.error(errorReason);
      reject(errorReason);
      return;
    }
    try {
      session = JSON.parse(savedSession);
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
export function attemptLogin(
  authDispatch: AuthContextType["dispatch"],
  service: string,
  identifier: string,
  password: string
): Promise<OutputSchema> {
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
