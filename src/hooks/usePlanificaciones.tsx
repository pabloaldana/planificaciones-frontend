import { getPlanificaciones } from "@/services/planificaciones.service"
import { useQuery } from "@tanstack/react-query"


export const usePlanifiaciones = () => {
    return useQuery({
        queryKey: ["planificaciones"],
        queryFn: getPlanificaciones,
        staleTime: 10 * 60 * 1000,
    })
}