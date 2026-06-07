import { getPlanificaciones, getPlanificacionById } from "@/services/planificaciones.service"
import { useQuery } from "@tanstack/react-query"

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