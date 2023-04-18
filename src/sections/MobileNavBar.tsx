import AppTitle from "./AppTitle";

export default function MobileNavBar() {
  return (
    <div className="navbar w-screen bg-base-300 border-b border-neutral -mx-4 mb-4 lg:hidden">
      <div className="flex-none">
        <label htmlFor="sidenav-toggle" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 mx-2">
        <AppTitle />
      </div>
    </div>
  );
}
