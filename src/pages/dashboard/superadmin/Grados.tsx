import { useState } from "react"
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react"
import { useGrados, useCreateGrado, useUpdateGrado, useDeleteGrado } from "@/hooks/useGrados"
import type { Grado } from "@/services/grados.service"
import { FormDialog } from "@/components/common/FormDialog"

export const Grados = () => {
    const { data: grados = [], isLoading, isError } = useGrados()
    const { mutate: crearGrado, isPending: creando } = useCreateGrado()
    const { mutate: actualizarGrado, isPending: actualizando } = useUpdateGrado()
    const { mutate: eliminarGrado, isPending: eliminando, variables: eliminandoId } = useDeleteGrado()

    const [adding, setAdding] = useState(false)
    const [newName, setNewName] = useState("")
    const [newNumero, setNewNumero] = useState("")
    const [createError, setCreateError] = useState<string | null>(null)

    const [deleteError, setDeleteError] = useState<string | null>(null)

    const [editingGrado, setEditingGrado] = useState<Grado | null>(null)
    const [editName, setEditName] = useState("")
    const [editNumero, setEditNumero] = useState("")
    const [editError, setEditError] = useState<string | null>(null)

    const startEdit = (g: Grado) => {
        setEditingGrado(g)
        setEditName(g.name)
        setEditNumero(String(g.numero))
    }

    const closeEditModal = () => {
        setEditingGrado(null)
        setEditName("")
        setEditNumero("")
        setEditError(null)
    }

    const saveEdit = () => {
        if (!editingGrado || !editName.trim() || !editNumero.trim()) return
        setEditError(null)
        actualizarGrado(
            { id: editingGrado.id, grado: { name: editName, numero: Number(editNumero) } },
            {
                onSuccess: closeEditModal,
                onError: () => setEditError("No pudimos actualizar el grado. Probá de nuevo."),
            }
        )
    }

    const closeModal = () => {
        setAdding(false)
        setNewName("")
        setNewNumero("")
        setCreateError(null)
    }

    const saveNew = () => {
        if (!newName.trim() || !newNumero.trim()) return
        setCreateError(null)
        crearGrado(
            { name: newName, numero: Number(newNumero) },
            {
                onSuccess: closeModal,
                onError: () => setCreateError("No pudimos crear el grado. Probá de nuevo."),
            }
        )
    }

    if (isLoading) return <p className="p-6 text-slate-400 text-sm">Cargando grados...</p>
    if (isError) return <p className="p-6 text-red-400 text-sm">Error al cargar grados.</p>

    return (
        <>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-gray-700">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A6B4A] dark:text-emerald-400">Grados</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Agregá, editá o eliminá grados.</p>
                    </div>
                    <button
                        onClick={() => setAdding(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                    >
                        <Plus size={16} weight="bold" />
                        Nuevo grado
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
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Número</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                            {grados.map((g) => (
                                <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{g.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{g.numero}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => startEdit(g)} className="p-1.5 rounded-md text-slate-400 hover:text-[#1A6B4A] hover:bg-[#D1F2EB] transition-colors">
                                                <PencilSimple size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`¿Eliminás el grado "${g.name}"? Esta acción no se puede deshacer.`)) {
                                                        setDeleteError(null)
                                                        eliminarGrado(g.id, {
                                                            onError: (error: any) => {
                                                                const msg = error?.response?.data?.message
                                                                setDeleteError(msg || 'No pudimos eliminar el grado. Probá de nuevo.')
                                                            }
                                                        })
                                                    }
                                                }}
                                                disabled={eliminando && eliminandoId === g.id}
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
                    <p className="text-slate-400 text-sm">{grados.length} grados</p>
                </div>

            </section>

            {/* Modal para crear nuevo grado */}
            <FormDialog
                open={adding}
                onOpenChange={(open) => { if (!open) closeModal() }}
                title="Nuevo grado"
                description="Completá el nombre y el número del grado (1 a 7)."
                onSubmit={saveNew}
                submitLabel="Crear grado"
                isSubmitting={creando}
                submitDisabled={!newName.trim() || !newNumero.trim()}
                error={createError}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Nombre</label>
                    <input
                        autoFocus
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Ej: primero"
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Número (1 a 7)</label>
                    <input
                        type="number"
                        min={1}
                        max={7}
                        value={newNumero}
                        onChange={(e) => setNewNumero(e.target.value)}
                        placeholder="Ej: 1"
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>
            </FormDialog>

            {/* Modal para editar grado */}
            <FormDialog
                open={!!editingGrado}
                onOpenChange={(open) => { if (!open) closeEditModal() }}
                title="Editar grado"
                description="Modificá el nombre y el número del grado."
                onSubmit={saveEdit}
                submitLabel="Guardar cambios"
                isSubmitting={actualizando}
                submitDisabled={!editName.trim() || !editNumero.trim()}
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
                    <label className="text-xs font-semibold text-slate-500">Número (1 a 7)</label>
                    <input
                        type="number"
                        min={1}
                        max={7}
                        value={editNumero}
                        onChange={(e) => setEditNumero(e.target.value)}
                        className="w-full border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#1A6B4A] dark:focus:border-emerald-400"
                    />
                </div>
            </FormDialog>
        </>
    )
}
