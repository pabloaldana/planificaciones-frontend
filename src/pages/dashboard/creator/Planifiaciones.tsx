import { useState, useEffect, useMemo } from "react"
import { MagnifyingGlass, Eye, PencilSimple, Trash, ArrowCounterClockwise } from "@phosphor-icons/react"
import { DataTable, type Column } from "@/components/common/DataTable"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/Select"
import { Button } from "@/components/ui/button"
import { getSubjectConfig } from "@/constants/subjects"
import { useMaterias, useGrados, useDownloadPlanificacion } from "@/hooks/index"
import { usePlanificacionesAdmin, useDeletePlanificacion, useReactivatePlanificacion } from "@/hooks/usePlanificaciones"
import { Pagination } from "@/components/ui/Pagination"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

// ─── Badge ────────────────────────────────────────────────────────────────────

const SubjectBadge = ({ subject }: { subject: string }) => {
    const cfg = getSubjectConfig(subject)
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.badge}`}>
            {cfg.label}
        </span>
    )
}

// ─── Row type ─────────────────────────────────────────────────────────────────

type Row = {
    id: number
    title: string
    subject: string
    grade: string
    date: string
    price: string
    is_active: boolean
}

const PAGE_SIZE = 10

// ─── Component ────────────────────────────────────────────────────────────────

export const Planificaciones = () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [grade, setGrade] = useState("all")
    const [subject, setSubject] = useState("all")
    const [page, setPage] = useState(1)
    const [pendingDelete, setPendingDelete] = useState<{ id: number; title: string } | null>(null)

    const { data: materias = [] } = useMaterias()
    const { data: grados = [] } = useGrados()
    const navigate = useNavigate()
    const { mutate: getDownloadLink } = useDownloadPlanificacion()
    const { mutate: deletePlan, isPending: isDeleting } = useDeletePlanificacion()
    const { mutate: reactivatePlan } = useReactivatePlanificacion()

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => { setPage(1) }, [debouncedSearch, grade, subject])

    const { data: response, isLoading } = usePlanificacionesAdmin({
        search: debouncedSearch || undefined,
        page,
        limit: PAGE_SIZE,
        gradoIds: grade !== "all" ? grade : undefined,
        materiaIds: subject !== "all" ? subject : undefined,
    })

    const planificaciones = response?.data ?? []
    const totalPages = response?.totalPages ?? 1

    const handleVer = (id: number) => {
        getDownloadLink(id, {
            onSuccess: (data) => window.open(data.url, "_blank", "noopener,noreferrer"),
        })
    }

    const handleConfirmDelete = () => {
        if (!pendingDelete) return
        deletePlan(pendingDelete.id, {
            onSuccess: () => setPendingDelete(null),
        })
    }

    const columns: Column<Row>[] = [
        {
            key: "id",
            label: "Id",
            render: (row) => (
                <span className="text-slate-400 text-xs font-mono">
                    #{String(row.id).padStart(3, "0")}
                </span>
            ),
        },
        {
            key: "title",
            label: "Título",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span>{row.title}</span>
                    {!row.is_active && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground shrink-0">
                            Inactiva
                        </span>
                    )}
                </div>
            ),
        },
        {
            key: "subject",
            label: "Materia",
            render: (row) => <SubjectBadge subject={row.subject} />,
        },
        { key: "grade", label: "Grado" },
        { key: "date", label: "Fecha" },
        { key: "price", label: "Precio" },
        {
            key: "acciones",
            label: "Acciones",
            render: (row) => (
                <div className="flex items-center gap-1">
                    <button
                        title="Ver"
                        onClick={() => handleVer(row.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <Eye size={16} weight="regular" />
                    </button>
                    <button
                        title="Editar"
                        onClick={() => navigate(`/dashboard/planificaciones/${row.id}/editar`)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <PencilSimple size={16} weight="regular" />
                    </button>
                    {!row.is_active ? (
                        <button
                            title="Reactivar"
                            onClick={() => reactivatePlan(row.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                            <ArrowCounterClockwise size={16} weight="regular" />
                        </button>
                    ) : (
                        <button
                            title="Eliminar"
                            onClick={() => setPendingDelete({ id: row.id, title: row.title })}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <Trash size={16} weight="regular" />
                        </button>
                    )}
                </div>
            ),
        },
    ]

    const rows = useMemo<Row[]>(() => planificaciones.map(p => ({
        id: p.id,
        title: p.title,
        subject: p.materia.name,
        grade: p.grado.name,
        date: new Date(p.created_at).toLocaleDateString("es-AR"),
        price: `$${p.price.toLocaleString("es-AR")}`,
        is_active: p.is_active,
    })), [planificaciones])

    // Select options usan IDs para enviarlos al backend
    const gradeOptions = useMemo(() => [
        { value: "all", label: "Todos los grados" },
        ...grados.map(g => ({ value: String(g.id), label: g.name })),
    ], [grados])

    const subjectOptions = useMemo(() => [
        { value: "all", label: "Todas las materias" },
        ...materias.map(m => ({ value: String(m.id), label: m.name })),
    ], [materias])

    return (
        <>
        <section className="bg-card rounded-xl shadow-sm border border-border">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-6 py-5 border-b border-border">
                <div>
                    <h2 className="text-xl font-bold text-primary">Mis Planificaciones</h2>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Gestioná, editá y publicá tus contenidos.
                    </p>
                </div>
                <Button
                    className="bg-primary text-primary-foreground hover:opacity-90 rounded-lg text-sm h-9 px-4 w-full sm:w-auto"
                    onClick={() => navigate("/dashboard/planificaciones/crear")}
                >
                    + Crear planificación
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
                <div className="relative flex-1 min-w-40 sm:min-w-52">
                    <MagnifyingGlass
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        className="w-full border border-border bg-muted rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger className="w-full sm:w-44">
                        <SelectValue placeholder="Todos los grados" />
                    </SelectTrigger>
                    <SelectContent>
                        {gradeOptions.map((g) => (
                            <SelectItem key={g.value} value={g.value}>
                                {g.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="w-full sm:w-44">
                        <SelectValue placeholder="Todas las materias" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjectOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                                {s.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="px-6 py-2 overflow-x-auto">
                {isLoading ? (
                    <div className="py-8 flex flex-col gap-3 animate-pulse">
                        {[...Array(PAGE_SIZE)].map((_, i) => (
                            <div key={i} className="h-10 bg-muted rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={rows}
                        rowClassName={(row) => !row.is_active ? "opacity-50" : ""}
                    />
                )}
            </div>

            {/* Footer: count + pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-border">
                <p className="text-slate-400 text-sm">
                    {response?.total ?? 0} planificaciones
                </p>
                {totalPages > 1 && (
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                )}
            </div>
        </section>

        <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar planificación</DialogTitle>
                    <DialogDescription>
                        ¿Seguro que querés eliminar <span className="font-semibold text-slate-700">"{pendingDelete?.title}"</span>?
                        <br /><br />
                        Si tiene compras asociadas se va a desactivar en vez de eliminarse. Si no tiene compras, se borra de forma permanente junto con sus archivos en Cloudinary.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <button
                        onClick={() => setPendingDelete(null)}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}
