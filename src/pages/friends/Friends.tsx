import { useState } from "react"
import SearchFriends from "./SearchFriends"
import SearchResult from "./SearchResult"
import Friend from "../../types/friend";

const Friends = () => {
    const [searchResault, setSearchResult] = useState<Friend[]>([]);

    const handleSearch = (friends: Friend[]) => {
        setSearchResult(friends);
    }

    return (
        <div className="bg-[#110e21] w-[100%] h-[100%] sm:w-[50%] lg:w-[40%] mx-auto mb-3 sm:mb-0 rounded-xl p-3 self-center">
            <SearchFriends
                setFriends={handleSearch}
            />
            <SearchResult
                friends={searchResault}
            />
        </div>
    )
}

export default Friends