import { useState } from "react"
import {
    GraduationCap,
    SquaresFour,
    FileText,
    ChartBar,
    Gear,
} from "@phosphor-icons/react"

type NavItem = {
    key: string
    label: string
    icon: React.ReactNode
}

const navItems: NavItem[] = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <SquaresFour size={18} weight="duotone" />,
    },
    {
        key: "planificaciones",
        label: "Planificaciones",
        icon: <FileText size={18} weight="duotone" />,
    },
    {
        key: "estadisticas",
        label: "Estadísticas",
        icon: <ChartBar size={18} weight="duotone" />,
    },
    {
        key: "configuracion",
        label: "Configuración",
        icon: <Gear size={18} weight="duotone" />,
    },
]

interface Props {
    activeItem?: string
    onItemClick?: (key: string) => void
}

export const Sidebar = ({ activeItem = "dashboard", onItemClick }: Props) => {
    const [active, setActive] = useState(activeItem)

    const handleClick = (key: string) => {
        setActive(key)
        onItemClick?.(key)
    }

    return (
        <aside className="w-62.5 min-h-screen bg-white border-r border-slate-200 flex flex-col shrink-0">
            {/* Top: brand */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center shrink-0">
                    <GraduationCap size={20} weight="fill" color="white" />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-[#1e3a5f] font-bold text-base leading-none">
                        Aula
                    </span>
                    <span className="text-slate-400 text-xs mt-0.5">Panel del creador</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4">
                <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider px-2 mb-2">
                    Navegación
                </p>
                <ul className="space-y-0.5">
                    {navItems.map((item) => {
                        const isActive = active === item.key
                        return (
                            <li key={item.key}>
                                <button
                                    onClick={() => handleClick(item.key)}
                                    className={[
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[#e8f0fe] text-[#1e3a5f]"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                                    ].join(" ")}
                                >
                                    <span
                                        className={
                                            isActive ? "text-[#1e3a5f]" : "text-slate-400"
                                        }
                                    >
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Bottom: user */}
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
    )
}
