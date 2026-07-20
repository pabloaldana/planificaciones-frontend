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
                className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Anterior
            </button>

            <span className="text-sm text-slate-500 dark:text-slate-400">
                Página <span className="font-semibold text-[#1A6B4A] dark:text-emerald-400">{page}</span> de {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>
    );
};