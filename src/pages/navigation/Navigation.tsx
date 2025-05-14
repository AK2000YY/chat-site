import { Outlet } from "react-router-dom"
import Nav from "../../componenets/Nav"
import useScreenWidth from "../../hooks/ScreenWidth"
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { chatContext } from "../../context/ChatContext";
import { addMessage, getBeforeId, getUnreadMessages, getUserMessages, updateMessage } from "../../utils/idb";
import axiosInc from "../../utils/axios";
import Message from "../../types/message";
import { connectSocket } from "../../utils/socket";

const Navigation = () => {
    const { user } = useContext(AuthContext)!;
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const width = useScreenWidth();
    const selectedUserRef = useRef(chatInfo.selectedUser);
    const messagesRef = useRef(chatInfo.messages);


    useEffect(() => {
        selectedUserRef.current = chatInfo.selectedUser;
        messagesRef.current = chatInfo.messages;
    }, [chatInfo.selectedUser])

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

        const getFriends = async () => {
            try {
                const friendsRes = await axiosInc.get('/friend');
                setChatInfo(prev => ({ ...prev, friends: friendsRes.data }));
            } catch (error) {
                console.log(error);
            }
        }

        checkSentMessages();
        getInfo();
        getFriends();
    }, []);

    useEffect(() => {
        const socket = connectSocket(user._id!);

        socket.on('message', async (data, callback) => {
            const message = data.messageRes;
            await addMessage([{ ...message, friend: message.sender, messageStatus: 'delivere' }]);
            const unreadMessageRes = await getUnreadMessages(user._id!);
            setChatInfo((prev) => ({ ...prev, changes: unreadMessageRes }));

            if (selectedUserRef.current === message.sender) {
                const messagesdb = await getBeforeId(selectedUserRef.current!);
                if (messagesRef.current.length < 20 || messagesdb[messagesdb.length - 2]._id === messagesRef.current[messagesRef.current.length - 1]._id) {
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
    }, []);

    return (
        <div className="bg-slate-950 p-3 w-screen h-screen flex flex-col sm:flex-row">
            {
                width >= 640 &&
                <Nav />
            }
            <Outlet />
            {
                width < 640 &&
                <Nav />
            }
        </div>
    )
}

export default Navigation