import { BookBookmarkIcon } from "@phosphor-icons/react"
import { LoginCard } from "@/components/auth/LoginCard"

export const LoginPage = () => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Panel izquierdo — branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-[#1e3a5f] text-white px-12 gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <BookBookmarkIcon size={36} weight="fill" className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Aula</h1>
                        <p className="text-white/60 mt-1 text-sm">
                            La plataforma para docentes que crean y venden planificaciones educativas.
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-xs border-t border-white/10 pt-6 flex flex-col gap-3">
                    {["Publicá tus planificaciones", "Vendé a otros docentes", "Seguí tus estadísticas"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel derecho — formulario */}
            <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-6">
                <LoginCard />
            </div>
        </div>
    )
}
