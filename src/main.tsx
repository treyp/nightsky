import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import { RequireAuth } from "./Auth";
import "./index.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ErrorPage from "./sections/ErrorPage";
import PostRoute from "./routes/PostRoute";
import Profile from "./routes/Profile";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/profile/:authorHandle",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "/profile/:authorHandle/post/:postRecordId",
        element: (
          <RequireAuth>
            <PostRoute />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
