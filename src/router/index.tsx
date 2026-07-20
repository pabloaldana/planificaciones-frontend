import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { ProtectedRoute } from "@/router/ProtectedRoute"

import { LandingPage } from "../pages/landing/LandingPage"
import { ContactPage } from "@/pages/contact/ContactPage"
import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { CatalogPage } from "@/pages/catalog/CatalogPage"
import { PlanDetailPage } from "@/pages/catalog/PlanDetailPage"
import { Checkout } from "@/pages/checkout/Checkout"
import { PaymentSuccess } from "@/pages/checkout/PaymentSuccess"
import { PaymentFailure } from "@/pages/checkout/PaymentFailure"

import { DashboardLayout } from "../pages/dashboard/creator/DashboardLayout"
import { DashboardHome } from "../pages/dashboard/creator/DashboardHome"
import { Planificaciones } from "../pages/dashboard/creator/Planifiaciones"
import { CrearPlanificacion } from "../pages/dashboard/creator/CrearPlanificacion"
import { EditarPlanificacion } from "../pages/dashboard/creator/EditarPlanificacion"
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
import { MisFavoritos } from "@/pages/dashboard/user/MisFavoritos"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Routes>

                        {/* ── Rutas públicas ─────────────────────────────── */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="*" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registro" element={<RegisterPage />} />
                        <Route path="/catalogo" element={<CatalogPage />} />
                        <Route path="/catalogo/:id" element={<PlanDetailPage />} />
                        <Route path="/contacto" element={<ContactPage />} />

                        {/* ── Checkout — requiere estar logueado, cualquier rol ── */}
                        <Route element={<ProtectedRoute allowedRoles={["user", "admin", "super-admin"]} />}>
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/checkout/success" element={<PaymentSuccess />} />
                            <Route path="/checkout/failure" element={<PaymentFailure />} />
                        </Route>

                        {/* ── Dashboard admin - creador ──────────────── */}
                        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                            <Route path="/dashboard" element={<DashboardLayout />}>
                                <Route index element={<DashboardHome />} />
                                <Route path="planificaciones" element={<Planificaciones />} />
                                <Route path="planificaciones/crear" element={<CrearPlanificacion />} />
                                <Route path="planificaciones/:id/editar" element={<EditarPlanificacion />} />
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
                                <Route path="favoritos" element={<MisFavoritos />} />
                            </Route>
                        </Route>

                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}