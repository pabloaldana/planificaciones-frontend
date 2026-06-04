import { useState } from "react"
import { PencilSimple, Trash, Plus, X, Check } from "@phosphor-icons/react"

type Grado = { id: number; label: string }

const initialGrados: Grado[] = [
    { id: 1, label: "1°" },
    { id: 2, label: "2°" },
    { id: 3, label: "3°" },
    { id: 4, label: "4°" },
    { id: 5, label: "5°" },
    { id: 6, label: "6°" },
    { id: 7, label: "7°" },
]

export const Grados = () => {
    const [grados, setGrados]       = useState<Grado[]>(initialGrados)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editValue, setEditValue] = useState("")
    const [adding, setAdding]       = useState(false)
    const [newLabel, setNewLabel]   = useState("")

    const startEdit  = (g: Grado)   => { setEditingId(g.id); setEditValue(g.label) }
    const cancelEdit = ()            => { setEditingId(null); setEditValue("") }

    const saveEdit = (id: number) => {
        if (!editValue.trim()) return
        setGrados((prev) => prev.map((g) => g.id === id ? { ...g, label: editValue.trim() } : g))
        cancelEdit()
    }

    const deleteGrado = (id: number) => setGrados((prev) => prev.filter((g) => g.id !== id))

    const saveNew = () => {
        if (!newLabel.trim()) return
        const id = Math.max(...grados.map((g) => g.id)) + 1
        setGrados((prev) => [...prev, { id, label: newLabel.trim() }])
        setNewLabel("")
        setAdding(false)
    }

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-[#8B3A52]">Grados</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Agregá, editá o eliminá grados.</p>
                </div>
                <button
                    onClick={() => setAdding(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B3A52] text-white text-sm font-semibold hover:bg-[#6E2D40] transition-colors"
                >
                    <Plus size={16} weight="bold" />
                    Nuevo grado
                </button>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-50">

                {adding && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-slate-50/60">
                        <input
                            autoFocus
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") saveNew(); if (e.key === "Escape") setAdding(false) }}
                            placeholder="Ej: 8°"
                            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#8B3A52] w-32"
                        />
                        <button onClick={saveNew} className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors">
                            <Check size={16} weight="bold" />
                        </button>
                        <button onClick={() => setAdding(false)} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {grados.map((g) => (
                    <div key={g.id} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50/50 transition-colors">
                        {editingId === g.id ? (
                            <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") saveEdit(g.id); if (e.key === "Escape") cancelEdit() }}
                                className="border border-slate-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-[#8B3A52] w-32"
                            />
                        ) : (
                            <span className="font-medium text-slate-700">{g.label} grado</span>
                        )}

                        <div className="flex items-center gap-1">
                            {editingId === g.id ? (
                                <>
                                    <button onClick={() => saveEdit(g.id)} className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-50 transition-colors">
                                        <Check size={16} weight="bold" />
                                    </button>
                                    <button onClick={cancelEdit} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors">
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => startEdit(g)} className="p-1.5 rounded-md text-slate-400 hover:text-[#8B3A52] hover:bg-[#FADADD] transition-colors">
                                        <PencilSimple size={16} />
                                    </button>
                                    <button onClick={() => deleteGrado(g.id)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Trash size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-slate-400 text-sm">{grados.length} grados</p>
            </div>

        </section>
    )
}