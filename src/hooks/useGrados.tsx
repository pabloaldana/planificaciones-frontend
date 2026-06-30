import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getGrados, createGrado, updateGrado, type GradoUpdate } from "@/services/grados.service"

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

//useQueryClient es para poder invalidar la cache de los grados y que se vuelva a hacer la consulta a la api
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
