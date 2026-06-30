import { useMemo } from "react"
import { MagnifyingGlass, Eye, PencilSimple } from "@phosphor-icons/react"
import { DataTable, type Column } from "@/components/common/DataTable"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/Select"
import { Button } from "@/components/ui/button"
import { useTable } from "@/hooks/index"
import { getSubjectConfig } from "@/constants/subjects"
import { useMaterias, useGrados, usePlanificaciones, useDownloadPlanificacion } from "@/hooks/index"
import { useNavigate } from "react-router-dom"

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
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Planificaciones = () => {
    const { data: planificaciones = [] } = usePlanificaciones()
    const { data: materias = [] } = useMaterias()
    const { data: grados = [] } = useGrados()

    const navigate = useNavigate()
    const { mutate: getDownloadLink } = useDownloadPlanificacion()

    const handleVer = (id: number) => {
        getDownloadLink(id, {
            onSuccess: (data) => window.open(data.url, "_blank", "noopener,noreferrer"),
        })
    }

    // Columnas adentro del componente: el botón "Editar" necesita navigate()
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
        { key: "title", label: "Título" },
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
                </div>
            ),
        },
    ]

    // Mapeo al shape que espera useTable
    const tableData = useMemo<Row[]>(() => planificaciones.map(p => ({
        id: p.id,
        title: p.title,
        subject: p.materia.name,
        grade: p.grado.name,
        date: new Date(p.created_at).toLocaleDateString("es-AR"),
        price: `$${p.price.toLocaleString("es-AR")}`,
    })), [planificaciones])

    // Opciones dinámicas para los selects
    const subjectOptions = useMemo(() => [
        { value: "all", label: "Todas las materias" },
        ...materias.map(m => ({ value: m.name.toLowerCase(), label: m.name })),
    ], [materias])

    const gradeOptions = useMemo(() => [
        { value: "all", label: "Todos los grados" },
        ...grados.map(g => ({ value: g.name.toLowerCase(), label: g.name })),
    ], [grados])

    const {
        rows,
        search, setSearch,
        grade, setGrade,
        subject, setSubject,
        page, setPage,
        totalPages,
    } = useTable({ data: tableData })

    const totalFiltered = tableData.filter(item => {
        const matchGrade = grade === "all" || item.grade.toLowerCase() === grade.toLowerCase()
        const matchSubject = subject === "all" || item.subject.toLowerCase() === subject.toLowerCase()
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
        return matchGrade && matchSubject && matchSearch
    }).length

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-[#1A6B4A]">Mis Planificaciones</h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Gestioná, editá y publicá tus contenidos.
                    </p>
                </div>
                <Button
                    className="bg-[#1A6B4A] hover:bg-[#134F37] text-white rounded-lg text-sm h-9 px-4 w-full sm:w-auto"
                    onClick={() => navigate("/dashboard/planificaciones/crear")}
                >
                    + Crear planificación
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-slate-100">
                <div className="relative flex-1 min-w-40 sm:min-w-52">
                    <MagnifyingGlass
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por título o materia..."
                        className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
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
                <DataTable columns={columns} data={rows} />
            </div>

            {/* Footer: count + pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-slate-100">
                <p className="text-slate-400 text-sm">
                    Mostrando {rows.length} de {totalFiltered} resultados
                </p>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
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
                                    ? "bg-[#1A6B4A] text-white border-[#1A6B4A]"
                                    : "border-slate-200 text-slate-600 hover:bg-slate-50",
                            ].join(" ")}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </section>
    )
}
