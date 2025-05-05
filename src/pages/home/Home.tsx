import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import Chat from "./Chat"
import FriendProfile from "./FriendProfile"
import Friends from "./Friends"
import useScreenWidth from "../../hooks/ScreenWidth"
import { useContext, useEffect } from "react"
import axiosInc from "../../utils/axios"
import { addMessage, getBeforeId, getUnreadMessages, getUserMessages, updateMessage } from "../../utils/idb"
import { AuthContext } from "../../context/AuthContext"
import Message from "../../types/message"
import { connectSocket } from "../../utils/socket"
import { chatContext } from "../../context/ChatContext"

const Home = () => {

    const { user } = useContext(AuthContext)!;
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const width = useScreenWidth();

    //corrected
    useEffect(() => {

        const checkSentMessages = async () => {
            try {
                const userMessages = await getUserMessages(user._id!);
                const messagesRes = await axiosInc.post("/message/check-sent-message", {
                    messagesId: userMessages
                });
                messagesRes.data.forEach((msg: Message) => {
                    updateMessage(msg._id!, msg.messageStatus);
                });
            } catch (error) {
                console.log(error);
            }
        }

        const getInfo = async () => {
            try {
                let res = await axiosInc.get("/message/get-unsent-message");
                addMessage(res.data.map((ele: Message) => {
                    return { ...ele, friend: ele.sender === user._id ? ele.receiver : ele.sender, messageStatus: 'delivere' }
                }))
                const unreadMessageRes = await getUnreadMessages(user._id!);
                setChatInfo((prev) => ({ ...prev, changes: unreadMessageRes }));
            } catch (error) {
                console.log(error)
            }
        }

        checkSentMessages();
        getInfo();
    }, []);

    useEffect(() => {
        const socket = connectSocket(user._id!);

        socket.on('message', async (data, callback) => {
            const message = data.messageRes;
            await addMessage([{ ...message, friend: message.sender, messageStatus: 'delivere' }]);
            const unreadMessageRes = await getUnreadMessages(user._id!);
            setChatInfo((prev) => ({ ...prev, changes: unreadMessageRes }));

            if (chatInfo.selectedUser === message.sender) {
                const messagesdb = await getBeforeId(chatInfo.selectedUser!);
                if (chatInfo.messages.length < 20 || messagesdb[messagesdb.length - 2]._id === chatInfo.messages[chatInfo.messages.length - 1]._id) {
                    setChatInfo((prev) => ({ ...prev, messages: [...prev.messages, { ...message, friend: message.sender }] }));
                }
            }

            callback({
                status: 'ok'
            });
        })

        socket.on('delivere', async (messageId) => {
            await updateMessage(messageId, 'delivere');
            setChatInfo(prev => ({ ...prev, messages: prev.messages.map(ele => ele._id === messageId ? { ...ele, messageStatus: 'delivere' } : ele) }));
        });

        socket.on('read', async (messageId) => {
            await updateMessage(messageId, 'read')
            setChatInfo(prev => ({ ...prev, messages: prev.messages.map(ele => ele._id === messageId ? { ...ele, messageStatus: 'read' } : ele) }));
        });

        return () => {
            socket.disconnect();
        }
    }, [chatInfo.selectedUser]);


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