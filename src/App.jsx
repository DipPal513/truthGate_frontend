import axios from "axios";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loadUser } from "./redux/features/userSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AxiosInstance from "./lib/AxiosInstance";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = async () => {
    const res = await AxiosInstance.get("/api/v1/me");

    if (res.data.user) {
      dispatch(loadUser(res.data.user));
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    user();
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);
  
  return (
    <>
      {isAuthenticated && <Header />}
      <Toaster position="top center" />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
