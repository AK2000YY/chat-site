import { useContext, useRef, useState } from "react"
import { chatContext } from "../../context/ChatContext";
import { IoIosAdd } from "react-icons/io";
import Input from "../../componenets/form/Input";
import Button from "../../componenets/ui/Button";
import Form from "../../componenets/form/Form";
import axiosInc from "../../utils/axios";
import Message from "../../types/message";
import { addMessage } from "../../utils/idb";
import { TbSend2 } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";

const MessageField = ({ addMessageToList }: {
    addMessageToList: (msg: Message) => void
}) => {

    const { chatInfo } = useContext(chatContext)!;
    const imageRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const sendMessage = async (formData: FormData) => {
        try {
            formData.append('receiver', chatInfo.selectedUser!);
            const message = await axiosInc.post('/message', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPreview(null);
            addMessage([{ ...message.data, friend: chatInfo.selectedUser }]);
            addMessageToList(message.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const removeImage = () => {
        setPreview(null);
        if (imageRef.current) imageRef.current.value = ""
    }

    return (
        <Form
            className="bg-[#181030] py-1 px-2 h-fit flex flex-row gap-x-1.5 items-center w-full sm:w-full md:w-full lg:w-full shadow relative"
            action={sendMessage}
        >
            {preview &&
                <>
                    <img
                        src={preview}
                        className="rounded absolute bottom-15 left-0 w-16 h-16"
                    />
                    <FaTrash
                        className="text-red-500 absolute bottom-29 left-13 cursor-pointer"
                        onClick={removeImage}
                    />
                </>
            }
            <label htmlFor="avatar">
                <input
                    className="hidden"
                    ref={imageRef}
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleImageChange}
                />
                <IoIosAdd
                    className="bg-slate-600 h-9 w-14 rounded-xl text-white"
                />
            </label>
            <Input
                className="px-1 h-9 grow bg-transparent focus:outline-0"
                name="message"
                placeholder="Enter message"
            />
            <Button
                className="w-[20%] px-2 bg-[#ddfc7e] h-9 flex text-[#000500] text-xs sm:text-md font-medium items-center justify-center gap-x-1"
                type="submit"
            >
                Send
                <TbSend2 />
            </Button>
        </Form>
    )
}

export default MessageField