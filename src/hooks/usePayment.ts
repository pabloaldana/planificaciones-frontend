import { useMutation } from "@tanstack/react-query"
import { createPreference } from "@/services/payment.service"

export const useCreatePreference = () => {
    return useMutation({
        mutationFn: createPreference,
    })
}