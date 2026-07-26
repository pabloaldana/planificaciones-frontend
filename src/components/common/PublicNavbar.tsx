import { ShoppingCart, Sun, Moon } from "@phosphor-icons/react"
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
            <header className="sticky top-0 z-50 bg-card/70 backdrop-blur border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    <NavLink to="/" className="flex items-center">
                        <img src="/logo.png" alt="Aula" className="h-16 w-auto" />
                    </NavLink>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
                        </button>

                        <button
                            onClick={openCart}
                            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <ShoppingCart size={22} weight="duotone" />
                            {count > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                                    {count}
                                </span>
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            <NavLink
                                to={getDashboardPath(user.roles)}
                                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-foreground">
                                    {user.name} {user.lastname}
                                </span>
                            </NavLink>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="hidden sm:inline-flex text-sm px-4 py-2 rounded-xl border border-border text-primary hover:bg-muted transition-colors"
                                >
                                    Iniciar sesión
                                </NavLink>
                                <NavLink
                                    to="/registro"
                                    className="text-sm px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
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
