import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

import "./index.css";
import "@cubed/nftviewer/dist/style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
