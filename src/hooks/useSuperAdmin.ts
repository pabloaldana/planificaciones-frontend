import { useQuery } from "@tanstack/react-query"
import { getAdminSummary } from "@/services/superadmin.service"

export const useAdminSummary = () => {
    return useQuery({
        queryKey: ["adminSummary"],
        queryFn: getAdminSummary,
        staleTime: 10 * 60 * 1000,
    })
}
