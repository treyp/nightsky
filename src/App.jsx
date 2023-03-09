import { useReducer, createContext, useEffect, useState } from "react";
import Login from "./routes/Login";
import {
  getLocalStorage,
  removeItemLocalStorage,
  setLocalStorage,
} from "./utils/localStorage";
import {
  AUTH_ACTION_LOGIN_SUCCESS,
  AUTH_ACTION_LOGOUT,
  AUTH_ACTION_RESUME_SESSION_SUCCESS,
  SERVICE_LOCAL_STORAGE_KEY,
  SESSION_LOCAL_STORAGE_KEY,
} from "./consts";
import { attemptResumeSession } from "./utils/session";
import Home from "./routes/Home";
import Nav from "./sections/Nav";
import Content from "./sections/Content";

export const AuthContext = createContext();
const initialAuthState = {
  service: null,
  session: null,
  agent: null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_RESUME_SESSION_SUCCESS:
      return {
        service: action.payload.service,
        session: action.payload.session,
        agent: action.payload.agent,
      };
    case AUTH_ACTION_LOGIN_SUCCESS:
      setLocalStorage(SERVICE_LOCAL_STORAGE_KEY, action.payload.service);
      setLocalStorage(
        SESSION_LOCAL_STORAGE_KEY,
        JSON.stringify(action.payload.session)
      );
      return {
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

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const [isResuming, setResuming] = useState(false);

  // Attempt to resume session on page load
  useEffect(() => {
    if (!authState.session && getLocalStorage(SESSION_LOCAL_STORAGE_KEY)) {
      attemptResumeSession(setResuming, authDispatch);
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
        attemptResumeSession(setResuming, authDispatch);
      }
    }
    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 text-white">
        <div className="flex">
          <Nav />
          <Content>
            {!authState.session && !isResuming && <Login />}
            {isResuming && (
              <p className="text-lg">Attempting to resume session…</p>
            )}
            {authState.session && <Home />}
          </Content>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
