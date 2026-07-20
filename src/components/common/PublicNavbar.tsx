import { GraduationCap, ShoppingCart, Sun, Moon } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { CartDrawer } from "@/components/common/CartDrawer"

const getDashboardPath = (roles: string[]) => {
    if (roles.includes("super-admin")) return "/admin"
    if (roles.includes("admin")) return "/dashboard"
    return "/mi-cuenta"
}

export const PublicNavbar = () => {
    const { count, openCart } = useCart()
    const { user, isAuthenticated } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-slate-100 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    <NavLink to="/" className="flex items-center gap-2 text-[#1A6B4A] dark:text-emerald-400 font-bold text-lg">
                        <GraduationCap size={28} weight="duotone" />
                        <span>Aula</span>
                    </NavLink>

                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
                        </button>

                        {/* Carrito */}
                        <button
                            onClick={openCart}
                            className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#1A6B4A] dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
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
                                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-[#1A6B4A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {user.name} {user.lastname}
                                </span>
                            </NavLink>
                        ) : (
                            /* No logueado */
                            <>
                                <NavLink
                                    to="/login"
                                    className="hidden sm:inline-flex text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 text-[#1A6B4A] dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
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