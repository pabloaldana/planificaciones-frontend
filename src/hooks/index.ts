// ── Peticiones al backend ─────────────────────────────────────────────────────
export { usePlanificaciones, usePlanificacion, useCreatePlanificacion, useUpdatePlanificacion, useDownloadPlanificacion, useDeletePlanificacionImagen } from "./usePlanificaciones"
export { useMaterias, useCreateMateria } from "./useMaterias"
export { useGrados, useCreateGrado } from "./useGrados"
export { useCompras, useMasVendidas } from "./useCompras"
export { useUsers } from "./useUsers"
export { useAdminSummary } from "./useSuperAdmin"

// ── UI / lógica local ─────────────────────────────────────────────────────────
export { useTable } from "./useTable"
export { usePagination } from "./usePagination"
export { useDropdown } from "./useDropdown"