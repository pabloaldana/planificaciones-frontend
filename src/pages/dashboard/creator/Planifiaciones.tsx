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
import { useTable } from "../../../hooks/useTable"
import { subjectConfig } from "@/constants/subjects"

// ─── Data ────────────────────────────────────────────────────────────────────

const data = [
    { id: 1, title: "Numeros Naturales", subject: "Matematica", grade: "3°", date: "12/04/2026", url: "#", price: "$1.000" },
    { id: 2, title: "Abecedario", subject: "Lengua", grade: "5°", date: "20/04/2026", url: "#", price: "$1.000" },
    { id: 3, title: "Suma y Resta", subject: "Matematica", grade: "2°", date: "15/04/2026", url: "#", price: "$1.000" },
    { id: 4, title: "Sistema Solar", subject: "Naturales", grade: "4°", date: "18/04/2026", url: "#", price: "$1.000" },
    { id: 5, title: "La Oración", subject: "Lengua", grade: "3°", date: "22/04/2026", url: "#", price: "$1.000" },
    { id: 6, title: "Mapas y Continentes", subject: "Sociales", grade: "6°", date: "25/04/2026", url: "#", price: "$1.000" },
    { id: 7, title: "Multiplicación", subject: "Matematica", grade: "4°", date: "28/04/2026", url: "#", price: "$1.000" },
    { id: 8, title: "Ecosistemas", subject: "Naturales", grade: "5°", date: "30/04/2026", url: "#", price: "$1.000" },
]

// ─── Badges ──────────────────────────────────────────────────────────────────

const SubjectBadge = ({ subject }: { subject: string }) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subjectConfig[subject]?.badge ?? "bg-slate-100 text-slate-600"}`}
    >
        {subjectConfig[subject]?.label ?? subject}
    </span>
)

// ─── Select options ───────────────────────────────────────────────────────────

const subjects = [
    { value: "all", label: "Todas las materias" },
    { value: "matematica", label: "Matemática" },
    { value: "lengua", label: "Lengua" },
    { value: "sociales", label: "Sociales" },
    { value: "naturales", label: "Naturales" },
]

//! NO PUEDEN VENIR ELEMENTOS VACÍOS SINO ROMPE LOS COMPONENTES
const grades = [
    { value: "all", label: "Todos los grados" },
    { value: "1°", label: "Primero" },
    { value: "2°", label: "Segundo" },
    { value: "3°", label: "Tercero" },
    { value: "4°", label: "Cuarto" },
    { value: "5°", label: "Quinto" },
    { value: "6°", label: "Sexto" },
    { value: "7°", label: "Séptimo" },
]

// ─── Column definitions ───────────────────────────────────────────────────────

type Row = {
    id: number
    title: string
    subject: string
    grade: string
    date: string
    url: string
    price: string
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
                <a href={row.url} target="_blank" rel="noopener noreferrer">
                    <button
                        title="Ver"
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <Eye size={16} weight="regular" />
                    </button>
                </a>
                <button
                    title="Editar"
                    className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                    <PencilSimple size={16} weight="regular" />
                </button>
            </div>
        ),
    },
]

// ─── Component ────────────────────────────────────────────────────────────────

//! cuando traigo la data de las planificaciones de la base de datos tengo q quitar todas las tildes en el backend para que el filtrado funcione bien, o hacer una función que las elimine en el frontend, sino el filtro no encuentra coincidencias por ejemplo con "matemática" y "matematica"
export const Planifiaciones = () => {
    const {
        rows,
        search,
        setSearch,
        grade,
        setGrade,
        subject,
        setSubject,
        page,
        setPage,
        totalPages,
    } = useTable({ data })

    const totalFiltered = (() => {
        // total sin paginar para el texto "Mostrando X de Y"
        return data.filter((item) => {
            const matchGrade = grade === "all" || item.grade.toLowerCase() === grade.toLowerCase()
            const matchSubject = subject === "all" || item.subject.toLowerCase() === subject.toLowerCase()
            const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
            return matchGrade && matchSubject && matchSearch
        }).length
    })()

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-[#8B3A52]">Mis Planificaciones</h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Gestioná, editá y publicá tus contenidos.
                    </p>
                </div>
                <Button
                    className="bg-[#8B3A52] hover:bg-[#6E2D40] text-white rounded-lg text-sm h-9 px-4 w-full sm:w-auto"
                    onClick={() => {
                        // navigate("/planificaciones/crear")
                    }}
                >
                    + Crear planificación
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-slate-100">
                {/* Search */}
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

                {/* Grade select */}
                <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger className="w-full sm:w-44">
                        <SelectValue placeholder="Todos los grados" />
                    </SelectTrigger>
                    <SelectContent>
                        {grades.map((g) => (
                            <SelectItem key={g.value} value={g.value}>
                                {g.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Subject select */}
                <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="w-full sm:w-44">
                        <SelectValue placeholder="Todas las materias" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((s) => (
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
                                    ? "bg-[#8B3A52] text-white border-[#8B3A52]"
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
