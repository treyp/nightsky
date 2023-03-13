import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-center">
      <h1 className="text-2xl">Error</h1>
      <p className="my-4">An unexpected error has occurred:</p>
      <p className="text-error-content">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
