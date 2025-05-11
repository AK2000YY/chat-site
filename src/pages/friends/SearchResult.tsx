import { FaCheck } from "react-icons/fa";
import FriendCard from "../../componenets/ui/FriendCard";
import Friend from "../../types/friend"
import cn from "../../utils/functions";
import { BsPersonFillAdd } from "react-icons/bs";
import { useContext } from "react";
import { chatContext } from "../../context/ChatContext";
import axiosInc from "../../utils/axios";

const SearchResult = ({ friends }: {
    friends: Friend[]
}) => {

    const { chatInfo, setChatInfo } = useContext(chatContext)!;

    const folwFriend = async (friend: Friend) => {
        try {
            await axiosInc.post('/friend', {
                id: friend._id
            })
            setChatInfo(prev => ({ ...prev, friends: [...prev.friends, friend] }))
        } catch (error) {

        }
    }

    return (
        <div
            className="w-full h-[90%] p-3 overflow-y-auto"
        >
            {friends.length === 0 &&
                <h1
                    className="w-full h-[90%] flex justify-center items-center text-white font-medium text-xl"
                >
                    No Result
                </h1>
            }
            {friends.map(friend =>
                <div
                    key={friend._id}
                >
                    <FriendCard
                        friend={friend}
                        onSelectFriend={() => { }}
                    >
                        <FolwComponent
                            onFolw={() => folwFriend(friend)}
                            isFriend={chatInfo.friends.some(ele => ele._id === friend._id)}
                        />
                    </FriendCard>
                </div>
            )}
        </div>
    )
}

const FolwComponent = ({ onFolw, isFriend }: {
    onFolw: () => void,
    isFriend: boolean
}) => {
    return (
        <div
            className={cn("absolute w-10 h-8 rounded bg-[#ddfc7e] text-gray-400 right-2 top-3 flex justify-center items-center", { "bg-green-400": isFriend })}
            onClick={onFolw}
        >
            {isFriend ?
                <FaCheck
                    className=""
                /> :
                <BsPersonFillAdd
                />
            }
        </div>
    )
}

export default SearchResult