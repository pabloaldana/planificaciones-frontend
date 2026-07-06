import { ShoppingCart, Check, FileText } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { getSubjectConfig } from "@/constants/subjects"
import { useCart } from "@/context/CartContext"
import { type Planificacion } from "@/services/planificaciones.service"
import { FavoritoButton } from "./FavoritoButton"

export type { Planificacion }

export const PlanCard = ({ plan }: { plan: Planificacion }) => {
    const { addItem, isInCart, openCart } = useCart()
    const inCart = isInCart(plan.id)
    const subjectCfg = getSubjectConfig(plan.materia.name)

    const handleCart = () => {
        if (inCart) {
            openCart()
        } else {
            addItem({ id: plan.id, title: plan.title, subject: plan.materia.name, grade: plan.grado.name, price: plan.price })
            openCart()
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">

            <div className={`w-full aspect-4/3 flex items-center justify-center ${subjectCfg.badge}`}>
                {plan.imagenes?.[0]?.url ? (
                    <img
                        src={plan.imagenes[0].url}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <FileText size={40} weight="duotone" className="opacity-40" />
                )}
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${subjectCfg.badge}`}>
                        {subjectCfg.label}
                    </span>
                    <span className="text-xs text-slate-400">{plan.grado.name}</span>
                </div>

                <div className="flex-1">
                    <h3 className="font-bold text-[#1A6B4A] text-sm leading-snug">{plan.title}</h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                    <span className="text-lg font-bold text-[#1A6B4A]">
                        ${plan.price.toLocaleString("es-AR")}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <FavoritoButton planificacionId={plan.id} />
                        <button
                            onClick={handleCart}
                            title={inCart ? "Ver carrito" : "Agregar al carrito"}
                            className={[
                                "p-2 rounded-xl border transition-colors",
                                inCart
                                    ? "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                                    : "border-slate-200 text-slate-500 hover:border-[#1A6B4A] hover:text-[#1A6B4A] hover:bg-[#1A6B4A]/5",
                            ].join(" ")}
                        >
                            {inCart ? <Check size={14} weight="bold" /> : <ShoppingCart size={14} />}
                        </button>
                        <Link
                            to={`/catalogo/${plan.id}`}
                            className="text-xs px-3 py-2 rounded-xl bg-[#1A6B4A] text-white hover:bg-[#134F37] transition-colors"
                        >
                            Ver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}