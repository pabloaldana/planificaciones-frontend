import { getUsersProfile } from "@/services/user.service";

import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsersProfile,
        staleTime: 10 * 60 * 1000, // 10 minutos
    })
}