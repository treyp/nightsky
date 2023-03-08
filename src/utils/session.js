import { AtpAgent } from "@atproto/api";
import {
  AUTH_ACTION_LOGIN_SUCCESS,
  AUTH_ACTION_RESUME_SESSION_SUCCESS,
  SERVICE_LOCAL_STORAGE_KEY,
  SESSION_LOCAL_STORAGE_KEY,
} from "../consts";
import { getLocalStorage } from "./localStorage";

export function attemptResumeSession(setResuming, authDispatch) {
  const service = getLocalStorage(SERVICE_LOCAL_STORAGE_KEY);
  const agent = new AtpAgent({
    service: service,
  });
  let session;
  try {
    session = JSON.parse(getLocalStorage(SESSION_LOCAL_STORAGE_KEY));
  } catch (error) {
    console.error("Could not deserialize session data");
    return;
  }
  setResuming(true);
  agent.resumeSession(session).then(
    ({ success, data }) => {
      if (!success) {
        console.error("Resume session failed");
        setResuming(false);
        return;
      }
      console.log("Resume session success", success, data);
      authDispatch({
        type: AUTH_ACTION_RESUME_SESSION_SUCCESS,
        payload: {
          service: service,
          session: data,
          agent: agent,
        },
      });
      setResuming(false);
    },
    (reason) => {
      console.error("Resume session failure", reason);
      setResuming(false);
    }
  );
}

export function attemptLogin(
  setSubmitting,
  authDispatch,
  service,
  identifier,
  password
) {
  setSubmitting(true);

  const agent = new AtpAgent({ service: service });

  agent.login({ identifier: identifier, password: password }).then(
    ({ success, data }) => {
      if (!success) {
        console.error("Login failed");
        setSubmitting(false);
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
      setSubmitting(false);
    },
    (reason) => {
      console.error("Login failure", reason);
      setSubmitting(false);
    }
  );
}
