import { MagnifyingGlass, Bell, TextColumns } from "@phosphor-icons/react"

interface Props {
    onToggleSidebar?: () => void
}

export const Header = ({ onToggleSidebar }: Props) => {
    return (
        <header className="h-15 bg-white border-b border-slate-200 flex items-center px-5 gap-4 shrink-0">
            {/* Toggle sidebar */}
            <button
                onClick={onToggleSidebar}
                className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-md hover:bg-slate-100"
                aria-label="Toggle sidebar"
            >
                <TextColumns size={20} weight="regular" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <MagnifyingGlass
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Buscar planificaciones, materias..."
                        className="w-full bg-slate-100 border border-transparent rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-3">
                <button
                    className="text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-md hover:bg-slate-100"
                    aria-label="Notificaciones"
                >
                    <Bell size={20} weight="regular" />
                </button>

                <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white font-semibold text-sm">
                    P
                </div>
            </div>
        </header>
    )
}
