import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getGrados, createGrado, updateGrado, deleteGrado, type GradoUpdate } from "@/services/grados.service"

export const useGrados = () => {
    return useQuery({
        queryKey: ["grados"],
        queryFn: getGrados,
        staleTime: 10 * 60 * 1000,
    })
}

export const useCreateGrado = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createGrado,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["grados"] })
        },
    })
}

export const useUpdateGrado = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, grado }: { id: number; grado: GradoUpdate }) => {
            return updateGrado(id, grado)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["grados"] })
        },
    })
}

export const useDeleteGrado = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteGrado,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["grados"] })
        },
    })
}
