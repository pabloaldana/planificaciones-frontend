import { MagnifyingGlass, Bell, TextColumns, House } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

interface Props {
    onToggleSidebar?: () => void
}

export const Header = ({ onToggleSidebar }: Props) => {
    const { user } = useAuth()

    return (
        <header className="h-15 bg-white border-b border-slate-200 flex items-center px-5 gap-4 shrink-0">
            {/* Toggle sidebar */}
            <button
                onClick={onToggleSidebar}
                className="text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-md hover:bg-slate-100"
                aria-label="Toggle sidebar"
            >
                <TextColumns size={20} weight="regular" />
            </button>

            {/* Link al inicio */}
            <NavLink
                to="/"
                title="Ir al inicio"
                className="text-slate-400 hover:text-[#1A6B4A] hover:bg-slate-100 transition-colors p-2 rounded-md"
            >
                <House size={20} weight="duotone" />
            </NavLink>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
                <button
                    className="text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-md hover:bg-slate-100"
                    aria-label="Notificaciones"
                >
                    <Bell size={20} weight="regular" />
                </button>

                <div
                    title={user ? `${user.name} ${user.lastname}` : undefined}
                    className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white font-semibold text-sm"
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    )
}
