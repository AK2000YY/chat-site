import { FC, ImgHTMLAttributes } from "react"
import { RxPerson } from "react-icons/rx"
import cn from "../../utils/functions"

interface AvatarProp extends ImgHTMLAttributes<HTMLImageElement> {
    image: string
}

const Avatar: FC<AvatarProp> = ({ children, className, image }) => {
    return (
        <div className="relative">
            {
                image === "" ?
                    <RxPerson className={cn("text-white p-1 border-1 rounded-full", className)} /> :
                    <img
                        className={cn("size-10 rounded-full", className)}
                        src={image}
                    />
            }
            {children}
        </div>
    )
}

export default Avatar