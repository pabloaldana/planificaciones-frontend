import { BookBookmark } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Footer } from "@/components/Footer"

const BULLETS = [
    "Encontrá planificaciones listas para usar",
    "Ahorrá horas de preparación de clases",
    "Accedé a tus compras cuando quieras",
]

interface AuthLayoutProps {
    title: string
    description: string
    children: React.ReactNode
}

export const AuthLayout = ({ title, description, children }: AuthLayoutProps) => (
    <div className="min-h-screen flex flex-col">

        <div className="flex-1 grid lg:grid-cols-2">

            {/* Panel izquierdo — branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-primary text-primary-foreground px-12 gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <BookBookmark size={36} weight="fill" className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Aula</h1>
                        <p className="text-white/60 mt-1 text-sm">
                            Planificaciones educativas listas para llevar a tu aula.
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-xs border-t border-white/10 pt-6 flex flex-col gap-3">
                    {BULLETS.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel derecho — formulario */}
            <div className="flex flex-col items-center justify-center bg-background px-6 py-10 gap-4">
                <NavLink
                    to="/"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors self-start max-w-md w-full"
                >
                    ← Volver al inicio
                </NavLink>

                <Card className="w-full max-w-md rounded-2xl border border-border bg-card shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-primary">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                            {description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>

        </div>

        <Footer />

    </div>
)
