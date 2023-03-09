import { useState, useRef, useContext } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { SERVICE_LOCAL_STORAGE_KEY } from "../consts";
import { AuthContext } from "../App";
import { attemptLogin } from "../utils/session";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

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
    <form ref={form} onSubmit={onFormSubmit}>
      <fieldset disabled={isSubmitting} className="w-80">
        <legend className="text-3xl block">Sign in</legend>
        <Label>
          Service
          <Input
            type="text"
            name="service"
            required
            placeholder="https://bsky.social"
            defaultValue={
              getLocalStorage(SERVICE_LOCAL_STORAGE_KEY) ||
              "https://bsky.social"
            }
          />
        </Label>
        <Label>
          Username or email address
          <Input type="text" id="identifier" name="identifier" required />
        </Label>
        <Label>
          Password
          <Input type="password" id="password" name="password" required />
        </Label>
        <Button type="submit" className="mt-8">
          Sign in
        </Button>
      </fieldset>
    </form>
  );
}
