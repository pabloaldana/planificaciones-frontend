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
        <header className="h-15 bg-card border-b border-border flex items-center px-5 gap-4 shrink-0">
            {/* Toggle sidebar */}
            <button
                onClick={onToggleSidebar}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                aria-label="Toggle sidebar"
            >
                <TextColumns size={20} weight="regular" />
            </button>

            {/* Link al inicio */}
            <NavLink
                to="/"
                title="Ir al inicio"
                className="text-muted-foreground hover:text-primary hover:bg-muted transition-colors p-2 rounded-md"
            >
                <House size={20} weight="duotone" />
            </NavLink>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                >
                    {theme === 'dark' ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
                </button>
                <button
                    className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                    aria-label="Notificaciones"
                >
                    <Bell size={20} weight="regular" />
                </button>

                <div
                    title={user ? `${user.name} ${user.lastname}` : undefined}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm"
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    )
}
