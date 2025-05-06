import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import cn from "../utils/functions";
import { FaUserFriends } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";
import { useState } from "react";



const Nav = () => {
    const [selected, setSelected] = useState<number>(0)
    return (
        <div className="w-[100%] sm:w-[6%] md:w-[5%] lg:w-[4%] bg-[#110e21] text-white rounded-xl p-3 pb-0 flex sm:flex-col justify-between items-center shadow-2xl">
            <TbHomeFilled
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === 0 })}
                onClick={() => setSelected(0)}
            />
            <FaUserFriends
                className={cn("size-9 p-1 mb-3 rounded-md  shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === 1 })}
                onClick={() => setSelected(1)}
            />
            <IoMdSearch
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === 2 })}
                onClick={() => setSelected(2)}
            />
            <div className="hidden sm:block sm:grow"></div>
            <MdOutlineSettings
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === 3 })}
                onClick={() => setSelected(3)}
            />
            <IoExitOutline
                className={cn("size-9 mb-3 rounded-md shadow cursor-pointer", "pl-1 text-red-600")}
            />
        </div>
    )
}

export default Nav