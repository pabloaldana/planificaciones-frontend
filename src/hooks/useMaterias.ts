import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMaterias, createMateria } from "@/services/materias.service"

export const useMaterias = () => {
    return useQuery({
        queryKey: ["materias"],
        queryFn: getMaterias,
        staleTime: 10 * 60 * 1000,
    })
}

export const useCreateMateria = () => {
    //queryclient es un objeto que nos permite interactuar con la cache de react-query, en este caso lo usamos para invalidar la cache de materias cuando se crea una nueva materia
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createMateria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["materias"] })
        },
    })
}