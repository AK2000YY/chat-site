import { createContext, ReactNode, useState } from "react";
import User from "../types/user";


const AuthContext = createContext<{
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
} | null>(null);


const AuthProvider = ({ children }: {
    children: ReactNode
}) => {
    const [user, setUser] = useState<User>({});
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthProvider, AuthContext }