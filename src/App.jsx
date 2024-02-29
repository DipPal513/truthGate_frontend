import axios from "axios";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  loadUser,
  loadUserFailure,
  loadUserRequest,
} from "./redux/features/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AxiosInstance from "./lib/AxiosInstance";
import LoginAccount from "./pages/login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/ErrorPage";

function App() {
  console.count("app component rendered ")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = async () => {
    dispatch(loadUserRequest());

    try {
      const res = await AxiosInstance.get("/api/v1/me", {
        withCredentials: true,
      });

      if (res.data.user) {
        dispatch(loadUser(res.data.user));
      } else {
        dispatch(loadUserFailure());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(loadUserFailure());
      navigate("/login");
    }
  };

  useEffect(() => {
   user();
  }, []);

  const { isAuthenticated, loading } = useSelector((state) => state.user);
 

  // if (loading) {
  //   // Render a loading state while user data is being fetched
  //   return <p>Loading...</p>;
  // }

  return (
    <>
    <ErrorBoundary fallback={<ErrorPage/>}>
      {isAuthenticated && <Header />}
      <Toaster position="top center" />
      <main className="min-h-[80vh] max-w-screen-sm mx-auto">
      <Outlet />      
      </main>
      <Footer />
      </ErrorBoundary>
    </>

  );
}

export default App;
