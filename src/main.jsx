import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { LoginContextProvider } from "./LoginContext/LoginContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContextProvider>
    <RouterProvider router={routes} />
    </LoginContextProvider>
  </React.StrictMode>
);
