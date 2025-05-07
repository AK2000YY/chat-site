import { useContext } from "react"
import { chatContext } from "../../context/ChatContext"
import Avatar from "../../componenets/ui/Avatar";
import Friend from "../../types/friend";

const FriendProfile = () => {
    const { chatInfo } = useContext(chatContext)!;
    return (
        <div
            className="w-[100%] h-[100%] sm:w-[60%] lg:w-[25%] p-3 bg-[#110e21] rounded-xl flex flex-col items-center gap-y-3"
        >
            {chatInfo.selectedUser != "" &&
                <FriendComponenet
                    friend={chatInfo.friends.find(ele => ele._id === chatInfo.selectedUser)!}
                />
            }
        </div>
    )
}

const FriendComponenet = ({ friend }: { friend: Friend }) => {
    return (
        <>
            <Avatar
                className="size-20"
                image={friend.avater}
            />
            <div className="text-center">
                <h1 className="text-sm text-white font-medium mb-0.5">{friend.fullName.firstName} {friend.fullName.lastName}</h1>
                <p className="text-xs text-gray-400 font-light">@{friend.userName}</p>
            </div>
        </>
    )
}

export default FriendProfile