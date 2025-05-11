import { useContext } from "react"
import toast from "react-hot-toast";
import Form from "../../componenets/form/Form"
import FormTitle from "../../componenets/form/FormTitle";
import Input from "../../componenets/form/Input";
import Button from "../../componenets/ui/Button";
import background from "../../assets/background.png"
import Image from "../../componenets/ui/Image";
import { AuthContext } from "../../context/AuthContext";
import axiosInc from "../../utils/axios";

const Signup = () => {
    const { user, setUser } = useContext(AuthContext)!;

    const handleSubmit = async (formData: FormData) => {
        try {
            const userRemote: any = await axiosInc.post("/auth/signup", {
                userName: formData.get('userName'),
                fullName: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName')
                },
                email: formData.get("email"),
                password: formData.get("password")
            });
            setUser({
                ...user,
                _id: userRemote.data._id
            });
            toast.success("you're loged!", { id: "signup" })
        } catch (error: any) {
            if (error.response)
                toast.error(error.response.data.message)
            else
                toast.error("error from server!", { id: "signup" })
        }
    }

    return (
        <div
            className="bg-slate-950 overflow-hidden w-screen h-screen flex justify-center items-center relative"
        >
            <Form
                className="py-5"
                action={handleSubmit}
            >
                <FormTitle
                    title="Signup"
                    description="create your account!"
                />
                <div>
                    <Input
                        className="mb-3"
                        name={"userName"}
                        placeholder="user name"
                    />
                    <div className="flex gap-x-1 mb-3">
                        <Input
                            name={"firstName"}
                            placeholder={"first name"}
                        />
                        <Input
                            name={"lastName"}
                            placeholder={"last name"}
                        />
                    </div>
                    <Input
                        className="mb-3"
                        name={"email"}
                        placeholder={"email"}
                    />
                    <Input
                        className="mb-3"
                        name={"password"}
                        placeholder={"password"}
                    />
                </div>
                <Button
                    className="bg-violet-900 disabled:cursor-not-allowed"
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