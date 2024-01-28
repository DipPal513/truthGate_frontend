import App from "@/App";
import Explore from "@/components/Explore";
import Register from "@/components/Register";
import Settings from "@/components/Settings";
import LoginAccount from "@/components/login";
import UserProfile from "@/components/user/UserProfile";
import Home from "@/pages/Home";
import { useSelector } from "react-redux";
import { createBrowserRouter, useNavigate } from "react-router-dom";
const PrivateRoute = ({ element, children }) => {
  const Navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? element : <Navigate to="/login" />;
};
const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />} />,
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
