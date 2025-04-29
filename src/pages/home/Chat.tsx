import { useContext, useEffect, useState } from "react"
import { chatContext } from "../../context/ChatContext"
import Message from "../../types/message";

const Chat = () => {
    const { chatInfo } = useContext(chatContext)!;
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {

    }, [])

    return (
        <div
            className="w-[100%] h-[90%] sm:w-[60%] sm:h-[100%] lg:w-[50%] bg-[#110e21] rounded-xl"
        >
            Chat
        </div>
    )
}

export default Chat