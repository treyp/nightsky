import MobileNavBar from "./MobileNavBar";

export default function Content({ children }) {
  return (
    <div className="drawer-content flex flex-col items-center px-4 lg:pr-0 lg:pt-4">
      <MobileNavBar />
      {children}
    </div>
  );
}
