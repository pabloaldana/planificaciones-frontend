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
        <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">

            <div className={`flex aspect-[4/3] w-full items-center justify-center ${subjectCfg.badge}`}>
                {plan.imagenes?.[0]?.url ? (
                    <img
                        src={plan.imagenes[0].url}
                        alt={plan.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <FileText size={40} weight="duotone" className="opacity-40" />
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${subjectCfg.badge}`}>
                        {subjectCfg.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{plan.grado.name}</span>
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-foreground">{plan.title}</h3>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-3">
                    <span className="text-xl font-bold text-primary">
                        ${plan.price.toLocaleString("es-AR")}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <FavoritoButton planificacionId={plan.id} />
                        <button
                            onClick={handleCart}
                            title={inCart ? "Ver carrito" : "Agregar al carrito"}
                            className={[
                                "rounded-full border p-2 transition-colors",
                                inCart
                                    ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15"
                                    : "border-border text-muted-foreground hover:border-primary hover:bg-primary/5 hover:text-primary",
                            ].join(" ")}
                        >
                            {inCart ? <Check size={14} weight="bold" /> : <ShoppingCart size={14} />}
                        </button>
                        <Link
                            to={`/catalogo/${plan.id}`}
                            className="rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Ver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
