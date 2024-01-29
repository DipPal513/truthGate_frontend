import App from "@/App";
import Explore from "@/pages/Explore";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import LoginAccount from "@/pages/login";
import UserProfile from "@/components/user/UserProfile";
import Home from "@/pages/Home";
import { useSelector } from "react-redux";
import { createBrowserRouter, useNavigate } from "react-router-dom";
const PrivateRoute= ({element}) =>{
  const {isAuthenticated} = useSelector(state => state.user);
  const Navigate = useNavigate();
 return isAuthenticated ? element : Navigate("/login");
}
export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />}/>,
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
        element: <Home/>,
      },
      {
        path: "/user/:id",
        element: <UserProfile />,
      },
    ],
  },
]);
