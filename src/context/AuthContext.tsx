import { createContext, useContext, useState, type ReactNode } from "react"
import { loginRequest, registerRequest, googleLoginRequest, uploadAvatarRequest, updateProfileRequest, type AuthResponse, type UserProfile } from "@/services/auth.service"

// ── Types ─────────────────────────────────────────────────────────────────────
// Solo datos de perfil — el token/refreshToken NUNCA se guardan acá adentro,
// viven aparte en localStorage["token"]/["refreshToken"] (los lee el interceptor de api.ts).
export type User = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    roles: string[]
    avatarUrl: string | null
}

const toProfile = (data: AuthResponse | UserProfile): User => ({
    id: data.id,
    email: data.email,
    name: data.name,
    lastname: data.lastname,
    isActive: data.isActive,
    roles: data.roles,
    avatarUrl: data.avatarUrl,
})

// Guarda token/refreshToken/perfil en localStorage — login, register y Google
// terminan todos en el mismo estado, esto evita triplicar esas 4 líneas.
const persistSession = (data: AuthResponse): User => {
    const profile = toProfile(data)
    localStorage.setItem("token", data.token)
    localStorage.setItem("refreshToken", data.refreshToken)
    localStorage.setItem("user", JSON.stringify(profile))
    return profile
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<User>
    loginWithGoogle: (credential: string) => Promise<User>
    logout: () => void
    register: (name: string, lastname: string, email: string, password: string) => Promise<User>
    updateAvatar: (file: File) => Promise<User>
    updateProfile: (data: { name?: string; lastname?: string }) => Promise<User>
}

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user")
        if (!stored) return null
        try {
            return JSON.parse(stored)
        } catch {
            localStorage.removeItem("user")
            return null
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await loginRequest({ email, password })
            const profile = persistSession(data)
            setUser(profile)
            return profile
        } catch {
            setError("Credenciales incorrectas. Revisá tu email y contraseña.")
            throw new Error("Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    const loginWithGoogle = async (credential: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await googleLoginRequest(credential)
            const profile = persistSession(data)
            setUser(profile)
            return profile
        } catch {
            setError("No pudimos iniciar sesión con Google. Probá de nuevo.")
            throw new Error("Google login failed")
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        setUser(null)
    }

    const updateAvatar = async (file: File) => {
        const data = await uploadAvatarRequest(file)
        const profile = toProfile(data)
        localStorage.setItem("user", JSON.stringify(profile))
        setUser(profile)
        return profile
    }

    const updateProfile = async (payload: { name?: string; lastname?: string }) => {
        const data = await updateProfileRequest(payload)
        const profile = toProfile(data)
        localStorage.setItem("user", JSON.stringify(profile))
        setUser(profile)
        return profile
    }


    const register = async (name: string, lastname: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await registerRequest({ name, lastname, email, password })
            const profile = persistSession(data)
            setUser(profile)
            return profile
        } catch (err) {
            const messages = (err as { response?: { data?: { message?: string | string[] } } }).response?.data?.message
            const readable = Array.isArray(messages) ? messages[0] : (messages ?? "Error al registrarse. Intentá nuevamente.")
            setError(readable)
            throw new Error("Register failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            error,
            login,
            loginWithGoogle,
            logout,
            register,
            updateAvatar,
            updateProfile,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    console.log("useAuth called") //! llega bien
    const ctx = useContext(AuthContext)
    console.log("useAuth ctx:", ctx) //! no llega nada
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
    return ctx
}