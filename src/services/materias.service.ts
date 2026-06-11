import { api } from "@/config/api"


export type Materia = {
    id: number
    name: string
    description: string
    created_at: string
    planificacionesCount: number
}

export const getMaterias = async (): Promise<Materia[]> => {
    const { data } = await api.get<Materia[]>("/materias")
    // console.log("Materias obtenidas:", data) // Agrega este log para verificar la respuesta
    return data
}