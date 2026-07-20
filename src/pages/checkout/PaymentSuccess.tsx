import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { CheckCircle, Clock, XCircle } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"

export const PaymentSuccess = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const status = searchParams.get("collection_status") ?? searchParams.get("status")

    useEffect(() => {
        if (status === "approved") {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            queryClient.invalidateQueries({ queryKey: ["compras"] })
        }
    }, [status, queryClient])

    if (status === "pending" || status === "in_process") {
        return (
            <div className="min-h-screen flex flex-col bg-[#F2F2F2] dark:bg-gray-900">
                <PublicNavbar />
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                    <div className="w-full bg-white dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700 shadow-sm p-12 text-center flex flex-col items-center gap-4">
                        <Clock size={56} weight="duotone" className="text-amber-500" />
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Pago en proceso</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
                            Tu pago está siendo procesado. Te avisaremos cuando se confirme. Podés revisar el estado desde "Mis compras".
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={() => navigate("/mi-cuenta")}
                                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
                            >
                                Ver mis compras
                            </button>
                            <button
                                onClick={() => navigate("/catalogo")}
                                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700 text-sm font-semibold transition-colors"
                            >
                                Volver al catálogo
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (status === "rejected" || (status !== null && status !== "approved")) {
        return (
            <div className="min-h-screen flex flex-col bg-[#F2F2F2] dark:bg-gray-900">
                <PublicNavbar />
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                    <div className="w-full bg-white dark:bg-gray-800 rounded-xl border border-slate-100 dark:border-gray-700 shadow-sm p-12 text-center flex flex-col items-center gap-4">
                        <XCircle size={56} weight="duotone" className="text-red-500" />
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">El pago no se completó</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
                            El pago fue rechazado o cancelado. No se realizó ningún cargo. Podés intentarlo nuevamente.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={() => navigate("/checkout")}
                                className="px-6 py-3 rounded-xl bg-[#8B3A52] hover:bg-[#7a3047] text-white text-sm font-semibold transition-colors"
                            >
                                Intentar de nuevo
                            </button>
                            <button
                                onClick={() => navigate("/catalogo")}
                                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700 text-sm font-semibold transition-colors"
                            >
                                Volver al catálogo
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F2F2F2] dark:bg-gray-900">
            <PublicNavbar />
            <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center gap-4">
                    <CheckCircle size={56} weight="duotone" className="text-[#1A6B4A]" />
                    <h1 className="text-2xl font-bold text-[#1A6B4A] dark:text-emerald-400">¡Pago exitoso!</h1>
                    <p className="text-slate-500 text-sm max-w-md">
                        Tu compra se procesó correctamente. Ya podés acceder a tus planificaciones desde "Mis compras".
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={() => navigate("/mi-cuenta")}
                            className="px-6 py-3 rounded-xl bg-[#1A6B4A] hover:bg-[#134F37] text-white text-sm font-semibold transition-colors"
                        >
                            Ver mis compras
                        </button>
                        <button
                            onClick={() => navigate("/catalogo")}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-[#1A6B4A] hover:bg-slate-50 text-sm font-semibold transition-colors"
                        >
                            Seguir explorando el catálogo
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
