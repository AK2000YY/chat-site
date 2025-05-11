import Friend from "../../types/friend"
import Avatar from "../../componenets/ui/Avatar"
import { FC, HTMLAttributes, ReactNode } from "react"
import cn from "../../utils/functions"


interface FriendCardProp extends HTMLAttributes<HTMLDivElement> {
    friend: Friend,
    onSelectFriend: (id: string) => void
}


const FriendCard: FC<FriendCardProp> = ({ className, friend, onSelectFriend, children }) => {
    const myStyle = "relative bg-[#181030] text-white p-2 mb-2 w-full h-14 mx-auto rounded-sm flex items-center gap-x-2 text-sm font-sans cursor-pointer"
    return (
        <div
            className={cn(myStyle, className)}
            onClick={() => onSelectFriend(friend._id)}
        >
            <Avatar
                className="size-8"
                image={friend.avater != "" ? "http://localhost:5000/uploads/" + friend.avater : ""}
            />
            <div>
                <h1 className="text-sm font-medium">{friend.fullName?.firstName + " " + friend.fullName?.lastName}</h1>
                <p className="text-xs text-gray-400 font-light">@{friend.userName}</p>
            </div>
            {children}
        </div>
    )
}

export default FriendCard