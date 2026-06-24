
import { getDashboardData, getEstadisticas } from "@/services/creator.service";
import { useQuery } from "@tanstack/react-query";

export const useCreator = () => {
    return useQuery({
        queryKey: ["creator"],
        queryFn: getDashboardData,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}

export const useEstadisticas = () => {
    return useQuery({
        queryKey: ["estadisticas"],
        queryFn: getEstadisticas,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}