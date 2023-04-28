import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./assets/routes/App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Sorry, there was an unexpected error</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
