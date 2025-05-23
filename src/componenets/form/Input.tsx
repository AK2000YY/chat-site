import { FC, InputHTMLAttributes } from "react"
import cn from "../../utils/functions";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<InputProps> = ({ className, children, ...props }) => {
    const myStyle = "w-full h-15 px-2 rounded-md text-white shadow-2xs bg-slate-700";
    return (
        <div
            className="w-full h-fit"
        >
            <input
                className={cn(myStyle, className)}
                type="text"
                {...props}
            />
        </div>
    )
}

export default Input