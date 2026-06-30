import { api } from "@/config/api"
import type { User } from "./user.service"

export type AdminSummary = {
    totalUsers: number,
    totalPlanificaciones: number,
    monthlyRevenue: number,
    recentUsers: User[],
}

export const getAdminSummary = async (): Promise<AdminSummary> => {
    const { data } = await api.get<AdminSummary>("/dashboard/super-admin")
    return data
}
