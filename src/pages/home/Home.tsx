import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import Chat from "./Chat"
import FriendProfile from "./FriendProfile"
import Friends from "./Friends"
import useScreenWidth from "../../hooks/ScreenWidth"

const Home = () => {

    const width = useScreenWidth();


    const smallScreenView = (
        <div className="w-screen h-screen p-4 bg-slate-950 flex flex-col justify-evenly">
            <Outlet />
            <Nav />
        </div>
    )

    const mediumScreenView = (
        <div className="w-screen h-screen py-4 bg-slate-950 flex justify-evenly">
            <Nav />
            <Friends />
            <Outlet />
        </div>
    )

    const largeScreenView = (
        <div className="w-screen h-screen py-4 bg-slate-950 flex justify-evenly">
            <Nav />
            <Friends />
            <Chat />
            <FriendProfile />
        </div>
    )

    return (
        <div className="w-screen h-screen bg-slate-950">
            {width < 640 ?
                smallScreenView :
                width < 1024 ?
                    mediumScreenView :
                    largeScreenView
            }
        </div>
    )
}

export default Home