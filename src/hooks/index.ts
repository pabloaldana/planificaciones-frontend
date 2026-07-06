// ── Peticiones al backend ─────────────────────────────────────────────────────
export { usePlanificaciones, usePlanificacion, useCreatePlanificacion, useUpdatePlanificacion, useDownloadPlanificacion, useDeletePlanificacionImagen } from "./usePlanificaciones"
export { useMaterias, useCreateMateria, useUpdateMateria } from "./useMaterias"
export { useGrados, useCreateGrado } from "./useGrados"
export { useCompras, useMasVendidas } from "./useCompras"
export { useUsers, useUpdateUserStatus, useUpdateUserRoles } from "./useUsers"
export { useFavoritos, useCheckFavorito, useToggleFavorito } from "./useFavoritos"
export { useAdminSummary } from "./useSuperAdmin"

// ── UI / lógica local ─────────────────────────────────────────────────────────
export { useTable } from "./useTable"
export { usePagination } from "./usePagination"
