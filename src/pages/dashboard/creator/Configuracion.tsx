import { useState, useEffect } from "react"
import {
    User,
    Lock,
    Wallet,
    Bell,
    ShoppingCart,
    ChatCircle,
    EnvelopeSimple,
    Camera,
} from "@phosphor-icons/react"
import { useAuth } from "@/context/AuthContext"

type Section = "perfil" | "cuenta" | "cobro" | "notificaciones"

const menuItems: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "cuenta", label: "Cuenta", icon: Lock },
    { id: "cobro", label: "Medios de cobro", icon: Wallet },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
]

// ─── Sección Perfil ───────────────────────────────────────────────────────────

const SeccionPerfil = () => {
    const { user, updateAvatar, updateProfile } = useAuth()

    const [name, setName] = useState(user?.name ?? "")
    const [lastname, setLastname] = useState(user?.lastname ?? "")

    useEffect(() => {
        setName(user?.name ?? "")
        setLastname(user?.lastname ?? "")
    }, [user?.name, user?.lastname])

    const [isUploading, setIsUploading] = useState(false)
    const [avatarError, setAvatarError] = useState<string | null>(null)
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

    const handleSave = async () => {
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
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <div className="mb-6">
                <h2 className="text-base font-semibold text-[#1A6B4A]">Perfil</h2>
                <p className="text-slate-500 text-sm mt-0.5">Tu información pública como creadora</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
                <label
                    htmlFor="config-avatar-upload"
                    className="relative w-20 h-20 rounded-full cursor-pointer group shrink-0"
                >
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt=""
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-semibold"
                            style={{ backgroundColor: "#1A6B4A" }}
                        >
                            {user?.name?.charAt(0).toUpperCase() ?? user?.email?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={22} className="text-white" />
                    </div>
                    <input
                        id="config-avatar-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        disabled={isUploading}
                        onChange={handleAvatarChange}
                    />
                </label>
                <div>
                    <p className="text-sm text-slate-500">
                        {isUploading ? "Subiendo imagen..." : "Hacé click en la foto para cambiarla"}
                    </p>
                    {avatarError && <p className="text-xs text-red-500 mt-1">{avatarError}</p>}
                </div>
            </div>

            {/* Nombre */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
                />
            </div>

            {/* Apellido */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Apellido
                </label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
                />
            </div>

            {/* Email */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={user?.email ?? ""}
                    disabled
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 cursor-not-allowed opacity-70 focus:outline-none"
                />
                <p className="text-slate-500 text-sm mt-1">
                    El email no se puede cambiar desde aquí
                </p>
            </div>

            {saveError && <p className="text-xs text-red-500 mb-3">{saveError}</p>}
            {saveSuccess && <p className="text-xs text-[#1A6B4A] mb-3">Cambios guardados correctamente.</p>}

            {/* Guardar */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving || !name.trim() || !lastname.trim()}
                    className="bg-[#8B3A52] text-white hover:bg-[#7a3347] rounded-lg px-4 py-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
        </div>
    )
}

// ─── Sección Cuenta ───────────────────────────────────────────────────────────

const SeccionCuenta = () => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="mb-6">
            <h2 className="text-base font-semibold text-[#1A6B4A]">Datos de la cuenta</h2>
            <p className="text-slate-500 text-sm mt-0.5">Gestioná tu acceso a la plataforma</p>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña actual
            </label>
            <input
                type="password"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Nueva contraseña
            </label>
            <input
                type="password"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
            />
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirmar contraseña
            </label>
            <input
                type="password"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
            />
        </div>

        <div className="flex justify-end">
            <button className="bg-[#1A6B4A] text-white hover:bg-[#134F37] rounded-lg px-4 py-2 text-sm transition-colors">
                Cambiar contraseña
            </button>
        </div>

    </div>
)

// ─── Sección Medios de cobro ──────────────────────────────────────────────────

const SeccionCobro = () => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="mb-6">
            <h2 className="text-base font-semibold text-[#1A6B4A]">Medios de cobro</h2>
            <p className="text-slate-500 text-sm mt-0.5">Configurá cómo recibís tus pagos</p>
        </div>

        <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <Wallet size={48} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">
                Esta sección estará disponible próximamente
            </p>
            <p className="text-slate-400 text-xs text-center max-w-xs">
                Podrás configurar tu CBU, Mercado Pago y otros medios de cobro
            </p>
        </div>
    </div>
)

// ─── Sección Notificaciones ───────────────────────────────────────────────────

interface NotificationRowProps {
    icon: React.ReactNode
    title: string
    description: string
}

const NotificationRow = ({ icon, title, description }: NotificationRowProps) => (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
        <div className="shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700">{title}</p>
            <p className="text-slate-500 text-sm">{description}</p>
        </div>
        {/* Toggle visual deshabilitado */}
        <div className="w-10 h-6 rounded-full bg-slate-200 relative opacity-50 cursor-not-allowed shrink-0">
            <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1 shadow-sm" />
        </div>
    </div>
)

const SeccionNotificaciones = () => (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="mb-6">
            <h2 className="text-base font-semibold text-[#1A6B4A]">Notificaciones</h2>
            <p className="text-slate-500 text-sm mt-0.5">Controlá qué avisos recibís</p>
        </div>

        <NotificationRow
            icon={
                <div className="w-9 h-9 rounded-full bg-cyan-50 flex items-center justify-center">
                    <ShoppingCart size={20} className="text-cyan-500" />
                </div>
            }
            title="Nueva venta"
            description="Recibí un aviso cada vez que alguien compre una planificación"
        />
        <NotificationRow
            icon={
                <div className="w-9 h-9 rounded-full bg-violet-50 flex items-center justify-center">
                    <ChatCircle size={20} className="text-violet-500" />
                </div>
            }
            title="Nuevo comentario"
            description="Enterate cuando alguien comente en una de tus planificaciones"
        />
        <NotificationRow
            icon={
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <EnvelopeSimple size={20} className="text-amber-500" />
                </div>
            }
            title="Resumen semanal"
            description="Recibí un resumen de tus ventas cada semana por email"
        />

        <p className="text-slate-400 text-xs text-center mt-4">
            Las notificaciones estarán disponibles cuando se conecte el backend
        </p>
    </div>
)

// ─── Componente principal ─────────────────────────────────────────────────────

export const Configuracion = () => {
    const [activeSection, setActiveSection] = useState<Section>("perfil")

    const renderSection = () => {
        switch (activeSection) {
            case "perfil":
                return <SeccionPerfil />
            case "cuenta":
                return <SeccionCuenta />
            case "cobro":
                return <SeccionCobro />
            case "notificaciones":
                return <SeccionNotificaciones />
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
            {/* Menú lateral */}
            <div className="md:col-span-1 bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                <nav className="flex flex-col gap-1">
                    {menuItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full ${
                                activeSection === id
                                    ? "bg-[#D1F2EB] text-[#1A6B4A]"
                                    : "text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            <Icon size={18} weight={activeSection === id ? "fill" : "regular"} />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenido de la sección activa */}
            <div className="md:col-span-2">{renderSection()}</div>
        </div>
    )
}
