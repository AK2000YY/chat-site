import { useContext, useEffect, useRef, useState } from "react";
import Msg from "../../types/message"
import Message from "./Message"
import axiosInc from "../../utils/axios";
import { addMessage, getBeforeId, getUnreadMessages, updateMessage } from "../../utils/idb";
import { chatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const Messages = ({ messages, userId }: {
    messages: Msg[],
    userId: string
}) => {

    const { user } = useContext(AuthContext)!;
    const [messagesId, setMessagesId] = useState<Set<string>>(new Set());
    const [messagesIdGet, setMessagesIdGet] = useState<Set<string>>(new Set());
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const ref = useRef<HTMLDivElement>(null);
    const refMessagesIdGet = useRef<Set<string>>(null);
    const refMessagesId = useRef<Set<string>>(null);


    useEffect(() => {
        refMessagesIdGet.current = messagesIdGet;
    }, [messagesIdGet])

    useEffect(() => {
        refMessagesId.current = messagesId;
    }, [messagesId])

    useEffect(() => {

        const editMessage = async (id: string, messageStatus: string) => {
            if (refMessagesId.current!.has(id)) return;
            setMessagesId(prev => {
                const set = new Set(prev);
                set.add(id);
                return new Set(set);
            })
            try {
                const res = await axiosInc.post('/message/update-message', {
                    messageId: id
                });
                if (res.data === 'ok') {
                    await updateMessage(id, messageStatus);
                    const changes = await getUnreadMessages(userId);
                    setChatInfo(prev => ({ ...prev, changes: changes, messages: prev.messages.map(ele => ele._id === id ? { ...ele, messageStatus: "read" } : ele) }));
                }
            } catch (error) {
                console.log(error);
            }
            setMessagesId(prev => {
                const set = new Set(prev);
                set.delete(id);
                return new Set(set);
            });
        }

        const getNewMessages = async (id: string) => {
            if (refMessagesIdGet.current!.has(id)) return;
            try {
                setMessagesIdGet(prev => {
                    const set = new Set(prev);
                    set.add(id);
                    return new Set(set);
                });
                await new Promise(res => setTimeout(res, 4000));
                let newMessages = await getBeforeId(chatInfo.selectedUser!, id);
                if (newMessages.length === 0) {
                    const serverMessages = await axiosInc.post('/message/get-messages', {
                        friendId: chatInfo.selectedUser,
                        messageId: id
                    });
                    newMessages = serverMessages.data;
                    await addMessage(newMessages);
                }
                if (newMessages.length != 0) {
                    setChatInfo(prev => ({ ...prev, messages: [...newMessages, ...prev.messages] }));
                    setMessagesIdGet(prev => {
                        const set = new Set(prev);
                        set.delete(id);
                        return new Set(set);
                    });
                }
            } catch (error) {
                console.log(error);
                setMessagesIdGet(prev => {
                    const set = new Set(prev);
                    set.delete(id);
                    return new Set(set);
                });
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const messageId = entry.target.getAttribute('message-id');
                    const messageStatus = entry.target.getAttribute('message-status');
                    if (entry.isIntersecting && messageStatus === 'ok') {
                        editMessage(messageId!, 'read');
                    }
                    if (entry.isIntersecting && chatInfo.messages.length >= 20 && chatInfo.messages.findIndex(ele => entry.target.getAttribute('message-id') == ele._id) === 3) {
                        getNewMessages(chatInfo.messages[0]._id!);
                    }
                })
            },
            {
                threshold: 0.8
            }
        );

        if (ref.current)
            Array.from(ref.current.children).forEach(ele => {
                observer.observe(ele);
            });

        return () => {
            if (ref.current) {
                observer.disconnect()
            }
        }
    }, [messages]);

    return (
        <div
            ref={ref}
            className="overflow-y-auto p-2 grow flex-col-reverse flex"
        >
            {messages.slice().reverse().map(ele =>
                <Message
                    key={ele._id}
                    avater={ele.sender === user._id! ? user.avater! : chatInfo.friends.find(fr => fr._id! === ele.sender)!.avater!}
                    message={ele}
                    position={ele.sender === userId ? "left" : "right"}
                />
            )}
        </div>
    )
}

export default Messages