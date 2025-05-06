import { FC, ImgHTMLAttributes } from "react"
import { RxPerson } from "react-icons/rx"
import cn from "../../utils/functions"

interface AvatarProp extends ImgHTMLAttributes<HTMLImageElement> {
    image: string
}

const Avatar: FC<AvatarProp> = ({ className, image }) => {
    return (
        <div>
            {
                image === "" ?
                    <RxPerson className={"text-white p-1 border-1 rounded-full"} /> :
                    <img
                        className={cn("size-10 rounded-full", className)}
                        src={"http://localhost:5000/uploads/" + image}
                    />
            }
        </div>
    )
}

export default Avatar