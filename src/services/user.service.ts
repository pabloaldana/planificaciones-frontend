import { api } from "@/config/api"

//datos que vienen del backend


export type User = {
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

export const updateUserStatus = async ({ id, isActive }: { id: string; isActive: boolean }): Promise<User> => {
    const { data } = await api.patch<User>(`/auth/users/${id}/status`, { isActive })
    return data
}

export const updateUserRoles = async ({ id, roles }: { id: string; roles: string[] }): Promise<User> => {
    const { data } = await api.patch<User>(`/auth/users/${id}/roles`, { roles })
    return data
}