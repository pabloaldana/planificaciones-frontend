import { useState } from "react"
import { MagnifyingGlass, Eye, Trash } from "@phosphor-icons/react"
import { getSubjectConfig } from "@/constants/subjects"
import { usePlanificacionesAdmin } from "@/hooks/usePlanificaciones"

export const PlanificacionesAdmin = () => {
    const [search, setSearch] = useState("")
    const { data: response, isLoading } = usePlanificacionesAdmin()
    const planificaciones = response?.data ?? []

    const filtered = planificaciones.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#1A6B4A]">Planificaciones</h2>
                <p className="text-slate-500 text-sm mt-0.5">Moderá y eliminá contenido de la plataforma.</p>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-slate-100">
                <div className="relative max-w-sm">
                    <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
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
                            {["Título", "Materia", "Grado", "Precio", "Acciones"].map((h) => (
                                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {[...Array(5)].map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-slate-100 rounded w-24" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            filtered.map((p) => {
                                const subjectCfg = getSubjectConfig(p.materia.name)
                                return (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-700">{p.title}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${subjectCfg.badge}`}>
                                                {subjectCfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{p.grado.name}</td>
                                        <td className="px-6 py-4 font-semibold text-[#1A6B4A]">
                                            ${p.price.toLocaleString("es-AR")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <button title="Ver" className="p-1.5 rounded-md text-slate-400 hover:text-[#1A5F7A] hover:bg-[#D7F0FA] transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button title="Eliminar" className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-slate-400 text-sm">{filtered.length} planificaciones</p>
            </div>

        </section>
    )
}