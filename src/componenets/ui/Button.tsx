import { ButtonHTMLAttributes, FC } from "react"
import cn from "../../utils/functions"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FC<ButtonProps> = ({ className, ...props }) => {
    const myStyle = "bg-slate-400 w-full py-3 rounded-xl text-white font-bold text-xl";
    return (
        <button
            className={cn(myStyle, className)}
            {...props}
        />
    )
}

export default Button