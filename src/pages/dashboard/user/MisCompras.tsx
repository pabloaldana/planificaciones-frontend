import { Star, DownloadSimple, Eye } from "@phosphor-icons/react"
import { subjectConfig } from "@/constants/subjects"

// ── Mock data (reemplazar con useQuery cuando esté el backend) ────────────────
const compras = [
    { id: 1,  title: "Números Naturales",   subject: "Matematica", grade: "3°", price: 1000, rating: 4.9, purchasedAt: "12/04/2026" },
    { id: 4,  title: "Comprensión Lectora", subject: "Lengua",     grade: "5°", price: 1200, rating: 4.8, purchasedAt: "18/04/2026" },
    { id: 7,  title: "Sistema Solar",       subject: "Naturales",  grade: "4°", price: 900,  rating: 4.7, purchasedAt: "25/04/2026" },
]

export const MisCompras = () => {
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
                {compras.map((item) => {
                    const subject = subjectConfig[item.subject]
                    return (
                        <div key={item.id} className="flex items-center gap-4 px-6 py-4">

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${subject.badge}`}>
                                        {subject.label}
                                    </span>
                                    <span className="text-xs text-slate-400">{item.grade} grado</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-700 truncate">{item.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star size={11} weight="fill" />
                                        <span className="text-xs text-slate-500 font-medium">{item.rating}</span>
                                    </div>
                                    <span className="text-slate-300 text-xs">·</span>
                                    <span className="text-xs text-slate-400">Comprada el {item.purchasedAt}</span>
                                </div>
                            </div>

                            {/* Precio */}
                            <span className="text-sm font-bold text-[#8B3A52] shrink-0">
                                ${item.price.toLocaleString("es-AR")}
                            </span>

                            {/* Acciones */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    title="Ver"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors"
                                >
                                    <Eye size={14} />
                                    Ver
                                </button>
                                <button
                                    title="Descargar"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B3A52] text-white text-xs font-medium hover:bg-[#6E2D40] transition-colors"
                                >
                                    <DownloadSimple size={14} />
                                    Descargar
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>

        </section>
    )
}