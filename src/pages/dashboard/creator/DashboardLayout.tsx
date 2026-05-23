import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../../../components/Header"
import { Footer } from "../../../components/Footer"
import { Sidebar } from "../../../components/ui/Sidebar"

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex">
            {sidebarOpen && <Sidebar />}

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
