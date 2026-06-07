import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ProtectedRoute } from "@/router/ProtectedRoute"

import { LandingPage } from "../pages/landing/LandingPage"
import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { CatalogPage } from "@/pages/catalog/CatalogPage"
import { PlanDetailPage } from "@/pages/catalog/PlanDetailPage"

import { DashboardLayout } from "../pages/dashboard/creator/DashboardLayout"
import { DashboardHome } from "../pages/dashboard/creator/DashboardHome"
import { Planificaciones } from "../pages/dashboard/creator/Planifiaciones"
import { Estadisticas } from "../pages/dashboard/creator/Estadisticas"
import { Configuracion } from "@/pages/dashboard/creator/Configuracion"
import { UserLayout } from "@/pages/dashboard/user/UserLayout"
import { MisCompras } from "@/pages/dashboard/user/MisCompras"
import { MiPerfil } from "@/pages/dashboard/user/MiPerfil"
import { SuperAdminLayout } from "@/pages/dashboard/superadmin/SuperAdminLayout"
import { SuperAdminHome } from "@/pages/dashboard/superadmin/SuperAdminHome"
import { Usuarios } from "@/pages/dashboard/superadmin/Usuarios"
import { Materias } from "@/pages/dashboard/superadmin/Materias"
import { Grados } from "@/pages/dashboard/superadmin/Grados"
import { PlanificacionesAdmin } from "@/pages/dashboard/superadmin/PlanificacionesAdmin"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* ── Rutas públicas ─────────────────────────────── */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="*" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registro" element={<RegisterPage />} />
                    <Route path="/catalogo" element={<CatalogPage />} />
                    <Route path="/catalogo/:id" element={<PlanDetailPage />} />

                    {/* ── Dashboard admin ──────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<DashboardHome />} />
                            <Route path="planificaciones" element={<Planificaciones />} />
                            <Route path="estadisticas" element={<Estadisticas />} />
                            <Route path="configuracion" element={<Configuracion />} />
                        </Route>
                    </Route>

                    {/* ── Dashboard super-admin ─────────────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={["super-admin"]} />}>
                        <Route path="/admin" element={<SuperAdminLayout />}>
                            <Route index element={<SuperAdminHome />} />
                            <Route path="usuarios" element={<Usuarios />} />
                            <Route path="materias" element={<Materias />} />
                            <Route path="grados" element={<Grados />} />
                            <Route path="planificaciones" element={<PlanificacionesAdmin />} />
                        </Route>
                    </Route>

                    {/* ── Dashboard usuario ──────────────────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                        <Route path="/mi-cuenta" element={<UserLayout />}>
                            <Route index element={<MisCompras />} />
                            <Route path="perfil" element={<MiPerfil />} />
                        </Route>
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}