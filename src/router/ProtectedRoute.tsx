import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

interface ProtectedRouteProps {
    allowedRoles: string[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth()

    if (!user) return <Navigate to="/login" replace />

    if (!user.roles.some((r: string) => allowedRoles.includes(r))) return <Navigate to="/" replace />

    return <Outlet />
}