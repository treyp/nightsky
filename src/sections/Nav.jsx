import AppTitle from "./AppTitle";
import { AUTH_ACTION_LOGOUT } from "../consts";
import { useContext } from "react";
import { AuthContext } from "../App";

export default function Nav() {
  const { dispatch: authDispatch } = useContext(AuthContext);

  return (
    <div className="drawer-side">
      <label htmlFor="sidenav" className="drawer-overlay"></label>
      <div className="menu py-4 bg-base-100 w-56">
        <AppTitle className="hidden lg:block mb-4" />
        <ul>
          <li className="bordered">
            <a>Home</a>
          </li>
        </ul>
        <a
          className="link link-neutral mt-4"
          onClick={() => authDispatch({ type: AUTH_ACTION_LOGOUT })}
        >
          Sign out
        </a>
      </div>
    </div>
  );
}
