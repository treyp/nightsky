import AppTitle from "./AppTitle";
import { AUTH_ACTION_LOGOUT } from "../consts";
import { useContext } from "react";
import { AuthContext } from "../App";

export default function Nav() {
  const { dispatch: authDispatch } = useContext(AuthContext);

  const onSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      authDispatch({ type: AUTH_ACTION_LOGOUT });
    }
  };

  return (
    <div className="drawer-side">
      <label htmlFor="sidenav" className="drawer-overlay"></label>
      <div className="menu py-4 bg-base-100 w-56">
        <AppTitle className="hidden lg:block mb-4" />
        <ul>
          <li className="bordered">
            <a>Home</a>
          </li>
          <li>
            <a>Search</a>
          </li>
          <li>
            <a>Notifications</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={onSignOut}>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
