import { IoIosSearch } from "react-icons/io"
import Form from "../../componenets/form/Form"
import Input from "../../componenets/form/Input"
import Button from "../../componenets/ui/Button"
import axiosInc from "../../utils/axios"
import Friend from "../../types/friend"

const SearchFriends = ({ setFriends }: {
    setFriends: (friends: Friend[]) => void
}) => {

    const handleSearch = async (formData: FormData) => {
        try {
            const friendsRes = await axiosInc.post("friend/search", {
                query: formData.get('search') ?? ""
            });
            setFriends(friendsRes.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Form
            className="w-full sm:w-full md:w-full lg:w-full h-[8%] mb-2 px-1 py-0 flex-row items-center"
            action={handleSearch}
        >
            <p className="text-white pl-2">@</p>
            <Input
                className="bg-transparent h-[10%] pl-1 focus:outline-0"
                name="search"
                placeholder="search username"
                type="text"
            />
            <Button
                className="w-fit bg-transparent px-3 py-0 cursor-pointer"
            >
                <IoIosSearch />
            </Button>
        </Form>
    )
}

export default SearchFriends