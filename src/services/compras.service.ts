import { api } from "@/config/api"
import type { Planificacion } from "./planificaciones.service"

export type Compra = {
    id: string
    planificacion: Planificacion
    priceAtPurchase: string
    paymentStatus: "paid" | "pending" | "failed"
    paymentMethod: string
    transactionId: string
    createdAt: string
    updatedAt: string
}

export const getCompras = async (): Promise<Compra[]> => {
    const { data } = await api.get<Compra[]>("/compras/mias")
    return data
}

export const getTotalVentas = async (): Promise<{ total: number }> => {
    const { data } = await api.get<{ total: number }>("/compras/total-ventas")
    return data
}

export type PlanificacionMasVendida = {
    id: number
    title: string
    materia: string
    grado: string
    price: number
    ventas: number
}

export const getMasVendidas = async (): Promise<PlanificacionMasVendida[]> => {
    const { data } = await api.get<PlanificacionMasVendida[]>("/compras/mas-vendidas")
    return data
}