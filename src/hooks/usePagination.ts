import { useMemo, useState } from "react"

export const usePagination = <T,>(data: T[], pageSize = 5) => {
    const [page, setPage] = useState(1)

    const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
    const currentPage = Math.min(page, totalPages)

    const rows = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return data.slice(start, start + pageSize)
    }, [data, currentPage, pageSize])

    return { rows, page: currentPage, setPage, totalPages }
}