import { api } from "@/config/api"
import type { Planificacion } from "./planificaciones.service"

export type CartItemBackend = {
    id: string
    planificacion: Planificacion
    priceAtAdded: string
    createdAt: string
}

export type Cart = {
    id: string
    items: CartItemBackend[]
    createdAt: string
    updatedAt: string
}

export const getMyCart = async (): Promise<Cart> => {
    const { data } = await api.get<Cart>("/cart")
    return data
}

export const addCartItem = async (planificacionId: number): Promise<Cart> => {
    const { data } = await api.post<Cart>("/cart/items", { planificacionId })
    return data
}

export const removeCartItem = async (planificacionId: number): Promise<Cart> => {
    const { data } = await api.delete<Cart>(`/cart/items/${planificacionId}`)
    return data
}

export const clearCartBackend = async (): Promise<void> => {
    await api.delete("/cart")
}