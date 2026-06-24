import { createContext, useContext, useState, type ReactNode } from "react"
import { loginRequest, registerRequest, type AuthResponse } from "@/services/auth.service"

// ── Types ─────────────────────────────────────────────────────────────────────
// Solo datos de perfil — el token/refreshToken NUNCA se guardan acá adentro,
// viven aparte en localStorage["token"]/["refreshToken"] (los lee el interceptor de api.ts).
type User = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    roles: string[]
}

const toProfile = (data: AuthResponse): User => ({
    id: data.id,
    email: data.email,
    name: data.name,
    lastname: data.lastname,
    isActive: data.isActive,
    roles: data.roles,
})

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<User>
    logout: () => void
    register: (name: string, lastname: string, email: string, password: string) => Promise<User>
}

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        // Al iniciar la app rehidrata el usuario desde localStorage
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) : null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await loginRequest({ email, password })
            const profile = toProfile(data)
            localStorage.setItem("token", data.token)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem("user", JSON.stringify(profile))
            setUser(profile)
            return profile
        } catch {
            setError("Credenciales incorrectas. Revisá tu email y contraseña.")
            throw new Error("Login failed")
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


    const register = async (name: string, lastname: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await registerRequest({ name, lastname, email, password })
            const profile = toProfile(data)
            localStorage.setItem("token", data.token)
            localStorage.setItem("refreshToken", data.refreshToken)
            localStorage.setItem("user", JSON.stringify(profile))
            setUser(profile)
            return profile
        } catch {
            setError("Error al registrarse. Intentá nuevamente.")
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
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider")
    return ctx
}