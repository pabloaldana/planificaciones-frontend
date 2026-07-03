import {
    getPlanificaciones,
    getPlanificacionById,
    createPlanificacion,
    updatePlanificacion,
    getDownloadUrl,
    deletePlanificacionImagen,
    type CreatePlanificacionPayload,
    type UpdatePlanificacionPayload,
} from "@/services/planificaciones.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const usePlanificaciones = (search?: string) => {
    return useQuery({
        queryKey: ["planificaciones", search ?? ""],
        queryFn: () => getPlanificaciones(search),
        staleTime: 5 * 60 * 1000,
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

// Mutation (no query) a propósito: el link vence en 10 minutos, no tiene sentido cachearlo.
// Cada componente que necesite "ver" o "descargar" llama a esto en el momento del click.
export const useDownloadPlanificacion = () => {
    return useMutation({
        mutationFn: getDownloadUrl,
    })
}

export const useDeletePlanificacionImagen = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, imagenId }: { id: number; imagenId: number }) =>
            deletePlanificacionImagen(id, imagenId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planificaciones"] })
        },
    })
}
