import { Outlet } from "react-router-dom"
import ChatBox from "./ChatBox"
import FriendProfile from "./FriendProfile"
import Friends from "./FriendsBox"
import useScreenWidth from "../../hooks/ScreenWidth"

const Chat = () => {
    const width = useScreenWidth();


    const smallScreenView = (
        <div className="h-[99%] flex flex-col justify-evenly">
            <Outlet />
        </div>
    )

    const mediumScreenView = (
        <div className="h-[100%] flex justify-evenly">
            <Friends />
            <Outlet />
        </div>
    )

    const largeScreenView = (
        <div className="h-[100%] flex justify-evenly">
            <Friends />
            <ChatBox />
            <FriendProfile />
        </div>
    )

    return (
        <div className="bg-slate-950 grow h-[90%] sm:h-[100%]">
            {width < 640 ?
                smallScreenView :
                width < 1024 ?
                    mediumScreenView :
                    largeScreenView
            }
        </div>
    )
}

export default Chat