import Changes from "./changes";
import Friend from "./friend";
import Message from "./message";

type ChatInfo = {
    messages: Message[],
    changes: Changes[],
    friends: Friend[],
    selectedUser?: string
}

export default ChatInfo;