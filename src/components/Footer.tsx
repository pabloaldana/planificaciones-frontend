import { GraduationCap } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa"
import { MdEmail } from "react-icons/md"


export const Footer = () => {
    return (
        <footer className="bg-secondary/60 border-t border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                <div className="flex flex-col items-center md:items-start gap-3">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-base">
                        <GraduationCap size={22} weight="duotone" />
                        <span>Aula</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
                        <Link to="/catalogo" className="hover:text-foreground transition-colors">Planificaciones</Link>
                    </nav>
                </div>

                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">© 2026 Aula</p>
                    <p className="text-xs text-muted-foreground mt-1">Todos los derechos reservados</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3">
                    <a
                        href="https://www.instagram.com/docenteconectada?utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                        <FaInstagram size={20} />
                        <span>@docenteconectada</span>
                    </a>
                    <Link
                        to="/contacto"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                        <MdEmail size={18} />
                        <span>Contacto</span>
                    </Link>
                </div>

            </div>

            <div className="border-t border-border py-3 text-center text-xs text-muted-foreground">
                Diseñado y desarrollado por <span className="font-medium text-foreground">Pablo Aldana</span>
            </div>
        </footer>
    )
}
