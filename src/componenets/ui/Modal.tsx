import toast from "react-hot-toast"
import axiosInc from "../../utils/axios"
import { clearData } from "../../utils/idb"
import Form from "../form/Form"
import Button from "./Button"

const Modal = ({ onClose }: {
    onClose: () => void
}) => {

    const logout = async () => {
        try {
            await axiosInc.post('auth/logout');
            await clearData();
            toast.success("you're logout");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className="bg-slate-700/80 absolute top-0 w-screen h-screen flex justify-center items-center"
        >
            <div
                className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-fit p-3 bg-slate-950 text-white rounded-xl"
            >
                <h1 className="mb-3">Logout</h1>
                <p className="mb-3">Are you sure to logout?</p>
                <div className="w-full flex justify-end gap-x-1">
                    <Button
                        className="bg-slate-900 p-3 w-fit h-fit"
                        onClick={onClose}
                    >
                        cancel
                    </Button>
                    <Form
                        className="w-fit sm:w-fit lg:w-fit h-fit p-0"
                        action={logout}
                    >
                        <Button
                            className="bg-red-500 p-3 w-fit h-fit"
                            type="submit"
                        >
                            ok
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Modal