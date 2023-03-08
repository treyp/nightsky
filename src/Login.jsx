import { useState, useRef, useContext } from "react";
import { getLocalStorage } from "./utils/localStorage";
import { SERVICE_LOCAL_STORAGE_KEY } from "./consts";
import { AuthContext } from "./App";
import { attemptLogin } from "./utils/session";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const form = useRef(null);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const onFormSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const formData = new FormData(form.current);
    const service = formData.get("service");
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    attemptLogin(setSubmitting, authDispatch, service, identifier, password);
  };

  return (
    <form ref={form} className="login" onSubmit={onFormSubmit}>
      <fieldset disabled={isSubmitting}>
        <legend>Sign in</legend>
        <label htmlFor="service">Service</label>{" "}
        <input
          type="text"
          id="service"
          name="service"
          required
          placeholder="https://bsky.social"
          defaultValue={
            getLocalStorage(SERVICE_LOCAL_STORAGE_KEY) || "https://bsky.social"
          }
        />
        <br />
        <label htmlFor="identifier">Identifier</label>{" "}
        <input type="text" id="identifier" name="identifier" required />
        <br />
        <label htmlFor="password">Password</label>{" "}
        <input type="password" id="password" name="password" required />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}
