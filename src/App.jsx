import Nav from "./sections/Nav";
import { Outlet } from "react-router-dom";
import ResumingSession from "./sections/ResumingSession";
import MobileNavBar from "./sections/MobileNavBar";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <div className="max-w-screen-lg mx-auto lg:px-4">
        <div className="drawer drawer-mobile">
          <input id="sidenav" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center lg:pl-4 lg:pt-4">
            <MobileNavBar />
            <ResumingSession />
            <Outlet />
          </div>
          <Nav />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
