import { FC, ImgHTMLAttributes } from "react"
import cn from "../../utils/functions";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> { }

const Image: FC<ImageProps> = ({ className, ...props }) => {
    const myStyle = "size-160 absolute bottom-[50%] right-[50%] translate-x-[50%] translate-y-[50%]";
    return (
        <img
            className={cn(myStyle, className)}
            {...props}
        />
    )
}

export default Image