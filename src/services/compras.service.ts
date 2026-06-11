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