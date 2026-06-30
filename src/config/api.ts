import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

const logoutAndRedirect = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    window.location.href = "/login"
}

// Mientras haya un refresh en curso, las demás requests que lleguen con 401
// esperan ESE resultado en vez de disparar el suyo — el refresh token rota
// (se invalida al usarse), así que dos refrescos en paralelo harían que el
// segundo llegue con un token ya revocado y deslogueen al usuario sin motivo.
let isRefreshing = false
let pendingRequests: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = []

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryableConfig | undefined
        const isAuthEndpoint = originalRequest?.url?.includes("/auth/")

        if (error.response?.status !== 401 || isAuthEndpoint || !originalRequest || originalRequest._retry) {
            return Promise.reject(error)
        }

        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
            logoutAndRedirect()
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingRequests.push({
                    resolve: (newToken: string) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`
                        resolve(api(originalRequest))
                    },
                    reject,
                })
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            const { data } = await api.post("/auth/refresh", { refreshToken })
            localStorage.setItem("token", data.token)
            localStorage.setItem("refreshToken", data.refreshToken)

            pendingRequests.forEach(({ resolve }) => resolve(data.token))
            pendingRequests = []

            originalRequest.headers.Authorization = `Bearer ${data.token}`
            return api(originalRequest)
        } catch (refreshError) {
            // Las requests que quedaron esperando este refresh no pueden completar:
            // hay que rechazarlas explícitamente o sus promesas quedan colgadas para siempre.
            pendingRequests.forEach(({ reject }) => reject(refreshError))
            pendingRequests = []
            logoutAndRedirect()
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)
