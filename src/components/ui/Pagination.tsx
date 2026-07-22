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
        <div className="flex justify-center items-center gap-3">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Anterior
            </button>

            <span className="text-sm text-muted-foreground">
                Página <span className="font-semibold text-primary">{page}</span> de {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>
    );
};