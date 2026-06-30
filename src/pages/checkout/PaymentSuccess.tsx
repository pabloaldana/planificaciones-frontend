import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { CheckCircle } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"

export const PaymentSuccess = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["cart"] })
    }, [queryClient])

    return (
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
            <PublicNavbar />

            <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center gap-4">
                    <CheckCircle size={56} weight="duotone" className="text-[#1A6B4A]" />
                    <h1 className="text-2xl font-bold text-[#1A6B4A]">¡Pago exitoso!</h1>
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