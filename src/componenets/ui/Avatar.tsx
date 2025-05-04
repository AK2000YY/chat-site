import { RxPerson } from "react-icons/rx"

const Avatar = ({ image }: {
    image: string
}) => {
    return (
        <div>
            {
                image === "" ?
                    <RxPerson className="text-white border-1 rounded-full size-6" /> :
                    <img
                        src={image}
                    />
            }
        </div>
    )
}

export default Avatar