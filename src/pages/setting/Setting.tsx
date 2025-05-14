import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import Avatar from "../../componenets/ui/Avatar";
import Form from "../../componenets/form/Form";
import Input from "../../componenets/form/Input";
import { TbCameraPlus } from "react-icons/tb";
import Button from "../../componenets/ui/Button";
import UserOptionChange from "./UserOptionChange";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import axiosInc from "../../utils/axios";
import toast from "react-hot-toast";

const Setting = () => {

    const { user, setUser } = useContext(AuthContext)!;
    const [preview, setPreview] = useState<string>("");
    const [expandUsername, setExpandUsername] = useState<boolean>(true);
    const [expandPassword, setExpandPassword] = useState<boolean>(true);

    const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const updatePhoto = async (formData: FormData) => {
        try {
            const avater = await axiosInc.post('/auth/change-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPreview("")
            setUser(prev => ({ ...prev, avater: avater.data }));
            toast.success("photo is changed!", { id: 'photo' })
        } catch (error) {
            console.log(error)
        }
    }

    const updateUsername = async (formData: FormData) => {
        try {
            const username = await axiosInc.post('/auth/change-username', {
                username: formData.get('username')
            });
            setUser(prev => ({ ...prev, userName: username.data }));
            toast.success("username is changed!", { id: 'username' });
        } catch (error) {
            console.log(error)
        }
    }

    const updatePassword = async (formData: FormData) => {
        try {
            if (formData.get('confPassword') != formData.get('newPassword')) {
                toast.error("the passwords aren't matched!");
                return;
            }
            await axiosInc.post('/auth/change-password', {
                password: formData.get('password'),
                newPassword: formData.get('newPassword')
            });
            toast.success("password is changed!", { id: 'password' });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-[#110e21] w-[100%] h-[100%] sm:w-[50%] lg:w-[40%] mx-auto mb-3 sm:mb-0 rounded-xl self-center overflow-y-auto">
            <Form
                action={updatePhoto}
                className="relative bg-transparent w-full sm:w-full h-fit lg:w-full py-10 items-center justify-start shadow-none"
            >
                <Avatar
                    image={preview === "" ? user.avater ? "http://localhost:5000/uploads/" + user.avater : "" : preview}
                    className="w-25 h-25"
                >
                    <label className="absolute bottom-0.5 right-0">
                        <Input
                            className="hidden absolute w-3 h-3"
                            type="file"
                            name="avatar"
                            onChange={handlePhoto}
                        />
                        <TbCameraPlus className="bg-[#a07cfc] text-white rounded-full size-8 p-1" />
                    </label>
                </Avatar>
                {preview != "" &&
                    <div className="absolute top-[50%] right-5 translate-y-[-50%] flex">
                        <Button
                            type="submit"
                            className="bg-green-500 w-fit h-fit p-2 rounded-full mr-2"
                        >
                            <FaCheck />
                        </Button>
                        <Button
                            className="bg-red-500 w-fit h-fit p-2 rounded-full"
                            onClick={() =>
                                setPreview("")
                            }
                        >
                            <IoCloseSharp />
                        </Button>
                    </div>
                }
            </Form>
            <UserOptionChange
                option="username"
                isExpnad={expandUsername}
                onExpnad={() => setExpandUsername(!expandUsername)}
            >
                {expandUsername &&
                    <Form
                        action={updateUsername}
                        className="bg-transparent h-fit w-full sm:w-full lg:w-full py-4 flex-row items-center gap-2"
                    >
                        <Input
                            className="bg-transparent h-8 border-b-gray-200 border-b-1 rounded-none focus:outline-0"
                            type="text"
                            name="username"
                            placeholder="username"
                        />
                        <Button
                            className="bg-[#a07cfc] text-white rounded-sm w-20 h-8 text-sm font-medium flex justify-center items-center"
                            type="submit"
                        >Change</Button>
                    </Form>
                }
            </UserOptionChange>
            <UserOptionChange
                option="password"
                isExpnad={expandPassword}
                onExpnad={() => setExpandPassword(!expandPassword)}
            >
                {expandPassword &&
                    <Form
                        className="bg-transparent h-fit w-full sm:w-full lg:w-full py-4"
                        action={updatePassword}
                    >
                        <Input
                            className="bg-transparent h-8 mb-4 border-b-gray-200 border-b-1 rounded-none focus:outline-0"
                            name="password"
                            placeholder="password"
                        />
                        <Input
                            className="bg-transparent h-8 mb-4 border-b-gray-200 border-b-1 rounded-none focus:outline-0"
                            name="newPassword"
                            placeholder="new password"
                        />
                        <Input
                            className="bg-transparent h-8 mb-4 border-b-gray-200 border-b-1 rounded-none focus:outline-0"
                            name="confPassword"
                            placeholder="confirm new password"
                        />
                        <Button
                            className="bg-[#a07cfc] text-white rounded-sm w-full h-8 text-sm font-medium flex justify-center items-center"
                        >Change</Button>
                    </Form>
                }
            </UserOptionChange>
        </div>
    )
}

export default Setting