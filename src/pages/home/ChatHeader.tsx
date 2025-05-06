import { useNavigate } from "react-router-dom";
import Avatar from "../../componenets/ui/Avatar"
import Friend from "../../types/friend"
import useScreenWidth from "../../hooks/ScreenWidth";

const ChatHeader = ({ friend }: { friend: Friend }) => {
    const width = useScreenWidth();
    const navigate = useNavigate();
    return (
        <div
            className="bg-[#181030] p-3 w-full h-16 min-h-16 rounded-xl flex justify-start gap-x-4 items-center cursor-pointer"
            onClick={() => {
                if (width < 1024) navigate('/friend-profile')
            }}
        >
            <Avatar
                image={friend.avater}
            />
            <div className="text-white">
                <h1 className="text-sm font-medium">{friend.fullName.firstName} {friend.fullName.lastName}</h1>
                <p className="text-xs text-gray-400 font-light">@{friend.userName}</p>
            </div>
        </div>
    )
}

export default ChatHeader