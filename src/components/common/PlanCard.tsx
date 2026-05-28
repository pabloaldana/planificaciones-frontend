import { Star, ShoppingCart, Check } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { subjectConfig } from "@/constants/subjects"
import { useCart } from "@/context/CartContext"

// ── Types ─────────────────────────────────────────────────────────────────────
export type Planificacion = {
    id: number
    title: string
    subject: string
    grade: string
    price: number
    rating: number
    sales: number
}

export { subjectConfig }

// ── Component ─────────────────────────────────────────────────────────────────
export const PlanCard = ({ plan }: { plan: Planificacion }) => {
    const { addItem, isInCart, openCart } = useCart()
    const inCart = isInCart(plan.id)

    const handleCart = () => {
        if (inCart) {
            openCart()
        } else {
            addItem({ id: plan.id, title: plan.title, subject: plan.subject, grade: plan.grade, price: plan.price })
            openCart()
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${subjectConfig[plan.subject].badge}`}>
                    {subjectConfig[plan.subject].label}
                </span>
                <span className="text-xs text-slate-400">{plan.grade} grado</span>
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-[#8B3A52] text-sm leading-snug">{plan.title}</h3>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-xs">
                <Star size={13} weight="fill" />
                <span className="font-semibold text-slate-600">{plan.rating}</span>
                <span className="text-slate-400 ml-1">· {plan.sales} ventas</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                <span className="text-lg font-bold text-[#8B3A52]">
                    ${plan.price.toLocaleString("es-AR")}
                </span>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={handleCart}
                        title={inCart ? "Ver carrito" : "Agregar al carrito"}
                        className={[
                            "p-2 rounded-xl border transition-colors",
                            inCart
                                ? "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                                : "border-slate-200 text-slate-500 hover:border-[#8B3A52] hover:text-[#8B3A52] hover:bg-[#8B3A52]/5",
                        ].join(" ")}
                    >
                        {inCart ? <Check size={14} weight="bold" /> : <ShoppingCart size={14} />}
                    </button>
                    <Link
                        to={`/catalogo/${plan.id}`}
                        className="text-xs px-3 py-2 rounded-xl bg-[#8B3A52] text-white hover:bg-[#6E2D40] transition-colors"
                    >
                        Ver
                    </Link>
                </div>
            </div>
        </div>
    )
}
