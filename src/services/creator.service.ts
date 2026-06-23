import { api } from "@/config/api"
import type { Compra } from "./compras.service"

type TopPlanificacion = {
    title: string,
    ventas: string,
}

type DashboardData = {
    totalPlanificaciones: number,
    totalRevenue: number,
    topPlanificaciones: TopPlanificacion[],
    ventasRecientes: Compra[],
    usuariosActivos: number,
}

export const getDashboardData = async (): Promise<DashboardData> => {
    const { data } = await api.get<DashboardData>("/dashboard/admin")
    return data
}