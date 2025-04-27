import { ButtonHTMLAttributes, FC } from "react"
import cn from "../../utils/functions"
import { useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<ButtonProps> = ({ className, ...props }) => {
    const status = useFormStatus();
    const myStyle = "bg-slate-400 w-full py-3 rounded-xl text-white font-bold text-xl";
    return (
        <button
            className={cn(myStyle, className)}
            disabled={status.pending}
            {...props}
        />
    )
}

export default Button