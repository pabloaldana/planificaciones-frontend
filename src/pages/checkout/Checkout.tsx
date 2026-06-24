import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"
import { useCart } from "@/context/CartContext"
import { useCreatePreference } from "@/hooks/usePayment"
import { getSubjectConfig } from "@/constants/subjects"

export const Checkout = () => {
    const navigate = useNavigate()
    const { items, total, count } = useCart()
    const { mutate: createPreference, isPending, error } = useCreatePreference()

    const handlePay = () => {
        createPreference(undefined, {
            onSuccess: (data) => {
                // init_point es una URL externa (MercadoPago) — navegación completa, no react-router
                window.location.href = data.init_point
            },
        })
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
            <PublicNavbar />

            <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10">
                <h1 className="text-2xl font-bold text-[#1A6B4A] mb-6">Confirmar compra</h1>

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
                    {items.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center gap-3">
                            <ShoppingCart size={32} weight="duotone" className="text-slate-300" />
                            <p className="text-slate-500 text-sm">Tu carrito está vacío.</p>
                            <button
                                onClick={() => navigate("/catalogo")}
                                className="text-[#1A6B4A] text-sm font-semibold hover:underline"
                            >
                                Ir al catálogo
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className="divide-y divide-slate-50">
                                {items.map((item) => {
                                    const subject = getSubjectConfig(item.subject)
                                    return (
                                        <li key={item.id} className="flex items-center gap-3 px-6 py-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${subject.badge}`}>
                                                        {subject.label}
                                                    </span>
                                                    <span className="text-xs text-slate-400">{item.grade} grado</span>
                                                </div>
                                                <p className="text-sm font-semibold text-slate-700 truncate">{item.title}</p>
                                            </div>
                                            <span className="text-sm font-bold text-[#1A6B4A] shrink-0">
                                                ${item.price.toLocaleString("es-AR")}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>

                            <div className="px-6 py-5 border-t border-slate-100 flex flex-col gap-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">
                                        {count} {count === 1 ? "planificación" : "planificaciones"}
                                    </span>
                                    <span className="text-lg font-bold text-[#1A6B4A]">
                                        ${total.toLocaleString("es-AR")}
                                    </span>
                                </div>

                                {error && (
                                    <p className="text-xs text-red-500 text-center">
                                        No pudimos iniciar el pago. Intentá de nuevo.
                                    </p>
                                )}

                                <button
                                    onClick={handlePay}
                                    disabled={isPending}
                                    className="w-full py-3 rounded-xl bg-[#1A6B4A] hover:bg-[#134F37] text-white text-sm font-semibold transition-colors disabled:opacity-60"
                                >
                                    {isPending ? "Redirigiendo a MercadoPago..." : "Pagar con MercadoPago"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}