
import { api } from "@/config/api"

export type Grado = {
    id: number
    name: string
    numero: number
    description: string
    created_at: string
    updated_at: string
    planificacionesCount: number
}

export const getGrados = async (): Promise<Grado[]> => {
    const { data } = await api.get<Grado[]>("/grados")
    return data
}