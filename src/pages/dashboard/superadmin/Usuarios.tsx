import { useState } from "react"
import { MagnifyingGlass, PencilSimple, ProhibitInset } from "@phosphor-icons/react"

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockUsuarios = [
    { id: "1", name: "María",  lastname: "González", email: "maria@example.com",  roles: ["user"],        isActive: true  },
    { id: "2", name: "Lucas",  lastname: "Pérez",    email: "lucas@example.com",  roles: ["admin"],       isActive: true  },
    { id: "3", name: "Sofía",  lastname: "Ramírez",  email: "sofia@example.com",  roles: ["user"],        isActive: false },
    { id: "4", name: "Carlos", lastname: "Mendoza",  email: "carlos@example.com", roles: ["user"],        isActive: true  },
    { id: "5", name: "Pablo",  lastname: "Aldana",   email: "pablo@example.com",  roles: ["super-admin"], isActive: true  },
]

const rolBadge: Record<string, string> = {
    "super-admin": "bg-[#E8DAEF] text-[#5C3D7A]",
    "admin":       "bg-[#FADADD] text-[#8B3A52]",
    "user":        "bg-[#D7F0FA] text-[#1A5F7A]",
}

export const Usuarios = () => {
    const [search, setSearch] = useState("")

    const filtered = mockUsuarios.filter((u) =>
        `${u.name} ${u.lastname} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-[#8B3A52]">Usuarios</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Gestioná roles y estado de los usuarios.</p>
                </div>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-slate-100">
                <div className="relative max-w-sm">
                    <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100">
                            {["Usuario", "Email", "Roles", "Estado", "Acciones"].map((h) => (
                                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#8B3A52] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {u.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-slate-700">{u.name} {u.lastname}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{u.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {u.roles.map((r) => (
                                            <span key={r} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${rolBadge[r] ?? "bg-slate-100 text-slate-600"}`}>
                                                {r}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-[#D1F2EB] text-[#1A6B4A]" : "bg-slate-100 text-slate-400"}`}>
                                        {u.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <button title="Editar rol" className="p-1.5 rounded-md text-slate-400 hover:text-[#8B3A52] hover:bg-[#FADADD] transition-colors">
                                            <PencilSimple size={16} />
                                        </button>
                                        <button title={u.isActive ? "Desactivar" : "Activar"} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                            <ProhibitInset size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-slate-400 text-sm">{filtered.length} usuarios</p>
            </div>

        </section>
    )
}