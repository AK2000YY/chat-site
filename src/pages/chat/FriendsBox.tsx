import { useContext } from "react";
import { chatContext } from "../../context/ChatContext";
// import FriendCard from "./FriendCard";
import useScreenWidth from "../../hooks/ScreenWidth";
import { useNavigate } from "react-router-dom";
import FriendCard from "../../componenets/ui/FriendCard";

const FriendsBox = () => {

    const { chatInfo, setChatInfo } = useContext(chatContext)!;
    const width = useScreenWidth();
    const navigate = useNavigate();

    const handleSelectedUser = (id: string) => {
        setChatInfo(prev => ({ ...prev, selectedUser: id }))
        if (width < 640) navigate('/chat');
    }

    return (
        <div
            className="w-[100%] h-[100%] p-2 sm:w-[30%] lg:w-[25%] bg-[#110e21] rounded-xl"
        >
            {chatInfo.friends.map(friend => {
                const unreadMessages = chatInfo.changes.find(ele => ele.friendId === friend._id)?.unreadMessages ?? 0;
                return <FriendCard
                    key={friend._id}
                    friend={friend}
                    onSelectFriend={handleSelectedUser}
                >
                    {unreadMessages > 0 &&
                        <div
                            className="absolute right-1 bg-violet-500 w-fit h-fit px-2 rounded text-white"
                        >
                            {unreadMessages}
                        </div>
                    }
                </FriendCard>
            })}
        </div>
    )
}

export default FriendsBox