import { useContext, useEffect, useState } from "react";
import { chatContext } from "../../context/ChatContext";
import axiosInc from "../../utils/axios";
import Friend from "../../types/friend";
import FriendCard from "./FriendCard";
import useScreenWidth from "../../hooks/ScreenWidth";
import { useNavigate } from "react-router-dom";

const Friends = () => {

    const [friends, setFriends] = useState<Friend[]>([]);
    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const width = useScreenWidth();
    const navigate = useNavigate();

    useEffect(() => {
        const setInfo = async () => {
            try {
                const friendsRes = await axiosInc.get('/friend');
                setFriends(friendsRes.data);
                setChatInfo(prev => ({ ...prev, friends: friendsRes.data }))
            } catch (e) {
                console.log(e);
            }
        }
        setInfo();
    }, [])

    const handleSelectedUser = (id: string) => {
        setChatInfo(prev => ({ ...prev, selectedUser: id }))
        if (width < 640) navigate('/chat');
    }

    return (
        <div
            className="w-[100%] h-[90%] p-2 sm:w-[30%] sm:h-[100%] lg:w-[20%] bg-[#110e21] rounded-xl"
        >
            {friends.map(friend =>
                <FriendCard
                    key={friend._id}
                    user={friend}
                    unreadMessages={chatInfo.changes.find(ele => ele.friendId === friend._id)?.unreadMessages ?? 0}
                    onSelectUser={handleSelectedUser}
                />
            )}
        </div>
    )
}

export default Friends