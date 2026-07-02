import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addFavorito, removeFavorito, getFavoritos, checkFavorito } from "@/services/favoritos.service"

export const useFavoritos = () => {
    return useQuery({
        queryKey: ["favoritos"],
        queryFn: getFavoritos,
        staleTime: 5 * 60 * 1000,
    })
}

export const useCheckFavorito = (planificacionId: number) => {
    return useQuery({
        queryKey: ["favoritos", "check", planificacionId],
        queryFn: () => checkFavorito(planificacionId),
        staleTime: 5 * 60 * 1000,
        enabled: !!planificacionId,
    })
}

export const useToggleFavorito = (planificacionId: number) => {
    const queryClient = useQueryClient()

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["favoritos"] })
    }

    const add = useMutation({
        mutationFn: () => addFavorito(planificacionId),
        onSuccess: invalidate,
    })

    const remove = useMutation({
        mutationFn: () => removeFavorito(planificacionId),
        onSuccess: invalidate,
    })

    return { add, remove }
}
