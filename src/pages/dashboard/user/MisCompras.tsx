import { DownloadSimple, Eye } from "@phosphor-icons/react"
import { getSubjectConfig } from "@/constants/subjects"
import { useCompras } from "@/hooks"

export const MisCompras = () => {
    const { data: compras = [], isLoading } = useCompras()

    if (isLoading) {
        return (
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-slate-100 rounded w-24" />
                            <div className="h-4 bg-slate-100 rounded w-48" />
                        </div>
                        <div className="h-4 bg-slate-100 rounded w-16" />
                    </div>
                ))}
            </section>
        )
    }

    if (compras.length === 0) {
        return (
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <p className="text-slate-400 text-sm">Todavía no compraste ninguna planificación.</p>
            </section>
        )
    }

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#8B3A52]">Mis compras</h2>
                <p className="text-slate-500 text-sm mt-0.5">
                    {compras.length} {compras.length === 1 ? "planificación comprada" : "planificaciones compradas"}
                </p>
            </div>

            {/* Lista */}
            <div className="divide-y divide-slate-100">
                {compras.map((compra) => {
                    const { planificacion } = compra
                    const subject = getSubjectConfig(planificacion.materia.name)
                    return (
                        <div key={compra.id} className="flex items-center gap-4 px-6 py-4">

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${subject.badge}`}>
                                        {subject.label}
                                    </span>
                                    <span className="text-xs text-slate-400">{planificacion.grado.name}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-700 truncate">{planificacion.title}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Comprada el {new Date(compra.createdAt).toLocaleDateString("es-AR")}
                                </p>
                            </div>

                            {/* Precio */}
                            <span className="text-sm font-bold text-[#8B3A52] shrink-0">
                                ${Number(compra.priceAtPurchase).toLocaleString("es-AR")}
                            </span>

                            {/* Acciones */}
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={planificacion.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ver"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
                                >
                                    <Eye size={14} />
                                    Ver
                                </a>
                                <a
                                    href={planificacion.url}
                                    download
                                    title="Descargar"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B3A52] text-white text-xs font-medium hover:bg-[#6E2D40] transition-colors"
                                >
                                    <DownloadSimple size={14} />
                                    Descargar
                                </a>
                            </div>

                        </div>
                    )
                })}
            </div>

        </section>
    )
}
