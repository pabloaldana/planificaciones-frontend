import { GraduationCap } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa"
import { MdEmail } from "react-icons/md"


export const Footer = () => {
    return (
        <footer className="bg-[#D7F0FA] border-t border-[#A8D8EE]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Logo + links */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <Link to="/" className="flex items-center gap-2 text-[#1A6B4A] font-bold text-base">
                        <GraduationCap size={22} weight="duotone" />
                        <span>Aula</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm text-slate-500">
                        <Link to="/" className="hover:text-[#1A6B4A] transition-colors">Inicio</Link>
                        <Link to="/catalogo" className="hover:text-[#1A6B4A] transition-colors">Planificaciones</Link>
                    </nav>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-sm font-medium text-slate-700">© 2026 Aula</p>
                    <p className="text-xs text-slate-400 mt-1">Todos los derechos reservados</p>
                </div>

                {/* Redes + Contacto */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <a
                        href="https://www.instagram.com/docenteconectada?utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-600 hover:text-[#1A6B4A] transition-colors"
                    >
                        <FaInstagram size={20} />
                        <span className="text-sm">@docenteconectada</span>
                    </a>
                    <Link
                        to="/contacto"
                        className="flex items-center gap-2 text-slate-600 hover:text-[#1A6B4A] transition-colors"
                    >
                        <MdEmail size={18} className="text-[#1A6B4A]" />
                        <span className="text-sm">Contacto</span>
                    </Link>
                </div>

            </div>

            <div className="border-t border-[#A8D8EE] py-3 text-center text-xs text-slate-400">
                Diseñado y desarrollado por <span className="font-medium text-slate-500">Pablo Aldana</span>
            </div>
        </footer>
    )
}