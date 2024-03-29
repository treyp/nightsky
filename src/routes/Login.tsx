import { useState, useRef, FormEvent } from "react";
import { getLastUsedService, useAuth } from "../Auth";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import FormControl from "../components/FormControl";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [isSubmitting, setSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onFormSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (!form.current) {
      return;
    }

    const formData = new FormData(form.current);
    const service = formData.get("service") as string;
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    setSubmitting(true);
    login(service, identifier, password)
      .then(() => {
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 0);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form ref={form} onSubmit={onFormSubmit} className="w-full max-w-xs px-4">
      <fieldset disabled={isSubmitting}>
        <legend className="text-center text-xl font-bold block">Sign in</legend>
        <FormControl>
          <Label htmlFor="service">Service</Label>
          <Input
            type="text"
            id="service"
            name="service"
            required
            placeholder="https://bsky.social"
            defaultValue={getLastUsedService() || "https://bsky.social"}
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="identifier">Username or email address</Label>
          <Input type="text" id="identifier" name="identifier" required />
        </FormControl>
        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" required />
        </FormControl>
        <Button type="submit" className="btn-block mt-8">
          Sign in
        </Button>
      </fieldset>
    </form>
  );
}
