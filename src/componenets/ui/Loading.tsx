import { FaCircleNotch } from "react-icons/fa";
import cn from "../../utils/functions";
import { FC, HTMLAttributes } from "react";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> { }

const Loading: FC<LoadingProps> = ({ className, ...props }) => {
    const myStyle = "absolute z-3 bg-slate-950 h-[100vh] w-[100vw] flex justify-center items-center";
    return (
        <div className={cn(myStyle, className)} {...props}>
            <FaCircleNotch
                className="text-violet-800 size-16 transition-1000 ease-in animate-spin"
            />
        </div>
    )
}

export default Loading