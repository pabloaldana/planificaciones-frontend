import { NavLink } from "react-router-dom"
import {
    BookBookmark,
    SquaresFour,
    FileText,
    ChartBar,
    Gear,
    X,
} from "@phosphor-icons/react"

const navItems = [
    { label: "Dashboard",       to: "/dashboard",                 icon: <SquaresFour size={18} weight="duotone" />, end: true },
    { label: "Planificaciones", to: "/dashboard/planificaciones", icon: <FileText    size={18} weight="duotone" /> },
    { label: "Estadísticas",    to: "/dashboard/estadisticas",    icon: <ChartBar    size={18} weight="duotone" /> },
    { label: "Configuración",   to: "/dashboard/configuracion",   icon: <Gear        size={18} weight="duotone" /> },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    // Solo cierra en mobile al navegar
    const handleNavClick = () => {
        if (window.innerWidth < 768) onClose()
    }

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
                    <div className="w-10 h-10 rounded-full bg-[#8B3A52] flex items-center justify-center shrink-0">
                        <BookBookmark size={20} weight="fill" color="white" />
                    </div>
                    <div className="flex flex-col leading-tight flex-1">
                        <span className="text-[#8B3A52] font-bold text-base leading-none">Aula</span>
                        <span className="text-slate-400 text-xs mt-0.5">Panel del creador</span>
                    </div>
                    {/* Botón cerrar — solo mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Cerrar menú"
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
                                                ? "bg-[#FADADD] text-[#8B3A52]"
                                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                                        ].join(" ")
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className={isActive ? "text-[#8B3A52]" : "text-slate-400"}>
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

                {/* User */}
                <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">
                        P
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-slate-800 font-semibold text-sm">Pablo Ruiz</span>
                        <span className="text-slate-400 text-xs">Creador</span>
                    </div>
                </div>
            </aside>
        </>
    )
}