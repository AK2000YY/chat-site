import { FC, FormHTMLAttributes } from "react"
import cn from "../../utils/functions"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> { }

const Form: FC<FormProps> = ({ className, ...props }) => {
    const myStyle = "w-[80%] sm:w-[50%] lg:w-[30%] h-[85%] px-5 py-15 bg-slate-900/90 rounded-2xl shadow z-5 flex flex-col justify-between"
    return (
        <form
            className={cn(myStyle, className)}
            autoComplete="off"
            {...props}
        />
    )
}

export default Form