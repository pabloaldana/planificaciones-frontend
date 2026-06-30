import { api } from "@/config/api"

export type CreatePreferenceResponse = {
    compraIds: string[]
    preferenceId: string
    init_point: string
}

export const createPreference = async (): Promise<CreatePreferenceResponse> => {
    const { data } = await api.post<CreatePreferenceResponse>("/payments/create-preference")
    return data
}