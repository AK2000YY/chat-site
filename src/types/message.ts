type Message = {
    _id?: string,
    message?: string,
    media?: string,
    messageStatus: string,
    isEdited: string,
    isShowEdit: string,
    sender: string,
    receiver: string,
}

export default Message;