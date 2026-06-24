import { useAuth } from "@/context/AuthContext"

export const MiPerfil = () => {
    const { user } = useAuth()

    return (
        <section className="bg-white rounded-xl shadow-sm border border-slate-100">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#1A6B4A]">Mi perfil</h2>
                <p className="text-slate-500 text-sm mt-0.5">Tus datos personales</p>
            </div>

            <div className="px-6 py-6 flex flex-col gap-6 max-w-lg">

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#1A6B4A] flex items-center justify-center text-white font-bold text-2xl">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">{user?.email}</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#D1F2EB] text-[#1A6B4A] text-xs font-semibold capitalize">
                            {user?.roles?.[0]}
                        </span>
                    </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Campos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email" value={user?.email ?? "-"} />
                    <Field label="Rol"   value={user?.roles?.[0] ?? "-"} />
                    <Field label="ID"    value={user?.id ?? "-"} />
                </div>

                <p className="text-xs text-slate-400">
                    Para modificar tus datos contactá al administrador.
                </p>

            </div>
        </section>
    )
}

const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm text-slate-700 font-medium">{value}</span>
    </div>
)