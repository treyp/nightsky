import AppTitle from "./AppTitle";
import { useAuth } from "../Auth";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const { logout, state: authState } = useAuth();

  const onSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      logout();
    }
  };

  return (
    <div className="fixed h-screen overflow-y-auto bg-base-100 w-56 z-10">
      <div className="py-4">
        <AppTitle className="hidden lg:block mb-4 px-2" />
        <ul className="menu rounded-box px-2">
          {authState.isInitialized &&
            !authState.isResuming &&
            !authState.agent && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          {authState.agent && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <a>Search</a>
              </li>
              <li>
                <a>Notifications</a>
              </li>
              {authState.session && (
                <li>
                  <NavLink to={`/profile/${authState.session.handle}`}>
                    Profile
                  </NavLink>
                </li>
              )}
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={onSignOut}>Sign out</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
