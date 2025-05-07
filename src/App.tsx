import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useContext, useEffect, useState } from "react";
import axiosInc from "./utils/axios";
import { AuthContext } from "./context/AuthContext";
import Loading from "./componenets/ui/Loading";
import { Toaster } from "react-hot-toast";
import FriendsBox from "./pages/chat/FriendsBox";
import ChatBox from "./pages/chat/ChatBox";
import FriendProfile from "./pages/chat/FriendProfile";
import useScreenWidth from "./hooks/ScreenWidth";
import { ChatProvider } from "./context/ChatContext";
import Setting from "./pages/setting/Setting";
import Friends from "./pages/friends/Friends";
import Navigation from "./pages/navigation/Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { user, setUser } = useContext(AuthContext)!;
  const width = useScreenWidth();

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
        <Route path="/" element={user._id ? <ChatProvider><Navigation /></ChatProvider> : < Navigate to={"/login"} />}>
          <Route path="" element={<Chat />} >
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/friend-profile" element={<FriendProfile />} />
            <Route index element={width < 640 ? <FriendsBox /> : <ChatBox />} />
          </Route>
          <Route path="/friends" element={<Friends />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes >
      <Toaster />
    </div >
  );
}

export default App;


{/* <Route path="/" element={user._id ? <ChatProvider><Home /></ChatProvider> : < Navigate to={"/login"} />} >
          {width < 640 && <Route path="friends" element={<Friends />} />}
          <Route path="chat" element={<Chat />} />
          <Route path="friend-profile" element={<FriendProfile />} />
          <Route index element={width < 640 ? <Friends /> : <Chat />} />
        </Route> */}