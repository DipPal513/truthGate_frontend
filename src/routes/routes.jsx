import App from "@/App";
import Explore from "@/pages/Explore";
import Register from "@/pages/Register";
import Settings from "@/pages/Settings";
import LoginAccount from "@/pages/login";
import UserProfile from "@/components/user/UserProfile";
import Home from "@/pages/Home";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
const PrivateRoute= ({element}) =>{
  const {isAuthenticated} = useSelector(state => state.user);
  console.log(isAuthenticated,"is auth from secure auth")
 return isAuthenticated ? element : <Navigate to={"/login"} replace/>;
}
export const routes = createBrowserRouter([
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
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
     
      {
        path: "/user/:id",
        element: <UserProfile />,
      },
    ],
  },
]);
