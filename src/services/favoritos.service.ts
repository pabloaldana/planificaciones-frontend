import { api } from "@/config/api"
import type { Planificacion } from "./planificaciones.service"

export type Favorito = {
    id: number
    planificacion: Planificacion
    createdAt: string
}

export const addFavorito = async (planificacionId: number): Promise<Favorito> => {
    const { data } = await api.post<Favorito>(`/favoritos/${planificacionId}`)
    return data
}

export const removeFavorito = async (planificacionId: number): Promise<void> => {
    await api.delete(`/favoritos/${planificacionId}`)
}

export const getFavoritos = async (): Promise<Favorito[]> => {
    const { data } = await api.get<Favorito[]>("/favoritos")
    return data
}

export const checkFavorito = async (planificacionId: number): Promise<boolean> => {
    const { data } = await api.get<boolean>(`/favoritos/check/${planificacionId}`)
    return data
}
