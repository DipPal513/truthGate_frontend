import App from "@/App";
import Explore from "@/components/Explore";
import Register from "@/components/Register";
import Settings from "@/components/Settings";
import LoginAccount from "@/components/login";
import UserProfile from "@/components/user/UserProfile";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginAccount />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/user/:id",
        element: <UserProfile />,
      },
    ],
  },
]);
export default routes;
