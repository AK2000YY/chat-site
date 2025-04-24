import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useContext, useEffect, useState } from "react";
import axiosInc from "./utils/axios";
import { AuthContext } from "./context/AuthContext";
import Loading from "./componenets/ui/Loading";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { user, setUser } = useContext(AuthContext)!;

  useEffect(() => {
    const getAuthState = async () => {
      try {
        const user: any = await axiosInc.get("/auth/auth-state");
        setUser(user.data)
      } catch (e: any) {
        if (e.response) {
          console.log(e.response.data.message);
        } else if (e.request) {
          console.log("No response from server. Server may be down.");
        } else {
          console.log("Unexpected error:", e.message);
        }
      }
      setIsLoading(false);
    }
    if (!user._id)
      getAuthState();
  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div>
      <Routes>
        <Route path="/login" element={!user._id ? <Login /> : < Navigate to={"/"} />} />
        <Route path="/Signup" element={!user._id ? <Signup /> : < Navigate to={"/"} />} />
        <Route path="/" element={!user._id ? <Home /> : < Navigate to={"/login"} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;