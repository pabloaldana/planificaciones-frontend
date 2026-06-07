import { useQuery } from "@tanstack/react-query"
import { getGrados } from "@/services/grados.service"

export const useGrados = () => {
    return useQuery({
        queryKey: ["grados"],
        queryFn: getGrados,
        staleTime: 10 * 60 * 1000,
    })
}