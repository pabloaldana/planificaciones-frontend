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
            <div className="min-h-screen flex flex-col bg-background">
                <PublicNavbar />
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                    <div className="w-full bg-card rounded-xl border border-border shadow-sm p-12 text-center flex flex-col items-center gap-4">
                        <Clock size={56} weight="duotone" className="text-amber-500" />
                        <h1 className="text-2xl font-bold text-foreground">Pago en proceso</h1>
                        <p className="text-muted-foreground text-sm max-w-md">
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
                                className="px-6 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted text-sm font-semibold transition-colors"
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
            <div className="min-h-screen flex flex-col bg-background">
                <PublicNavbar />
                <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                    <div className="w-full bg-card rounded-xl border border-border shadow-sm p-12 text-center flex flex-col items-center gap-4">
                        <XCircle size={56} weight="duotone" className="text-red-500" />
                        <h1 className="text-2xl font-bold text-foreground">El pago no se completó</h1>
                        <p className="text-muted-foreground text-sm max-w-md">
                            El pago fue rechazado o cancelado. No se realizó ningún cargo. Podés intentarlo nuevamente.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={() => navigate("/checkout")}
                                className="px-6 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-colors"
                            >
                                Intentar de nuevo
                            </button>
                            <button
                                onClick={() => navigate("/catalogo")}
                                className="px-6 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted text-sm font-semibold transition-colors"
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
        <div className="min-h-screen flex flex-col bg-background">
            <PublicNavbar />
            <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 flex items-center">
                <div className="w-full bg-card rounded-xl border border-border shadow-sm p-12 text-center flex flex-col items-center gap-4">
                    <CheckCircle size={56} weight="duotone" className="text-primary" />
                    <h1 className="text-2xl font-bold text-primary">¡Pago exitoso!</h1>
                    <p className="text-muted-foreground text-sm max-w-md">
                        Tu compra se procesó correctamente. Ya podés acceder a tus planificaciones desde "Mis compras".
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            onClick={() => navigate("/mi-cuenta")}
                            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors"
                        >
                            Ver mis compras
                        </button>
                        <button
                            onClick={() => navigate("/catalogo")}
                            className="px-6 py-3 rounded-xl border border-border text-primary hover:bg-muted text-sm font-semibold transition-colors"
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
