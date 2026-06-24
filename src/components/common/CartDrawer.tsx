import { X, Trash, ShoppingCart } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import { subjectConfig } from "@/constants/subjects"

export const CartDrawer = () => {
    const { items, removeItem, clearCart, total, count, isOpen, closeCart } = useCart()
    const cuotas = Math.ceil(total / 3)

    return (
        <>
            {/* Backdrop */}
            <div
                className={[
                    "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={closeCart}
            />

            {/* Panel */}
            <aside
                className={[
                    "fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-white shadow-2xl flex flex-col",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} weight="duotone" className="text-[#1A6B4A]" />
                        <span className="font-bold text-slate-700">
                            Mi carrito
                        </span>
                        {count > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#1A6B4A] text-white text-[11px] font-bold flex items-center justify-center">
                                {count}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                                <ShoppingCart size={24} weight="duotone" className="text-slate-400" />
                            </div>
                            <p className="text-slate-500 text-sm">Tu carrito está vacío</p>
                            <button
                                onClick={closeCart}
                                className="text-sm text-[#1A6B4A] hover:underline"
                            >
                                Explorar planificaciones
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {items.map((item) => {
                                const subject = subjectConfig[item.subject]
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                                    >
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${subject.badge}`}>
                                                    {subject.label}
                                                </span>
                                                <span className="text-[11px] text-slate-400">
                                                    {item.grade} grado
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700 leading-snug truncate">
                                                {item.title}
                                            </p>
                                            <p className="text-sm font-bold text-[#1A6B4A] mt-1">
                                                ${item.price.toLocaleString("es-AR")}
                                            </p>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 mt-0.5"
                                            title="Eliminar"
                                        >
                                            <Trash size={15} weight="bold" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-slate-100 px-5 py-5 flex flex-col gap-4">
                        {/* Subtotal */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>{count} {count === 1 ? "planificación" : "planificaciones"}</span>
                                <span className="font-semibold text-slate-700">
                                    ${total.toLocaleString("es-AR")}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>3 cuotas sin interés</span>
                                <span>${cuotas.toLocaleString("es-AR")} / cuota</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <NavLink
                            to="/checkout"
                            onClick={closeCart}
                            className="w-full flex items-center justify-center py-3 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                        >
                            Ir al pago — ${total.toLocaleString("es-AR")}
                        </NavLink>

                        <button
                            onClick={clearCart}
                            className="text-xs text-slate-400 hover:text-red-500 hover:underline transition-colors text-center"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                )}
            </aside>
        </>
    )
}
