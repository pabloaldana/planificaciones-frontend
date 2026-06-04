import { createContext, useContext, useState, type ReactNode } from "react"
import { loginRequest, registerRequest } from "@/services/auth.service"

// ── Types ─────────────────────────────────────────────────────────────────────
type User = {
    id: string
    email: string
    name: string
    lastname: string
    isActive: boolean
    token: string
    roles: string[]
}

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
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data))
            setUser(data)
            return data
        } catch {
            setError("Credenciales incorrectas. Revisá tu email y contraseña.")
            throw new Error("Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }


    const register = async (name: string, lastname: string, email: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await registerRequest({ name, lastname, email, password })
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data))
            setUser(data)
            return data
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