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
            className={cn("bg-transparent mb-1 flex items-center gap-2 justify-start", align)}
        >
            {position === 'left' && <Avatar image={avater} />}
            <p
                className={cn("bg-[#211842] text-white w-fit h-fit px-2 py-1.5 rounded relative", { 'pr-6 bg-[#9e7ffa]': position === 'left' })}
            >
                {message.message}
                {position === 'left' && <CheckMark status={message.messageStatus} />}
            </p>
            {position === 'right' && <Avatar image={avater} />}
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