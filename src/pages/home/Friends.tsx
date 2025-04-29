import { useContext, useEffect, useState } from "react";
import { chatContext } from "../../context/ChatContext";
import axiosInc from "../../utils/axios";
import Friend from "../../types/friend";
import Loading from "../../componenets/ui/Loading";
import FriendCard from "./FriendCard";
import { getUnreadMessages } from "../../utils/idb";

const Friends = () => {

    const [friends, setFriends] = useState<Friend[]>([]);
    const [unreadMessage, setUnreadMessage] = useState<{ friendId: string, unreadMessages: number }[]>([]);
    const { chatInfo, setChatInfo } = useContext(chatContext)!;

    useEffect(() => {
        const setInfo = async () => {
            try {
                const friendsRes = await axiosInc.get('/friend');
                const unreadMessageRes = await getUnreadMessages();
                setFriends(friendsRes.data);
                setUnreadMessage(unreadMessageRes);
                setChatInfo(prev => ({ ...prev, isLoading: false }))
            } catch (e) {
                console.log(e);
            }
        }
        setInfo();
    }, [])

    const handleSelectedUser = (id: string) => {
        setChatInfo(prev => ({ ...prev, selectedUser: id }))
    }

    if (chatInfo.isLoading)
        return <Loading className="w-[100%] h-[90%] sm:w-[30%] sm:h-[100%] lg:w-[20%] bg-[#110e21] rounded-xl static" />

    return (
        <div
            className="w-[100%] h-[90%] p-2 sm:w-[30%] sm:h-[100%] lg:w-[20%] bg-[#110e21] rounded-xl"
        >
            {friends.map(friend =>
                <FriendCard
                    key={friend._id}
                    user={friend}
                    unreadMessages={unreadMessage.find(ele => ele.friendId === friend._id)?.unreadMessages ?? 0}
                    onSelectUser={handleSelectedUser}
                />
            )}
        </div>
    )
}

export default Friends