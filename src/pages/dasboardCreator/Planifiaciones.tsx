import { DataTable } from "@/components/common/DataTable";
import { Pagination } from "../../components/ui/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";

import { useTable } from "../../hooks/useTable";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "@phosphor-icons/react";


//! ESTA DATA TIENE Q VENIR DE LA BASE DE DATOS PERO EL SUBJECT SIN TILDES
const data = [
    {
        id: 1,
        title: "Numeros Naturales",
        subject: "Matematica",
        grade: "3°",
        date: "12/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 2,
        title: "Abecedario",
        subject: "Lengua",
        grade: "5°",
        date: "20/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 3,
        title: "Suma y Resta",
        subject: "Matematica",
        grade: "2°",
        date: "15/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 4,
        title: "Sistema Solar",
        subject: "Naturales",
        grade: "4°",
        date: "18/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 5,
        title: "La Oración",
        subject: "Lengua",
        grade: "3°",
        date: "22/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 6,
        title: "Mapas y Continentes",
        subject: "Sociales",
        grade: "6°",
        date: "25/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 7,
        title: "Multiplicación",
        subject: "Matematica",
        grade: "4°",
        date: "28/04/2026",
        url: "#",
        price: "$1000",
    },
    {
        id: 8,
        title: "Ecosistemas",
        subject: "Naturales",
        grade: "5°",
        date: "30/04/2026",
        url: "#",
        price: "$1000",
    },
];

type Row = {
    id: number;
    title: string;
    subject: string;
    grade: string;
    date: string;
    url: string;
};
type Column<T> = {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
};
const columns: Column<Row>[] = [
    { key: "id", label: "Id" },
    { key: "title", label: "Título" },
    { key: "subject", label: "Materia" },
    { key: "grade", label: "Grado" },
    { key: "date", label: "Fecha" },
    { key: "price", label: "Price" },
    // aca es dinamico para ppoder poner botones de acciones como ver, editar, eliminar, etc
    {
        key: "acciones",
        label: "Acciones",
        render: (row) => (
            <div className="flex items-center gap-2">

                {/* VER */}
                <a
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button size="xs" variant="ghost" title="Ver">
                        <EyeIcon /> Ver
                    </Button>
                </a>

                {/* EDITAR */}
                <Button
                    size="xs"
                    variant="ghost"
                // onClick={() =>
                //     navigate(`/planificaciones/${row.id}/editar`)
                // }
                >
                    <PencilIcon size={14} /> Editar
                </Button>

            </div>
        ),
    },
];
const subjects = [
    { value: "all", label: "Todas las materias" },
    { value: "matematica", label: "Matemática" },
    { value: "lengua", label: "Lengua" },
    { value: "sociales", label: "Sociales" },
    { value: "naturales", label: "Naturales" },
];

//! NO PUEDEN VENIR ELEMENTOS VACIOS SINO ROMPE LOS COMPONENTES 
const grades = [
    { value: "all", label: "Todos los grados" },
    { value: "1°", label: "Primero" },
    { value: "2°", label: "Segundo" },
    { value: "3°", label: "Tercero" },
    { value: "4°", label: "Cuarto" },
    { value: "5°", label: "Quinto" },
    { value: "6°", label: "Sexto" },
    { value: "7°", label: "Séptimo" },
];


//! cuando traigo la data de las planifiaciones de la base de datos tengo q quitar todas las tildes en el backend para que el filtrado funcione bien, o hacer una función que elimine las tildes en el frontend, sino el filtro no encuentra coincidencias por ejemplo con "matemática" y "matematica"
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
    } = useTable({ data });

    return (
        <>
            <section className="bg-white rounded-2xl shadow p-5">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        Mis Planificaciones
                    </h2>

                    <Button
                        className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"

                        onClick={() => {
                            // navigate("/planificaciones/crear");
                        }}
                    >
                        Crear Planificación
                    </Button>

                </div>



                <div className="flex flex-wrap gap-3 items-center mb-5">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="border rounded-lg px-3 py-2 text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger>
                            <SelectValue placeholder="Grado" />
                        </SelectTrigger>

                        <SelectContent>
                            {grades.map((g) => (
                                <SelectItem key={g.value} value={g.value}>
                                    {g.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger>
                            <SelectValue placeholder="Materia" />
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

                <div className="overflow-x-auto">
                    {/* Paso intermedio para llamar a las tabla de shadcn, de datatable llama a table */}
                    <DataTable columns={columns} data={rows} />


                    {/* Paginación */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />

                </div>
            </section>
        </>
    )
}

