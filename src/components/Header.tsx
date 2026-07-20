import { Bell, TextColumns, House, Sun, Moon } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"

interface Props {
    onToggleSidebar?: () => void
}

export const Header = ({ onToggleSidebar }: Props) => {
    const { user } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="h-15 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 flex items-center px-5 gap-4 shrink-0">
            {/* Toggle sidebar */}
            <button
                onClick={onToggleSidebar}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700"
                aria-label="Toggle sidebar"
            >
                <TextColumns size={20} weight="regular" />
            </button>

            {/* Link al inicio */}
            <NavLink
                to="/"
                title="Ir al inicio"
                className="text-slate-400 dark:text-slate-500 hover:text-[#1A6B4A] dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors p-2 rounded-md"
            >
                <House size={20} weight="duotone" />
            </NavLink>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                    className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    {theme === 'dark' ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
                </button>
                <button
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700"
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
