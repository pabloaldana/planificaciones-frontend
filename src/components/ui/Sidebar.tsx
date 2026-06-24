import { NavLink, useNavigate } from "react-router-dom"
import { BookBookmark, X, SignOut } from "@phosphor-icons/react"
import { useAuth } from "@/context/AuthContext"
import type { ReactNode } from "react"

export type NavItem = {
    label: string
    to: string
    icon: ReactNode
    end?: boolean
}

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    navItems: NavItem[]
    subtitle: string
}

export const Sidebar = ({ isOpen, onClose, navItems, subtitle }: SidebarProps) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleNavClick = () => {
        if (window.innerWidth < 768) onClose()
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const initials = user?.email?.charAt(0).toUpperCase() ?? "U"
    const rolLabel = user?.roles?.[0] ?? ""

    return (
        <>
            {/* Backdrop — solo mobile */}
            <div
                className={[
                    "fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={onClose}
            />

            {/* Sidebar panel */}
            <aside
                className={[
                    "fixed md:static inset-y-0 left-0 z-50 md:z-auto",
                    "w-[250px] min-h-screen bg-white border-r border-slate-200 flex flex-col shrink-0",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                    !isOpen ? "md:hidden" : "",
                ].join(" ")}
            >
                {/* Brand */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#1A6B4A] flex items-center justify-center shrink-0">
                        <BookBookmark size={20} weight="fill" color="white" />
                    </div>
                    <div className="flex flex-col leading-tight flex-1">
                        <span className="text-[#1A6B4A] font-bold text-base leading-none">Aula</span>
                        <span className="text-slate-400 text-xs mt-0.5">{subtitle}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4">
                    <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider px-2 mb-2">
                        Navegación
                    </p>
                    <ul className="space-y-0.5">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    onClick={handleNavClick}
                                    className={({ isActive }) =>
                                        [
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-[#D1F2EB] text-[#1A6B4A]"
                                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                                        ].join(" ")
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className={isActive ? "text-[#1A6B4A]" : "text-slate-400"}>
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User + logout */}
                <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1A6B4A] flex items-center justify-center shrink-0 text-white font-bold text-sm">
                        {initials}
                    </div>
                    <div className="flex flex-col leading-tight min-w-0 flex-1">
                        <span className="text-slate-800 font-semibold text-sm truncate">
                            {user?.email ?? "Usuario"}
                        </span>
                        <span className="text-slate-400 text-xs capitalize">
                            {rolLabel}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Cerrar sesión"
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                    >
                        <SignOut size={17} />
                    </button>
                </div>
            </aside>
        </>
    )
}