import { api } from "@/config/api"

type Materia = {
    id: number
    name: string
    description: string
    created_at: string
}

type Grado = {
    id: number
    name: string
    numero: number
    created_at: string
    updated_at: string
}

export type Planificacion = {
    id: number
    title: string
    description: string
    price: number
    url: string
    public_id: string
    is_active: boolean
    created_at: string
    updated_at: string
    materia: Materia
    grado: Grado
}
export type CreatePlanificacionPayload = {
    title: string
    description: string
    price: number
    materiaId: number
    gradoId: number
    file: File
}

export const getPlanificaciones = async (): Promise<Planificacion[]> => {
    const { data } = await api.get<Planificacion[]>("/planificaciones")
    // console.log("Planificaciones obtenidas:", data) // Agrega este log para verificar los datos obtenidos
    return data
}

export const getPlanificacionById = async (id: number): Promise<Planificacion> => {
    const { data } = await api.get<Planificacion>(`/planificaciones/${id}`)
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