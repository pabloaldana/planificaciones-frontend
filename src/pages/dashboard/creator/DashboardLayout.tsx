import { useState } from "react"
import { Outlet } from "react-router-dom"
import { SquaresFour, FileText, ChartBar, Gear } from "@phosphor-icons/react"
import { Header } from "../../../components/Header"
import { Sidebar, type NavItem } from "../../../components/ui/Sidebar"

const navItems: NavItem[] = [
    { label: "Dashboard",       to: "/dashboard",                 icon: <SquaresFour size={18} weight="duotone" />, end: true },
    { label: "Planificaciones", to: "/dashboard/planificaciones", icon: <FileText    size={18} weight="duotone" /> },
    { label: "Estadísticas",    to: "/dashboard/estadisticas",    icon: <ChartBar    size={18} weight="duotone" /> },
    { label: "Configuración",   to: "/dashboard/configuracion",   icon: <Gear        size={18} weight="duotone" /> },
]

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navItems={navItems}
                subtitle="Panel del creador"
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}