import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"
import routes from "./routes.tsx";

const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);