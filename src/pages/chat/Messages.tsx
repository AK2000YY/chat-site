import { useContext, useEffect, useRef, useState } from "react";
import Msg from "../../types/message"
import Message from "./Message"
import axiosInc from "../../utils/axios";
import { getUnreadMessages, updateMessage } from "../../utils/idb";
import { chatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const Messages = ({ messages, userId }: {
    messages: Msg[],
    userId: string
}) => {

    const { user } = useContext(AuthContext)!;
    const ref = useRef<HTMLDivElement>(null);
    const [messagesId, setMessagesId] = useState<Set<string>>(new Set());
    const { chatInfo, setChatInfo } = useContext(chatContext)!;

    useEffect(() => {

        const editMessage = async (id: string, messageStatus: string) => {
            if (messagesId.has(id)) return;
            console.log('start');
            setMessagesId(prev => (new Set(prev).add(id)));
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
                return set;
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const messageId = entry.target.getAttribute('message-id');
                    const messageStatus = entry.target.getAttribute('message-status');
                    if (entry.isIntersecting && messageStatus === 'ok') {
                        editMessage(messageId!, 'read');
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
            className="overflow-y-auto p-2 grow"
        >
            {messages.map(ele =>
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