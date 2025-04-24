import { ChangeEvent, FormEvent, useContext, useState } from "react"
import toast from "react-hot-toast";
import Form from "../../componenets/form/Form"
import User from "../../types/user"
import FormTitle from "../../componenets/form/FormTitle";
import Input from "../../componenets/form/Input";
import Button from "../../componenets/ui/Button";
import background from "../../assets/background.png"
import Image from "../../componenets/ui/Image";
import { AuthContext } from "../../context/AuthContext";
import axiosInc from "../../utils/axios";

const Signup = () => {
    const { user, setUser } = useContext(AuthContext)!
    const [userForm, setUserForm] = useState<User>({
        userName: "",
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        password: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "firstName" || name === "lastName") {
            setUserForm({
                ...userForm,
                fullName: {
                    ...userForm.fullName,
                    [name]: value
                } as { firstName: string; lastName: string }
            })
        } else
            setUserForm({
                ...userForm,
                [name]: value
            })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userRemote: any = await axiosInc.post("/auth/signup", userForm);
            setUser({
                ...user,
                _id: userRemote.data._id
            });
            toast.success("create user")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div
            className="bg-slate-950 overflow-hidden w-screen h-screen flex justify-center items-center relative"
        >
            <Form
                className="py-5"
                onSubmit={handleSubmit}
            >
                <FormTitle
                    title="Signup"
                    description="create your account!"
                />
                <div>
                    <Input
                        name={"userName"}
                        placeholder="user name"
                        onChange={handleChange}
                        value={userForm?.userName}
                    />
                    <div className="flex gap-x-1">
                        <Input
                            name={"firstName"}
                            placeholder={"first name"}
                            onChange={handleChange}
                            value={userForm?.fullName?.firstName}
                        />
                        <Input
                            name={"lastName"}
                            placeholder={"last name"}
                            onChange={handleChange}
                            value={userForm?.fullName?.lastName}
                        />
                    </div>
                    <Input
                        name={"email"}
                        placeholder={"email"}
                        onChange={handleChange}
                        value={userForm?.email}
                    />
                    <Input
                        name={"password"}
                        placeholder={"password"}
                        onChange={handleChange}
                        value={userForm?.password}
                    />
                </div>
                <Button
                    className="bg-violet-900"
                    type="submit"
                >
                    create account
                </Button>
            </Form>
            <Image
                src={background}
            />
        </div>
    )
}

export default Signup