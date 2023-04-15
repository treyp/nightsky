import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { RequireAuth } from "./Auth";
import "./index.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ErrorPage from "./sections/ErrorPage";
import PostRoute from "./routes/PostRoute";
import Profile from "./routes/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="/login" element={<Login />} />
        <Route
          index
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:authorHandle"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:authorHandle/post/:postRecordId"
          element={
            <RequireAuth>
              <PostRoute />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  </HashRouter>
);
