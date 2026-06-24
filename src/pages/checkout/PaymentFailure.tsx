import { useNavigate, useSearchParams } from "react-router-dom"
import { Clock, XCircle } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"

export const PaymentFailure = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const collectionStatus = searchParams.get("collection_status")
    const isPending = collectionStatus === "pending"

    return (
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
            <PublicNavbar />

            <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center gap-4">
                    {isPending ? (
                        <>
                            <Clock size={56} weight="duotone" className="text-amber-500" />
                            <h1 className="text-2xl font-bold text-amber-600">Pago pendiente</h1>
                            <p className="text-slate-500 text-sm max-w-md">
                                Tu pago todavía está siendo procesado por MercadoPago. Te avisaremos cuando se confirme.
                            </p>
                        </>
                    ) : (
                        <>
                            <XCircle size={56} weight="duotone" className="text-red-500" />
                            <h1 className="text-2xl font-bold text-red-600">No pudimos procesar tu pago</h1>
                            <p className="text-slate-500 text-sm max-w-md">
                                Algo salió mal con tu pago. Tu carrito sigue disponible, podés intentarlo de nuevo.
                            </p>
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={() => navigate("/checkout")}
                            className="px-6 py-3 rounded-xl bg-[#1A6B4A] hover:bg-[#134F37] text-white text-sm font-semibold transition-colors"
                        >
                            Volver al checkout
                        </button>
                        <button
                            onClick={() => navigate("/catalogo")}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-[#1A6B4A] hover:bg-slate-50 text-sm font-semibold transition-colors"
                        >
                            Ir al catálogo
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}