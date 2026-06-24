import {
    getPlanificaciones,
    getPlanificacionById,
    createPlanificacion,
    updatePlanificacion,
    type CreatePlanificacionPayload,
    type UpdatePlanificacionPayload,
} from "@/services/planificaciones.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const usePlanificaciones = () => {
    return useQuery({
        queryKey: ["planificaciones"],
        queryFn: getPlanificaciones,
        staleTime: 10 * 60 * 1000,
    })
}

export const usePlanificacion = (id: number) => {
    return useQuery({
        queryKey: ["planificaciones", id],
        queryFn: () => getPlanificacionById(id),
        staleTime: 10 * 60 * 1000,
        enabled: !!id,
    })
}

export const useCreatePlanificacion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: CreatePlanificacionPayload) => createPlanificacion(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planificaciones"] })
        },
    })
}

export const useUpdatePlanificacion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdatePlanificacionPayload }) =>
            updatePlanificacion(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planificaciones"] })
        },
    })
}
