import { useEffect, useMemo, useState } from "react";

interface Props {
    data: Row[];
}

interface Row {
    id: number;
    title: string;
    subject: string;
    grade: string;
    date: string;
    url: string;
}

export const useTable = ({ data }: Props) => {
    const [grade, setGrade] = useState("all");
    const [subject, setSubject] = useState("all");
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const pageSize = 5;


    // console.log("Search:", search)
    //! FILTRADO FUNCIONA PERO LA DATA TIENE Q VENIR SIN TILDES, SINO NO ENCUENTRA COINCIDENCIAS POR EJEMPLO CON "MATEMÁTICA" Y "MATEMATICA", HAY Q QUITAR LAS TILDES EN EL BACKEND O HACER UNA FUNCION QUE LAS ELIMINE EN EL FRONTEND
    const rows = useMemo(() => {
        return data.filter((item) => {
            const matchGrade =
                grade === "all" || item.grade.toLowerCase() === grade.toLowerCase();

            const matchSubject =
                subject === "all" || item.subject.toLowerCase() === subject.toLowerCase();

            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase());

            return matchGrade && matchSubject && matchSearch;
        });
    }, [data, grade, subject, search]);

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * pageSize;
        return rows.slice(start, start + pageSize);
    }, [rows, page]);

    const totalPages = Math.ceil(rows.length / pageSize);

    useEffect(() => {
        setPage(1);
    }, [grade, subject, search]);

    return {
        grade,
        setGrade,
        subject,
        setSubject,

        rows: paginatedRows,
        page,
        setPage,
        totalPages,

        search,
        setSearch,

    };
};