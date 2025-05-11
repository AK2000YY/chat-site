import { useContext, useEffect, useState } from "react"
import { chatContext } from "../../context/ChatContext"
import Avatar from "../../componenets/ui/Avatar";
import Friend from "../../types/friend";
import axiosInc from "../../utils/axios";

const FriendProfile = () => {
    const { chatInfo } = useContext(chatContext)!;
    const [photos, setPhotos] = useState<{ _id: string, media: string }[]>([]);

    useEffect(() => {
        let ignore = false;
        const getPhotos = async () => {
            try {
                const photosRes = await axiosInc.post("/message/all-chat-photo", {
                    friendId: chatInfo.selectedUser
                });
                if (!ignore) setPhotos(photosRes.data);
            } catch (e) {
                console.log(e)
            }
        }
        if (chatInfo.selectedUser) {
            getPhotos();
        }

        return () => {
            ignore = true
        }
    }, [chatInfo.selectedUser])

    return (
        <div
            className="w-[100%] h-[100%] sm:w-[60%] lg:w-[25%] p-3 bg-[#110e21] rounded-xl flex flex-col items-center gap-y-3"
        >
            {chatInfo.selectedUser != "" &&
                <FriendComponenet
                    friend={chatInfo.friends.find(ele => ele._id === chatInfo.selectedUser)!}
                    photos={photos}
                />
            }
        </div>
    )
}

const FriendComponenet = ({ friend, photos }: {
    friend: Friend,
    photos: { _id: string, media: string }[]
}) => {
    return (
        <>
            <Avatar
                className="size-20"
                image={friend.avater != "" ? "http://localhost:5000/uploads/" + friend.avater : ""}
            />
            <div className="text-center w-[100%]">
                <h1 className="text-sm text-white font-medium mb-0.5">{friend.fullName.firstName} {friend.fullName.lastName}</h1>
                <p className="text-xs text-gray-400 font-light">@{friend.userName}</p>
                <ShredMedia photos={photos} />
            </div>
        </>
    )
}

const ShredMedia = ({ photos }: {
    photos: { _id: string, media: string }[]
}) => {
    return (
        <div className="w-full p-3 text-start text-white">
            <h1 className="text-md font-medium mb-2">Shared Media</h1>
            <div
                className="flex flex-wrap overflow-y-auto h-100"
            >
                {photos.map(ele =>
                    <div
                        key={ele._id}
                        className="bg-[#211842] p-1 rounded-xl w-[45%] h-40 mr-auto mb-2"
                    >
                        <img
                            src={"http://localhost:5000/uploads/" + ele.media}
                            alt="photo"
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendProfile