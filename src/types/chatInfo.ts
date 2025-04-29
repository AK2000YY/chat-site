import Changes from "./changes";

type ChatInfo = {
    changes: Changes[],
    selectedUser?: string,
    isLoading: boolean
}

export default ChatInfo;