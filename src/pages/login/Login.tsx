import { useContext } from "react";
import Form from "../../componenets/form/Form";
import Input from "../../componenets/form/Input";
import FormTitle from "../../componenets/form/FormTitle";
import message from "../../assets/background.png";
import Button from "../../componenets/ui/Button";
import Image from "../../componenets/ui/Image";
import axiosInc from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const { user, setUser } = useContext(AuthContext)!;

    const onSubmit = async (formData: FormData) => {
        console.log(formData.get('email'), formData.get('password'))
        try {
            const userRemote: any = await axiosInc.post("/auth/login", {
                email: formData.get('email'),
                password: formData.get('password')
            });
            setUser({
                ...user,
                _id: userRemote.data._id
            });
            toast.success("you're loged!", { id: "login" })
        } catch (error: any) {
            if (error.response)
                toast.error(error.response.data.message)
            else
                toast.error("error from server!", { id: "login" })
        }
    }

    return (
        <div
            className="bg-slate-950 overflow-hidden w-screen h-screen flex justify-center items-center relative"
        >
            <Form
                action={onSubmit}
            >
                <FormTitle
                    title="Login"
                    description="Login to your chat app"
                />
                <div>
                    <Input
                        name={"email"}
                        placeholder={"email"}
                    />
                    <Input
                        name={"password"}
                        placeholder={"password"}
                    />
                </div>
                <Button
                    className="bg-violet-900 disabled:cursor-not-allowed disabled:text-white/50"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
            <Image
                src={message} alt="background"
            />
        </div>
    )
}

export default Login;