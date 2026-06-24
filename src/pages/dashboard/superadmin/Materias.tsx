import { useState } from "react"
import { PencilSimple, Trash, Plus, X, Check } from "@phosphor-icons/react"
import { useMaterias } from "@/hooks/useMaterias"
import type { Materia } from "@/services/materias.service"

export const Materias = () => {
    const { data: materias = [], isLoading, isError } = useMaterias()

    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState("")
    const [adding, setAdding] = useState(false)
    const [newLabel, setNewLabel] = useState("")

    const startEdit  = (m: Materia) => { setEditingId(m.id); setEditValue(m.name) }
    const cancelEdit = () => { setEditingId(null); setEditValue("") }

    // TODO: conectar con PUT /materias/:id
    const saveEdit = (id: string) => {
        if (!editValue.trim()) return
        console.log("editar", id, editValue)
        cancelEdit()
    }

    // TODO: conectar con DELETE /materias/:id
    const deleteMateria = (id: string) => {
        console.log("eliminar", id)
    }

    // TODO: conectar con POST /materias
    const saveNew = () => {
        if (!newLabel.trim()) return
        console.log("crear", newLabel)
        setNewLabel("")
        setAdding(false)
    }
    //controla q no se muestre el componente antes de tener los datos, o muestre un mensaje de error si falla la consulta
    if (isLoading) return <p className="p-6 text-slate-400 text-sm">Cargando materias...</p>
    if (isError) return <p className="p-6 text-red-400 text-sm">Error al cargar materias.</p>
    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-[#1A6B4A]">Materias</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Agregá, editá o eliminá materias.</p>
                </div>
                <button
                    onClick={() => setAdding(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                >
                    <Plus size={16} weight="bold" />
                    Nueva materia
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Nombre</th>
                            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Badge</th>
                            <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">

                        {/* Fila nueva materia */}
                        {adding && (
                            <tr className="bg-slate-50/60">
                                <td className="px-6 py-3" colSpan={2}>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newLabel}
                                        onChange={(e) => setNewLabel(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") saveNew(); if (e.key === "Escape") setAdding(false) }}
                                        placeholder="Nombre de la materia"
                                        className="w-full max-w-xs border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#1A6B4A]"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-1">
                                        <button onClick={saveNew} className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors">
                                            <Check size={16} weight="bold" />
                                        </button>
                                        <button onClick={() => setAdding(false)} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {materias.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    {editingId === m.id ? (
                                        <input
                                            autoFocus
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(m.id); if (e.key === "Escape") cancelEdit() }}
                                            className="border border-slate-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-[#1A6B4A]"
                                        />
                                    ) : (
                                        <span className="font-medium text-slate-700">{m.name}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D1F2EB] text-[#1A6B4A]">
                                        {m.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        {editingId === m.id ? (
                                            <>
                                                <button onClick={() => saveEdit(m.id)} className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors">
                                                    <Check size={16} weight="bold" />
                                                </button>
                                                <button onClick={cancelEdit} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors">
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(m)} className="p-1.5 rounded-md text-slate-400 hover:text-[#1A6B4A] hover:bg-[#D1F2EB] transition-colors">
                                                    <PencilSimple size={16} />
                                                </button>
                                                <button onClick={() => deleteMateria(m.id)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                                    <Trash size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-slate-400 text-sm">{materias.length} materias</p>
            </div>

        </section>
    )
}