import Friend from "../../types/friend"
import Avatar from "../../componenets/ui/Avatar"

const FriendCard = ({ user, unreadMessages, onSelectUser }: {
    user: Friend,
    unreadMessages: number,
    onSelectUser: (id: string) => void
}) => {

    return (
        <div
            className="relative bg-[#181030] p-2 mb-2 w-full h-[60px] mx-auto rounded-sm flex items-center gap-x-2 text-sm font-sans cursor-pointer"
            onClick={() => onSelectUser(user._id)}
        >
            {user.avater !== "" &&
                <Avatar
                    image={user.avater}
                />
            }
            <h1 className="text-white">{user.fullName?.firstName + " " + user.fullName?.lastName}</h1>
            {unreadMessages > 0 &&
                <div
                    className="absolute right-1 bg-violet-500 w-fit h-fit px-2 rounded text-white"
                >
                    {unreadMessages}
                </div>
            }
        </div>
    )
}

export default FriendCard