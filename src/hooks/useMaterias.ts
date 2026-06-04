import { useQuery } from "@tanstack/react-query"
import { getMaterias } from "@/services/materias.service"

export const useMaterias = () => {
    return useQuery({
        queryKey: ["materias"],
        queryFn: getMaterias,
        staleTime: 10 * 60 * 1000,
    })
}