import { Users, BookOpen, TrendUp } from "@phosphor-icons/react"
import { useAdminSummary } from "@/hooks/index"

const rolBadge: Record<string, string> = {
    "super-admin": "bg-[#E8DAEF] text-[#5C3D7A]",
    "admin": "bg-[#D1F2EB] text-[#1A6B4A]",
    "user": "bg-[#D7F0FA] text-[#1A5F7A]",
}

export const SuperAdminHome = () => {
    const { data, isLoading } = useAdminSummary()

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Cargando panel...
            </div>
        )
    }

    const { totalUsers, totalPlanificaciones, monthlyRevenue, recentUsers } = data

    const statCards = [
        {
            label: "Usuarios totales",
            value: String(totalUsers),
            icon: <Users size={20} weight="bold" className="text-[#1A5F7A]" />,
            iconBg: "bg-[#D7F0FA]",
        },
        {
            label: "Planificaciones",
            value: String(totalPlanificaciones),
            icon: <BookOpen size={20} weight="bold" className="text-[#1A6B4A]" />,
            iconBg: "bg-[#D1F2EB]",
        },
        {
            label: "Ingresos del mes",
            value: `$${monthlyRevenue.toLocaleString("es-AR")}`,
            icon: <TrendUp size={20} weight="bold" className="text-[#1A6B4A]" />,
            iconBg: "bg-[#D1F2EB]",
        },
    ]

    return (
        <>
            {/* Stat cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                            <p className="text-slate-500 text-sm">{card.label}</p>
                            <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-[2rem] font-bold text-[#1A6B4A] leading-none truncate">{card.value}</p>
                    </div>
                ))}
            </section>

            {/* Usuarios recientes */}
            <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-[#1A6B4A] mb-4">Usuarios recientes</h2>
                {recentUsers.length === 0 ? (
                    <p className="text-slate-400 text-sm">Todavía no hay usuarios registrados.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Usuario</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Email</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Rol</th>
                                    <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-3">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentUsers.map((u) => {
                                    const rol = u.roles?.[0] ?? ""
                                    return (
                                        <tr key={u.id}>
                                            <td className="py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#1A6B4A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-slate-700">{u.name} {u.lastname}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-slate-500">{u.email}</td>
                                            <td className="py-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${rolBadge[rol] ?? "bg-slate-100 text-slate-600"}`}>
                                                    {rol}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-[#D1F2EB] text-[#1A6B4A]" : "bg-slate-100 text-slate-400"}`}>
                                                    {u.isActive ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    )
}
