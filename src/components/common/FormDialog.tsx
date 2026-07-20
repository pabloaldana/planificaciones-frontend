import type { ReactNode } from "react"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"

type FormDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    onSubmit: () => void
    submitLabel: string
    isSubmitting?: boolean
    submitDisabled?: boolean
    error?: string | null
    children: ReactNode
}

// Modal genérico para formularios de "crear/editar X" — el marco (título, botones,
// error) es siempre igual; los campos del form los define cada entidad (materia, grado, etc.)
export const FormDialog = ({
    open, onOpenChange, title, description, onSubmit,
    submitLabel, isSubmitting, submitDisabled, error, children,
}: FormDialogProps) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
                {children}
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <DialogFooter>
                <button
                    onClick={() => onOpenChange(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting || submitDisabled}
                    className="px-4 py-2 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                    {isSubmitting ? `${submitLabel}...` : submitLabel}
                </button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)
