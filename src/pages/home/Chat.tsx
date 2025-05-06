import { useContext, useEffect } from "react"
import MessageField from "./MessageField"
import Messages from "./Messages"
import { chatContext } from "../../context/ChatContext"
import { AuthContext } from "../../context/AuthContext"
import { getBeforeId } from "../../utils/idb"
import axiosInc from "../../utils/axios"
import ChatHeader from "./ChatHeader"

const Chat = () => {
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const { user } = useContext(AuthContext)!;

    useEffect(() => {
        let ignore = false;
        const getChatMessages = async () => {
            let messageRes = await getBeforeId(chatInfo.selectedUser!);
            if (messageRes.length < 40) {
                const messageRemote = await axiosInc.post("/message/get-messages", {
                    friendId: chatInfo.selectedUser
                });
                messageRes = messageRemote.data;
            }
            if (!ignore)
                setChatInfo((prev) => ({ ...prev, messages: messageRes.map(ele => { return { ...ele, friend: ele.sender === user._id ? ele.receiver : ele.sender } }) }));
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
            className="w-[100%] h-[90%] p-1 sm:w-[60%] sm:h-[100%] lg:w-[50%] bg-[#110e21] rounded-xl flex flex-col justify-between gap-2"
        >
            {chatInfo.selectedUser &&
                <ChatHeader
                    friend={chatInfo.friends.find(ele => ele._id === chatInfo.selectedUser)!}
                />
            }
            <Messages
                messages={chatInfo.messages}
                userId={user._id!}
            />
            {chatInfo.selectedUser &&
                <MessageField
                    addMessageToList={(msg) => setChatInfo((prev) => ({ ...prev, messages: [...prev.messages, msg] }))}
                />
            }
        </div>
    )
}

export default Chat