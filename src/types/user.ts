type User = {
    _id?: string,
    userName?: string,
    avater?: string,
    fullName?: {
        firstName: string,
        lastName: string
    },
    email?: string,
    password?: string,
}

export default User;