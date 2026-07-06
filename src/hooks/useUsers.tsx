import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersProfile, updateUserStatus, updateUserRoles } from "@/services/user.service";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsersProfile,
        staleTime: 10 * 60 * 1000,
    })
}

export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUserStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}

export const useUpdateUserRoles = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUserRoles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })
}