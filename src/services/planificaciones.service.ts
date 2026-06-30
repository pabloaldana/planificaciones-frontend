import { api } from "@/config/api"
import type { Materia } from "./materias.service"
import type { Grado } from "./grados.service"

export type Planificacion = {
    id: number
    title: string
    description: string
    price: number
    public_id: string
    is_active: boolean
    created_at: string
    updated_at: string
    materia: Materia
    grado: Grado
    // Todavía no existe en el backend — la card ya está lista para usarla
    // apenas se agregue una imagen de portada por planificación.
    coverImageUrl?: string
}
export type CreatePlanificacionPayload = {
    title: string
    description: string
    price: number
    materiaId: number
    gradoId: number
    file: File
}

export type UpdatePlanificacionPayload = {
    title?: string
    description?: string
    price?: number
    materiaId?: number
    gradoId?: number
    file?: File
}

export const getPlanificaciones = async (): Promise<Planificacion[]> => {
    const { data } = await api.get<Planificacion[]>("/planificaciones")
    return data
}

export const getPlanificacionById = async (id: number): Promise<Planificacion> => {
    const { data } = await api.get<Planificacion>(`/planificaciones/${id}`)
    return data
}

export type DownloadLink = {
    url: string
}

// Link firmado, vence en 10 minutos — no cachear ni guardar, pedirlo de nuevo cada vez que se necesite.
export const getDownloadUrl = async (id: number): Promise<DownloadLink> => {
    const { data } = await api.get<DownloadLink>(`/planificaciones/${id}/download`)
    return data
}

export const createPlanificacion = async (payload: CreatePlanificacionPayload): Promise<Planificacion> => {
    const formData = new FormData()
    formData.append("title", payload.title)
    formData.append("description", payload.description)
    formData.append("price", String(payload.price))
    formData.append("materiaId", String(payload.materiaId))
    formData.append("gradoId", String(payload.gradoId))
    formData.append("file", payload.file)

    const { data } = await api.post<Planificacion>("/planificaciones", formData)
    return data
}

export const updatePlanificacion = async (id: number, payload: UpdatePlanificacionPayload): Promise<Planificacion> => {
    const formData = new FormData()
    if (payload.title !== undefined) formData.append("title", payload.title)
    if (payload.description !== undefined) formData.append("description", payload.description)
    if (payload.price !== undefined) formData.append("price", String(payload.price))
    if (payload.materiaId !== undefined) formData.append("materiaId", String(payload.materiaId))
    if (payload.gradoId !== undefined) formData.append("gradoId", String(payload.gradoId))
    if (payload.file) formData.append("file", payload.file)

    const { data } = await api.patch<Planificacion>(`/planificaciones/${id}`, formData)
    return data
}