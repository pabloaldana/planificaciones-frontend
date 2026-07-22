import { useState } from "react"
import { Camera } from "@phosphor-icons/react"
import { useAuth } from "@/context/AuthContext"

export const MiPerfil = () => {
    const { user, updateAvatar, updateProfile } = useAuth()
    const [isUploading, setIsUploading] = useState(false)
    const [avatarError, setAvatarError] = useState<string | null>(null)

    const [name, setName] = useState(user?.name ?? "")
    const [lastname, setLastname] = useState(user?.lastname ?? "")
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)
    const [saveSuccess, setSaveSuccess] = useState(false)

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = ""
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setAvatarError("Solo se aceptan archivos de imagen")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setAvatarError("La imagen no puede superar 5MB")
            return
        }

        setAvatarError(null)
        setIsUploading(true)
        try {
            await updateAvatar(file)
        } catch {
            setAvatarError("No se pudo subir la imagen. Probá de nuevo.")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSaveProfile = async () => {
        if (!name.trim() || !lastname.trim()) return
        setSaveError(null)
        setSaveSuccess(false)
        setIsSaving(true)
        try {
            await updateProfile({ name: name.trim(), lastname: lastname.trim() })
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch {
            setSaveError("No se pudo guardar. Probá de nuevo.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="bg-card rounded-xl shadow-sm border border-border">

            {/* Header */}
            <div className="px-6 py-5 border-b border-border">
                <h2 className="text-xl font-bold text-primary">Mi perfil</h2>
                <p className="text-slate-500 text-sm mt-0.5">Tus datos personales</p>
            </div>

            <div className="px-6 py-6 flex flex-col gap-6 max-w-lg">

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <label
                        htmlFor="avatar-upload"
                        className="relative w-16 h-16 rounded-full cursor-pointer group shrink-0"
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt=""
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera size={20} className="text-white" />
                        </div>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            disabled={isUploading}
                            onChange={handleAvatarChange}
                        />
                    </label>
                    <div>
                        <p className="font-semibold text-foreground">{user?.email}</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold capitalize">
                            {user?.roles?.[0]}
                        </span>
                    </div>
                </div>

                {isUploading && <p className="text-xs text-slate-400">Subiendo imagen...</p>}
                {avatarError && <p className="text-xs text-red-500">{avatarError}</p>}

                <div className="border-t border-border" />

                {/* Campos de perfil */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-border bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Apellido</label>
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="border border-border bg-muted rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <Field label="Email" value={user?.email ?? "-"} />
                    <Field label="Rol"   value={user?.roles?.[0] ?? "-"} />
                </div>

                {saveError && <p className="text-xs text-red-500">{saveError}</p>}
                {saveSuccess && <p className="text-xs text-primary">Cambios guardados correctamente.</p>}

                <div className="flex justify-end">
                    <button
                        onClick={handleSaveProfile}
                        disabled={isSaving || !name.trim() || !lastname.trim()}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>

            </div>
        </section>
    )
}

const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm text-foreground font-medium">{value}</span>
    </div>
)
