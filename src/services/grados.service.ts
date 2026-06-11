
import { api } from "@/config/api"

export type Grado = {
    id: string
    name: string
    description: string
    planificacionesCount: number
}

export const getGrados = async (): Promise<Grado[]> => {
    const { data } = await api.get<Grado[]>("/grados")
    // console.log("Grados obtenidos:", data) // Agrega este log para verificar la respuesta
    return data
}