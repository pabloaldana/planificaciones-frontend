import { useState } from "react"
import { Outlet } from "react-router-dom"
import { ShoppingBag, User } from "@phosphor-icons/react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Sidebar, type NavItem } from "@/components/ui/Sidebar"

const navItems: NavItem[] = [
    { label: "Mis compras", to: "/mi-cuenta",        icon: <ShoppingBag size={18} weight="duotone" />, end: true },
    { label: "Mi perfil",   to: "/mi-cuenta/perfil", icon: <User        size={18} weight="duotone" /> },
]

export const UserLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navItems={navItems}
                subtitle="Mi cuenta"
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}