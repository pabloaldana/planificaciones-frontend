import { api } from "@/config/api"

//datos que vienen del backend


type User = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    roles: string[]
}



export const getUsersProfile = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/auth/users")
    return data
}