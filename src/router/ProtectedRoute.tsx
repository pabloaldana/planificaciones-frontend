import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

interface ProtectedRouteProps {
    allowedRoles: string[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth()

    // Fallback a localStorage para el instante entre login/register y la actualización del estado
    const effectiveUser = user ?? JSON.parse(localStorage.getItem("user") ?? "null")

    if (!effectiveUser) return <Navigate to="/login" replace />

    if (!effectiveUser.roles.some((r: string) => allowedRoles.includes(r))) return <Navigate to="/" replace />

    return <Outlet />
}