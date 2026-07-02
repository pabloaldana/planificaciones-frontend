import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMaterias, createMateria, updateMateria } from "@/services/materias.service"

export const useMaterias = () => {
    return useQuery({
        queryKey: ["materias"],
        queryFn: getMaterias,
        staleTime: 10 * 60 * 1000,
    })
}

export const useCreateMateria = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createMateria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["materias"] })
        },
    })
}

export const useUpdateMateria = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateMateria,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["materias"] })
        },
    })
}