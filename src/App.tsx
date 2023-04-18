import Nav from "./sections/Nav";
import { Outlet } from "react-router-dom";
import ResumingSession from "./sections/ResumingSession";
import MobileNavBar from "./sections/MobileNavBar";
import { AuthProvider } from "./Auth";
import { useState } from "react";
import classNames from "classnames";

function App() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  return (
    <AuthProvider>
      <input
        id="sidenav-toggle"
        type="checkbox"
        className="nav-toggle hidden"
        onChange={(e) => {
          setIsSideNavVisible(e.target.checked);
        }}
      />
      <div className="max-w-screen-lg mx-auto lg:px-4 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-4">
        <div
          className={classNames(
            { block: isSideNavVisible, hidden: !isSideNavVisible },
            "lg:block"
          )}
        >
          <label
            htmlFor="sidenav-toggle"
            className={classNames(
              {
                block: isSideNavVisible,
                hidden: !isSideNavVisible,
              },
              "fixed bg-black opacity-50 w-full h-full z-10"
            )}
          ></label>
          <Nav />
        </div>
        <div className="flex flex-col items-center lg:pt-4">
          <MobileNavBar />
          <ResumingSession />
          <div className="w-full max-w-md lg:max-w-none mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
