import { useContext, useEffect } from "react"
import MessageField from "./MessageField"
import Messages from "./Messages"
import { chatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"
import { addMessage, getBeforeId } from "../../utils/idb"
import axiosInc from "../../utils/axios"
import FriendCard from "../../componenets/ui/FriendCard"
import useScreenWidth from "../../hooks/ScreenWidth"
import { useNavigate } from "react-router-dom"

const ChatBox = () => {
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const { user } = useContext(AuthContext)!;
    const width = useScreenWidth();
    const navigate = useNavigate()

    useEffect(() => {
        let ignore = false;
        const getChatMessages = async () => {
            let messageRes = await getBeforeId(chatInfo.selectedUser!);
            if (messageRes.length === 0) {
                const messageRemote = await axiosInc.post("/message/get-messages", {
                    friendId: chatInfo.selectedUser
                });
                messageRes = messageRemote.data;
                addMessage(messageRes.map(ele => { return { ...ele, friend: ele.sender === user._id ? ele.receiver : ele.sender } }));
            }
            if (!ignore) {
                setChatInfo((prev) => ({ ...prev, messages: messageRes.map(ele => { return { ...ele, friend: ele.sender === user._id ? ele.receiver : ele.sender } }) }));
            }
        }
        if (chatInfo.selectedUser)
            getChatMessages();
        return () => {
            setChatInfo(prev => ({ ...prev, messages: [] }))
            ignore = true
        }
    }, [chatInfo.selectedUser])


    return (
        <div
            className="w-[100%] h-[100%] p-1 sm:w-[60%] lg:w-[45%] bg-[#110e21] rounded-xl flex flex-col justify-between gap-2"
        >
            {chatInfo.selectedUser &&
                <FriendCard
                    friend={chatInfo.friends.find(ele => ele._id === chatInfo.selectedUser)!}
                    onSelectFriend={() => {
                        if (width < 1024) navigate('/friend-profile')
                    }}
                />
            }
            <Messages
                messages={chatInfo.messages}
                userId={user._id!}
            />
            {chatInfo.selectedUser &&
                <MessageField
                    key={chatInfo.selectedUser}
                    addMessageToList={(msg) => setChatInfo((prev) => ({ ...prev, messages: [...prev.messages, msg] }))}
                />
            }
        </div>
    )
}

export default ChatBox