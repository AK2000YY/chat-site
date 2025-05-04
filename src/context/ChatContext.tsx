import { createContext, ReactNode, useState } from "react";
import ChatInfo from "../types/chatInfo";


const chatContext = createContext<{
    chatInfo: ChatInfo,
    setChatInfo: React.Dispatch<React.SetStateAction<ChatInfo>>
} | undefined>(undefined);


const ChatProvider = ({ children }: {
    children: ReactNode
}) => {
    const [chatInfo, setChatInfo] = useState<ChatInfo>({
        messages: [],
        changes: [],
        selectedUser: "",
        isLoading: true
    });

    return (
        <chatContext.Provider value={{ chatInfo, setChatInfo }}>
            {children}
        </chatContext.Provider>
    )
}

export { chatContext, ChatProvider };