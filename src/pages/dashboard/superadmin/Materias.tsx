import { useState } from "react"
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react"
import { useMaterias, useCreateMateria, useUpdateMateria, useDeleteMateria } from "@/hooks/useMaterias"
import type { Materia } from "@/services/materias.service"
import { FormDialog } from "@/components/common/FormDialog"

export const Materias = () => {
    const { data: materias = [], isLoading, isError } = useMaterias()
    const { mutate: crearMateria, isPending: creando } = useCreateMateria()
    const { mutate: editarMateria, isPending: editando } = useUpdateMateria()
    const { mutate: eliminarMateria, isPending: eliminando, variables: eliminandoId } = useDeleteMateria()

    const [adding, setAdding] = useState(false)
    const [newLabel, setNewLabel] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [createError, setCreateError] = useState<string | null>(null)

    const [deleteError, setDeleteError] = useState<string | null>(null)

    const [editingMateria, setEditingMateria] = useState<Materia | null>(null)
    const [editName, setEditName] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editError, setEditError] = useState<string | null>(null)

    const startEdit = (m: Materia) => {
        setEditingMateria(m)
        setEditName(m.name)
        setEditDescription(m.description)
    }

    const closeEditModal = () => {
        setEditingMateria(null)
        setEditName("")
        setEditDescription("")
        setEditError(null)
    }

    const saveEdit = () => {
        if (!editingMateria || !editName.trim() || !editDescription.trim()) return
        setEditError(null)
        editarMateria(
            { id: editingMateria.id, name: editName, description: editDescription },
            {
                onSuccess: closeEditModal,
                onError: () => setEditError("No pudimos guardar los cambios. Probá de nuevo."),
            }
        )
    }

    const closeModal = () => {
        setAdding(false)
        setNewLabel("")
        setNewDescription("")
        setCreateError(null)
    }

    const saveNew = () => {
        if (!newLabel.trim() || !newDescription.trim()) return
        setCreateError(null)
        crearMateria(
            { name: newLabel, description: newDescription },
            {
                onSuccess: closeModal,
                onError: () => setCreateError("No pudimos crear la materia. Probá de nuevo."),
            }
        )
    }
    //controla q no se muestre el componente antes de tener los datos, o muestre un mensaje de error si falla la consulta
    if (isLoading) return <p className="p-6 text-slate-400 text-sm">Cargando materias...</p>
    if (isError) return <p className="p-6 text-red-400 text-sm">Error al cargar materias.</p>
    return (
        <>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A6B4A] dark:text-emerald-400">Materias</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Agregá, editá o eliminá materias.</p>
                    </div>
                    <button
                        onClick={() => setAdding(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                    >
                        <Plus size={16} weight="bold" />
                        Nueva materia
                    </button>
                </div>

                {deleteError && (
                    <div className="mx-6 mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {deleteError}
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-gray-700">
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Nombre</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Descripción</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-700">

                            {materias.map((m) => (
                                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{m.name}</span>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <span className="text-slate-500 dark:text-slate-400 truncate block" title={m.description}>
                                            {m.description || "—"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => startEdit(m)} className="p-1.5 rounded-md text-slate-400 hover:text-[#1A6B4A] hover:bg-[#D1F2EB] transition-colors">
                                                <PencilSimple size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`¿Eliminás la materia "${m.name}"? Esta acción no se puede deshacer.`)) {
                                                        setDeleteError(null)
                                                        eliminarMateria(m.id, {
                                                            onError: (error: any) => {
                                                                const msg = error?.response?.data?.message
                                                                setDeleteError(msg || 'No pudimos eliminar la materia. Probá de nuevo.')
                                                            }
                                                        })
                                                    }
                                                }}
                                                disabled={eliminando && eliminandoId === m.id}
                                                className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-700">
                    <p className="text-slate-400 text-sm">{materias.length} materias</p>
                </div>

            </section>
            {/* Modal para crear nueva materia */}
            <FormDialog
                open={adding}
                onOpenChange={(open) => { if (!open) closeModal() }}
                title="Nueva materia"
                description="Completá el nombre y una breve descripción."
                onSubmit={saveNew}
                submitLabel="Crear materia"
                isSubmitting={creando}
                submitDisabled={!newLabel.trim() || !newDescription.trim()}
                error={createError}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Nombre</label>
                    <input
                        autoFocus
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Ej: Educación Física"
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Descripción</label>
                    <textarea
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Una breve descripción de la materia"
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm resize-none dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>
            </FormDialog>

            {/* Modal para editar materia */}
            <FormDialog
                open={!!editingMateria}
                onOpenChange={(open) => { if (!open) closeEditModal() }}
                title="Editar materia"
                description="Modificá el nombre y la descripción."
                onSubmit={saveEdit}
                submitLabel="Guardar cambios"
                isSubmitting={editando}
                submitDisabled={!editName.trim() || !editDescription.trim()}
                error={editError}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Nombre</label>
                    <input
                        autoFocus
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Descripción</label>
                    <textarea
                        rows={3}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm resize-none dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>
            </FormDialog>
        </>
    )
}