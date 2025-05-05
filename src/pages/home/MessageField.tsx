import { useContext } from "react"
import { chatContext } from "../../context/ChatContext";
import { IoIosAdd } from "react-icons/io";
import Input from "../../componenets/form/Input";
import Button from "../../componenets/ui/Button";
import Form from "../../componenets/form/Form";
import axiosInc from "../../utils/axios";
import Message from "../../types/message";
import { addMessage } from "../../utils/idb";
import { TbSend2 } from "react-icons/tb";

const MessageField = ({ addMessageToList }: {
    addMessageToList: (msg: Message) => void
}) => {

    const { chatInfo } = useContext(chatContext)!;

    const sendMessage = async (formData: FormData) => {
        try {
            const message = await axiosInc.post('/message', {
                receiver: chatInfo.selectedUser,
                message: formData.get('message')
            });
            console.log(message)
            addMessage([{ ...message.data, friend: chatInfo.selectedUser }]);
            addMessageToList(message.data);
        } catch (error) {

        }
    }

    return (
        <Form
            className="py-0 px-2 h-fit flex flex-row gap-x-1.5 items-center sm:w-full md:w-full lg:w-full"
            action={sendMessage}
        >
            <IoIosAdd
                className="bg-slate-600 h-10 w-14 rounded-xl text-white"
            />
            <Input
                className="px-1 h-10 bg-transparent focus:outline-0"
                name="message"
                placeholder="Enter message"
            />
            <Button
                className="w-[20%] bg-[#ddfc7e] h-10 flex text-[#000500] text-md font-medium items-center justify-center gap-x-1"
                type="submit"
            >
                Send
                <TbSend2 />
            </Button>
        </Form>
    )
}

export default MessageField