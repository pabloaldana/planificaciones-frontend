import { Users, BookOpen, TrendUp, UserCheck } from "@phosphor-icons/react"

const statCards = [
    { label: "Usuarios totales",    value: "412",      icon: <Users      size={20} weight="bold" className="text-[#1A5F7A]" />, iconBg: "bg-[#D7F0FA]", badge: "+18 este mes"  },
    { label: "Planificaciones",     value: "127",      icon: <BookOpen   size={20} weight="bold" className="text-[#1A6B4A]" />, iconBg: "bg-[#D1F2EB]", badge: "+8 nuevas"     },
    { label: "Ventas totales",      value: "$284.500", icon: <TrendUp    size={20} weight="bold" className="text-[#1A6B4A]" />, iconBg: "bg-[#D1F2EB]", badge: "+12,4%"        },
    { label: "Usuarios activos",    value: "389",      icon: <UserCheck  size={20} weight="bold" className="text-[#5C3D7A]" />, iconBg: "bg-[#E8DAEF]", badge: "94% del total" },
]

const recentUsers = [
    { name: "María González",  email: "maria@example.com",  rol: "user",        isActive: true  },
    { name: "Lucas Pérez",     email: "lucas@example.com",  rol: "admin",       isActive: true  },
    { name: "Sofía Ramírez",   email: "sofia@example.com",  rol: "user",        isActive: false },
    { name: "Carlos Mendoza",  email: "carlos@example.com", rol: "user",        isActive: true  },
]

const rolBadge: Record<string, string> = {
    "super-admin": "bg-[#E8DAEF] text-[#5C3D7A]",
    "admin":       "bg-[#D1F2EB] text-[#1A6B4A]",
    "user":        "bg-[#D7F0FA] text-[#1A5F7A]",
}

export const SuperAdminHome = () => (
    <>
        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card) => (
                <div key={card.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                        <p className="text-slate-500 text-sm">{card.label}</p>
                        <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-[2rem] font-bold text-[#1A6B4A] leading-none">{card.value}</p>
                    <span className="self-start bg-[#D1F2EB] text-[#1A6B4A] text-xs font-medium px-2.5 py-1 rounded-full">
                        {card.badge}
                    </span>
                </div>
            ))}
        </section>

        {/* Usuarios recientes */}
        <section className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-[#1A6B4A] mb-4">Usuarios recientes</h2>
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
                        {recentUsers.map((u) => (
                            <tr key={u.email}>
                                <td className="py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A6B4A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {u.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-700">{u.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 text-slate-500">{u.email}</td>
                                <td className="py-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${rolBadge[u.rol] ?? "bg-slate-100 text-slate-600"}`}>
                                        {u.rol}
                                    </span>
                                </td>
                                <td className="py-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-[#D1F2EB] text-[#1A6B4A]" : "bg-slate-100 text-slate-400"}`}>
                                        {u.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </>
)