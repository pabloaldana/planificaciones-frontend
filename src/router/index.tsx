import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardLayout } from "../pages/dashboard/creator/DashboardLayout"
import { DashboardHome } from "../pages/dashboard/creator/DashboardHome"
import { Planifiaciones } from "../pages/dashboard/creator/Planifiaciones"
import { Estadisticas } from "../pages/dashboard/creator/Estadisticas"
import { LandingPage } from "../pages/landing/LandingPage"
import { Configuracion } from "@/pages/dashboard/creator/Configuracion"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* ── Rutas públicas ─────────────────────────────── */}
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<LandingPage />} />

                {/* ── Dashboard creador (/dashboard) ─────────────── */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="planificaciones" element={<Planifiaciones />} />
                    <Route path="estadisticas" element={<Estadisticas />} />
                    <Route path="configuracion" element={<Configuracion />} />
                </Route>

                {/* ── Dashboard usuario (/usuario) ────────────────── */}

                {/* ── Dashboard admin (/admin) ────────────────────── */}

            </Routes>
        </BrowserRouter >
    )
}
