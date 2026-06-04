import { api } from "@/config/api"

//datos q mando al backen para hacer login
type LoginPayload = {
    email: string
    password: string
}

// respuesta que recibo del backend al hacer login o registro exitoso
type AuthResponse = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    token: string
    roles: string[]
}

//datos q mando al backen para registrar un nuevo usuario
type RegisterPayload = {
    name: string
    lastname: string
    email: string
    password: string
}

export const loginRequest = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", payload)
    return data
}

export const registerRequest = async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", payload)
    return data
}