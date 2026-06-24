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

export type VentaPorMes = {
    mes: string,
    ventas: number,
}

export type VentaPorMateria = {
    materia: string,
    ventas: number,
}

export type PlanificacionVendida = {
    title: string,
    materia: string,
    grado: string,
    ventas: number,
    ingresos: number,
}

export type EstadisticasData = {
    ingresosTotales: number,
    totalVentas: number,
    masVendida: { title: string, ventas: number } | null,
    mejorMes: { mes: string, monto: number } | null,
    ventasPorMes: VentaPorMes[],
    ventasPorMateria: VentaPorMateria[],
    planificacionesVendidas: PlanificacionVendida[],
}

// El backend devuelve ingresosTotales/totalVentas/ventas/monto como vienen de SUM()/COUNT()
// crudos de TypeORM, que Postgres entrega como string para no perder precisión.
type EstadisticasResponse = {
    ingresosTotales: number | string,
    totalVentas: number | string,
    masVendida: { title: string, ventas: number | string } | null,
    mejorMes: { mes: string, monto: number | string } | null,
    ventasPorMes: VentaPorMes[],
    ventasPorMateria: VentaPorMateria[],
    planificacionesVendidas: PlanificacionVendida[],
}

export const getEstadisticas = async (): Promise<EstadisticasData> => {
    const { data } = await api.get<EstadisticasResponse>("/dashboard/admin/estadisticas")
    return {
        ...data,
        ingresosTotales: Number(data.ingresosTotales),
        totalVentas: Number(data.totalVentas),
        masVendida: data.masVendida
            ? { ...data.masVendida, ventas: Number(data.masVendida.ventas) }
            : null,
        mejorMes: data.mejorMes
            ? { ...data.mejorMes, monto: Number(data.mejorMes.monto) }
            : null,
    }
}