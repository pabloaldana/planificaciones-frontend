interface Props {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export const Pagination = ({
    page,
    totalPages,
    setPage,
}: Props) => {
    return (
        <div className="flex justify-end items-center gap-3 mt-4">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
            >
                Anterior
            </button>

            <span className="text-sm">
                Página {page} de {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    );
};