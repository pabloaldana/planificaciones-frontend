import { useState } from "react"
import { MagnifyingGlass, PencilSimple, ProhibitInset } from "@phosphor-icons/react"
import { useUsers, useUpdateUserStatus, useUpdateUserRoles } from "@/hooks/useUsers"
import { usePagination } from "@/hooks/usePagination"
import { FormDialog } from "@/components/common/FormDialog"

const ROLES = ["user", "admin", "super-admin"] as const
type Role = typeof ROLES[number]

const rolBadge: Record<string, string> = {
    "super-admin": "bg-[#E8DAEF] text-[#5C3D7A]",
    "admin": "bg-primary/10 text-primary",
    "user": "bg-[#D7F0FA] text-[#1A5F7A]",
}

export const Usuarios = () => {
    const [search, setSearch] = useState("")
    const { data: usuarios = [], isLoading } = useUsers()
    const { mutate: cambiarStatus, isPending: cambiandoStatus } = useUpdateUserStatus()
    const { mutate: cambiarRoles, isPending: cambiandoRoles } = useUpdateUserRoles()

    const [editingUser, setEditingUser] = useState<{ id: string; roles: string[] } | null>(null)
    const [selectedRole, setSelectedRole] = useState<Role>("user")
    const [roleError, setRoleError] = useState<string | null>(null)

    const filtered = usuarios.filter((u) =>
        `${u.name} ${u.lastname} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    )

    const { rows, page, setPage, totalPages } = usePagination(filtered)

    const openRoleModal = (id: string, roles: string[]) => {
        setEditingUser({ id, roles })
        setSelectedRole((roles[0] as Role) ?? "user")
        setRoleError(null)
    }

    const closeRoleModal = () => {
        setEditingUser(null)
        setRoleError(null)
    }

    const saveRole = () => {
        if (!editingUser) return
        setRoleError(null)
        cambiarRoles(
            { id: editingUser.id, roles: [selectedRole] },
            {
                onSuccess: closeRoleModal,
                onError: () => setRoleError("No pudimos actualizar el rol. Probá de nuevo."),
            }
        )
    }

    return (
        <>
            <section className="bg-card rounded-xl shadow-sm border border-border">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-border">
                    <div>
                        <h2 className="text-xl font-bold text-primary">Usuarios</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Gestioná roles y estado de los usuarios.</p>
                    </div>
                </div>

                {/* Search */}
                <div className="px-6 py-4 border-b border-border">
                    <div className="relative max-w-sm">
                        <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-border bg-muted rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                {["Usuario", "Email", "Roles", "Estado", "Acciones"].map((h) => (
                                    <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            )}
                            {!isLoading && rows.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            )}
                            {rows.map((u) => (
                                <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                                                {u.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-foreground">{u.name} {u.lastname}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
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
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                            {u.isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                title="Editar rol"
                                                onClick={() => openRoleModal(u.id, u.roles)}
                                                className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                            >
                                                <PencilSimple size={16} />
                                            </button>
                                            <button
                                                title={u.isActive ? "Desactivar" : "Activar"}
                                                disabled={cambiandoStatus}
                                                onClick={() => cambiarStatus({ id: u.id, isActive: !u.isActive })}
                                                className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                                            >
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-border">
                    <p className="text-slate-400 text-sm">
                        Mostrando {rows.length} de {filtered.length} usuarios
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                            &lt; Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={[
                                    "w-8 h-8 text-sm rounded-md border transition-colors",
                                    p === page
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border text-foreground hover:bg-muted",
                                ].join(" ")}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                            Next &gt;
                        </button>
                    </div>
                </div>

            </section>

            {/* Modal editar rol */}
            <FormDialog
                open={!!editingUser}
                onOpenChange={(open) => { if (!open) closeRoleModal() }}
                title="Editar rol"
                description="Seleccioná el nuevo rol para este usuario."
                onSubmit={saveRole}
                submitLabel="Guardar rol"
                isSubmitting={cambiandoRoles}
                submitDisabled={!selectedRole}
                error={roleError}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Rol</label>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                        className="w-full border border-border bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                    >
                        {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
            </FormDialog>
        </>
    )
}
