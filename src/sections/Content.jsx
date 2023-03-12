import MobileNavBar from "./MobileNavBar";

export default function Content({ children }) {
  return (
    <div className="drawer-content flex flex-col lg:justify-center items-center px-4 lg:pr-0">
      <MobileNavBar />
      {children}
    </div>
  );
}
