import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Form from "../../componenets/form/Form";
import Input from "../../componenets/form/Input";
import User from "../../types/user";
import FormTitle from "../../componenets/form/FormTitle";
import message from "../../assets/background.png";
import Button from "../../componenets/ui/Button";
import Image from "../../componenets/ui/Image";
import axiosInc from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const { user, setUser } = useContext(AuthContext)!;
    const [userForm, setUserForm] = useState<User>({
        email: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value
        })
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const userRemote: any = await axiosInc.post("/auth/login", userForm);
            setUser({
                ...user,
                _id: userRemote.data._id
            });
            toast.success("you're loged!")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div
            className="bg-slate-950 overflow-hidden w-screen h-screen flex justify-center items-center relative"
        >
            <Form
                onSubmit={onSubmit}
            >
                <FormTitle
                    title="Login"
                    description="Login to your chat app"
                />
                <div>
                    <Input
                        name={"email"}
                        placeholder={"email"}
                        onChange={handleChange}
                    />
                    <Input
                        name={"password"}
                        placeholder={"password"}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    className="bg-violet-900"
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