import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import Chat from "./Chat"
import FriendProfile from "./FriendProfile"
import Friends from "./Friends"
import useScreenWidth from "../../hooks/ScreenWidth"
import { useContext, useEffect } from "react"
import axiosInc from "../../utils/axios"
import { addMessage } from "../../utils/idb"
import { AuthContext } from "../../context/AuthContext"
import Message from "../../types/message"

const Home = () => {

    const { user } = useContext(AuthContext)!;
    const width = useScreenWidth();


    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axiosInc.get("/message/get-unsent-message");
                console.log(res)
                const messages = res.data.map((ele: Message) => {
                    const senderType: string = ele.sender === user._id ? user._id : ele.receiver;
                    return {
                        _id: ele._id,
                        friend: ele.sender === user._id ? ele.receiver : ele.sender,
                        senderType: senderType,
                        message: ele.message,
                        media: ele.media,
                        messageStatus: ele.messageStatus
                    }
                });
                addMessage(messages);
            } catch (error) {
                console.log(error)
            }
        }

        getInfo();
    }, []);

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