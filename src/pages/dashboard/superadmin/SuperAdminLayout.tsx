import { useState } from "react"
import { Outlet } from "react-router-dom"
import { SquaresFour, Users, BookOpen, GraduationCap, FileText } from "@phosphor-icons/react"
import { Header } from "@/components/Header"
import { Sidebar, type NavItem } from "@/components/ui/Sidebar"

const navItems: NavItem[] = [
    { label: "Inicio",          to: "/admin",              icon: <SquaresFour  size={18} weight="duotone" />, end: true },
    { label: "Usuarios",        to: "/admin/usuarios",     icon: <Users        size={18} weight="duotone" /> },
    { label: "Materias",        to: "/admin/materias",     icon: <BookOpen     size={18} weight="duotone" /> },
    { label: "Grados",          to: "/admin/grados",       icon: <GraduationCap size={18} weight="duotone" /> },
    { label: "Planificaciones", to: "/admin/planificaciones", icon: <FileText  size={18} weight="duotone" /> },
]

export const SuperAdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navItems={navItems}
                subtitle="Panel de administración"
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