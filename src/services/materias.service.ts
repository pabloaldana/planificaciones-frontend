import { api } from "@/config/api"


export type Materia = {
    id: number
    name: string
    description: string
    created_at: string
    planificacionesCount: number
}

type MateriaCreate = {
    name: string
    description: string
}

type MateriaUpdate = {
    id: number
    name: string
    description: string
}

export const getMaterias = async (): Promise<Materia[]> => {
    const { data } = await api.get<Materia[]>("/materias")
    return data
}

export const createMateria = async (materia: MateriaCreate): Promise<Materia> => {
    const { data } = await api.post<Materia>("/materias", materia)
    return data
}

export const updateMateria = async ({ id, ...body }: MateriaUpdate): Promise<Materia> => {
    const { data } = await api.patch<Materia>(`/materias/${id}`, body)
    return data
}

export const deleteMateria = async (id: number): Promise<void> => {
    await api.delete(`/materias/${id}`)
}