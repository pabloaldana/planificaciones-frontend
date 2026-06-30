
import { api } from "@/config/api"

//type para lo q me devuelve la api de getGrados
export type Grado = {
    id: number
    name: string
    numero: number
    created_at: string
    updated_at: string
}

export const getGrados = async (): Promise<Grado[]> => {
    const { data } = await api.get<Grado[]>("/grados")
    return data
}
//type para lo q me devuelve la api de createGrado
export type GradoCreate = {
    name: string
    numero: number
}

export const createGrado = async (grado: GradoCreate): Promise<Grado> => {
    const { data } = await api.post<Grado>("/grados", grado)
    return data
}

//type para lo q me devuelve la api de updateGrado
export type GradoUpdate = {
    name?: string
    numero?: number
}
export const updateGrado = async (id: number, grado: GradoUpdate): Promise<Grado> => {
    const { data } = await api.patch<Grado>(`/grados/${id}`, grado)
    return data
}
