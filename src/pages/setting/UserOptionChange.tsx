import { ReactNode } from "react"
import Button from "../../componenets/ui/Button"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

const UserOptionChange = ({ option, isExpnad, onExpnad, children }: {
    option: string,
    isExpnad: boolean,
    onExpnad: () => void,
    children: ReactNode
}) => {
    return (
        <div className="w-full">
            <div className="w-full px-5 flex justify-between text-white mb-3">
                <h1>{option}</h1>
                <Button
                    className="bg-[#a07cfc] rounded-sm w-fit h-8 px-2 text-sm font-medium flex justify-center items-center"
                    onClick={onExpnad}
                >
                    {
                        isExpnad ? <RiArrowUpSLine /> : <RiArrowDownSLine />
                    }
                </Button>
            </div>
            {children}
        </div>
    )
}

export default UserOptionChange