import { IoCheckmark, IoCheckmarkDoneOutline, IoCheckmarkDoneSharp } from "react-icons/io5";
import Avatar from "../../componenets/ui/Avatar";
import Msg from "../../types/message";
import cn from "../../utils/functions";

const Message = ({ avater, message, position }: {
    avater: string,
    message: Msg,
    position: string,
}) => {
    const align = position === 'left' ? 'justify-start' : 'justify-end';

    return (
        <div
            message-id={message._id}
            message-status={message.messageStatus != 'read' && message.friend === message.sender ? "ok" : "NoOk"}
            className={cn("bg-transparent mb-1 flex gap-2 justify-start items-center", align, { 'items-end': message.media != "" })}
        >
            {position === 'left' && <Avatar className="size-6" image={avater != "" ? "http://localhost:5000/uploads/" + avater : ""} />}
            <div className={cn("w-40 bg-[#211842] rounded flex flex-col items-center", { 'bg-[#9e7ffa]': position === 'left' })}>
                {message.media != "" &&
                    <img
                        className="w-40 p-1 h-30 mx-auto rounded-xl"
                        src={"http://localhost:5000/uploads/" + message.media}
                    />
                }
                <p className={cn("w-[100%] min-h-6 px-1 relative text-white", { "pr-6": position === 'left', 'pb-1': message.message != "" })}>
                    {message.message}
                    {position === 'left' && <CheckMark status={message.messageStatus} />}
                </p>
            </div>
            {position === 'right' && <Avatar className="size-6" image={avater != "" ? "http://localhost:5000/uploads/" + avater : ""} />}
        </div>
    )
}

const CheckMark = ({ status }: { status: string }) => {
    let icon;

    switch (status) {
        case 'sent':
            icon = <IoCheckmark />;
            break;
        case 'delivere':
            icon = <IoCheckmarkDoneOutline />;
            break;
        default:
            icon = <IoCheckmarkDoneSharp />;
    }

    return (
        <span className={cn("absolute text-gray-600 bottom-1 right-1", { 'text-green-300': status === 'read' })}>
            {icon}
        </span>
    );
};

export default Message