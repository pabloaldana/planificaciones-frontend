import { api } from "@/config/api"

//datos q mando al backen para hacer login
type LoginPayload = {
    email: string
    password: string
}

// respuesta que recibo del backend al hacer login o registro exitoso
export type AuthResponse = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    token: string
    refreshToken: string
    roles: string[]
    avatarUrl: string | null
}

// respuesta de PATCH /auth/me y POST /auth/me/avatar — mismo perfil, sin token/refreshToken
export type UserProfile = Omit<AuthResponse, "token" | "refreshToken">

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

// "credential" es el ID token (JWT) que devuelve Google al loguearse.
// El backend lo verifica con google-auth-library y busca o crea el usuario.
// Ruta propuesta por convención (/auth/login, /auth/register) — ajustala si en el backend la armaste distinto.
export const googleLoginRequest = async (credential: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/google", { credential })
    return data
}

export const uploadAvatarRequest = async (file: File): Promise<UserProfile> => {
    const formData = new FormData()
    formData.append("file", file)
    const { data } = await api.post<UserProfile>("/auth/me/avatar", formData)
    return data
}