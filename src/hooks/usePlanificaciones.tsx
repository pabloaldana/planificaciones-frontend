import {
    getPlanificaciones,
    getPlanificacionesAdmin,
    getPlanificacionById,
    createPlanificacion,
    updatePlanificacion,
    deletePlanificacion,
    reactivatePlanificacion,
    getDownloadUrl,
    deletePlanificacionImagen,
    type CreatePlanificacionPayload,
    type UpdatePlanificacionPayload,
    type PlanificacionesParams,
} from "@/services/planificaciones.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const usePlanificaciones = (params?: PlanificacionesParams) => {
    return useQuery({
        queryKey: ["planificaciones", params?.search ?? "", params?.page ?? 1, params?.materiaIds ?? "", params?.gradoIds ?? "", params?.sortBy ?? ""],
        queryFn: () => getPlanificaciones(params),
        staleTime: 5 * 60 * 1000,
    })
}

export const usePlanificacionesAdmin = (params?: PlanificacionesParams) => {
    return useQuery({
        queryKey: ["planificaciones-admin", params?.search ?? "", params?.page ?? 1, params?.limit ?? 10, params?.materiaIds ?? "", params?.gradoIds ?? "", params?.sortBy ?? ""],
        queryFn: () => getPlanificacionesAdmin(params),
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

export const useReactivatePlanificacion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => reactivatePlanificacion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planificaciones-admin"] })
        },
    })
}

export const useDeletePlanificacion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deletePlanificacion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["planificaciones-admin"] })
        },
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
