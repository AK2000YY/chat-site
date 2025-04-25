import { IoExitOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdOutlineSettings } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import cn from "../utils/functions";



const Nav = () => {
    const iconStyle = "size-6 mb-3"
    return (
        <div className="w-[100%] sm:w-[6%] md:w-[5%] lg:w-[4%] bg-slate-900 text-white rounded-xl p-3 pb-0 flex sm:flex-col justify-between items-center shadow-2xl">
            <RxPerson className={iconStyle} />
            <LiaUserFriendsSolid className={iconStyle} />
            <IoMdSearch className={iconStyle} />
            <div className="hidden sm:block sm:grow"></div>
            <MdOutlineSettings className={iconStyle} />
            <IoExitOutline className={cn(iconStyle, "text-red-600")} />
        </div>
    )
}

export default Nav