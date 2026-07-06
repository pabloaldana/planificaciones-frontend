import { GraduationCap, ShoppingCart } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { CartDrawer } from "@/components/common/CartDrawer"

const getDashboardPath = (roles: string[]) => {
    if (roles.includes("super-admin")) return "/admin"
    if (roles.includes("admin")) return "/dashboard"
    return "/mi-cuenta"
}

export const PublicNavbar = () => {
    const { count, openCart } = useCart()
    const { user, isAuthenticated } = useAuth()

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    <NavLink to="/" className="flex items-center gap-2 text-[#1A6B4A] font-bold text-lg">
                        <GraduationCap size={28} weight="duotone" />
                        <span>Aula</span>
                    </NavLink>

                    <div className="flex items-center gap-3">
                        {/* Carrito */}
                        <button
                            onClick={openCart}
                            className="relative p-2 rounded-xl text-slate-500 hover:text-[#1A6B4A] hover:bg-slate-50 transition-colors"
                        >
                            <ShoppingCart size={22} weight="duotone" />
                            {count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1A6B4A] text-white text-[10px] font-bold flex items-center justify-center">
                                    {count}
                                </span>
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            /* Usuario logueado */
                            <NavLink
                                to={getDashboardPath(user.roles)}
                                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-[#1A6B4A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-slate-700">
                                    {user.name} {user.lastname}
                                </span>
                            </NavLink>
                        ) : (
                            /* No logueado */
                            <>
                                <NavLink
                                    to="/login"
                                    className="hidden sm:inline-flex text-sm px-4 py-2 rounded-xl border border-slate-200 text-[#1A6B4A] hover:bg-slate-50 transition-colors"
                                >
                                    Iniciar sesión
                                </NavLink>
                                <NavLink
                                    to="/registro"
                                    className="text-sm px-4 py-2 rounded-xl bg-[#1A6B4A] text-white hover:bg-[#134F37] transition-colors"
                                >
                                    Registrarse
                                </NavLink>
                            </>
                        )}
                    </div>

                </div>
            </header>

            <CartDrawer />
        </>
    )
}