import { IoExitOutline, IoInformationCircleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import cn from "../utils/functions";
import { FaUserFriends } from "react-icons/fa";
import { TbHomeFilled } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Modal from "./ui/Modal";



const Nav = () => {
    const [selected, setSelected] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigation = (page: string) => {
        setSelected(page);
        navigate(page);
    }

    return (
        <div className="w-[100%] sm:w-[6%] md:w-[5%] lg:w-[4%] bg-[#110e21] text-white rounded-xl p-3 pb-0 flex sm:flex-col justify-between items-center shadow-2xl">
            <TbHomeFilled
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === "" })}
                onClick={() => handleNavigation("")}
            />
            <FaUserFriends
                className={cn("size-9 p-1 mb-3 rounded-md  shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === "friends" })}
                onClick={() => handleNavigation("friends")}
            />
            <IoMdSettings
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === "setting" })}
                onClick={() => handleNavigation("setting")}
            />
            <div className="hidden sm:block sm:grow"></div>
            <IoInformationCircleSharp
                className={cn("size-9 p-1 mb-3 rounded-md shadow cursor-pointer", { 'bg-[#9e7ffa]': selected === "info" })}
                onClick={() => handleNavigation("info")}
            />
            <IoExitOutline
                className={cn("size-9 mb-3 rounded-md shadow cursor-pointer", "pl-1 text-red-600")}
                onClick={() => {
                    setShowModal(true);
                }}
            />
            {showModal &&
                createPortal(
                    <Modal
                        onClose={() => setShowModal(false)}
                    />,
                    document.body
                )
            }
        </div>
    )
}

export default Nav