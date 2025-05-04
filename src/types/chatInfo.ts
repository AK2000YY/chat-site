import Changes from "./changes";
import Message from "./message";

type ChatInfo = {
    messages: Message[],
    changes: Changes[],
    selectedUser?: string,
    isLoading: boolean
}

export default ChatInfo;