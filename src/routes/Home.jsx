import { useContext } from "react";
import { AuthContext } from "../App";
import Button from "../components/Button";
import { AUTH_ACTION_LOGOUT } from "../consts";

export default function Home() {
  const { dispatch: authDispatch } = useContext(AuthContext);
  return (
    <div>
      <Button onClick={() => authDispatch({ type: AUTH_ACTION_LOGOUT })}>
        Sign out
      </Button>
    </div>
  );
}
