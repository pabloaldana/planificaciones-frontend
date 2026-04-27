import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export const Footer = () => {

    return (
        <footer className="bg-[#D7F0FA] border-t border-white/40 text-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Redes */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <p className="text-lg font-semibold tracking-wide">
                        Redes Sociales
                    </p>

                    <div className="flex gap-4 text-2xl">
                        <FaInstagram className="cursor-pointer transition hover:scale-110 hover:text-pink-500" />
                        <FaWhatsapp className="cursor-pointer transition hover:scale-110 hover:text-green-500" />
                        <FaFacebook className="cursor-pointer transition hover:scale-110 hover:text-blue-600" />
                    </div>
                </div>

                {/* Centro */}
                <div className="text-center">
                    <p className="text-sm md:text-base font-medium">
                        © 2026 My App
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        Todos los derechos reservados
                    </p>
                </div>

                {/* Contacto */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <p className="text-lg font-semibold tracking-wide">
                        Contacto
                    </p>

                    <div className="space-y-2 text-sm items-center">
                        <div className="flex items-center gap-2">
                            <MdEmail className="text-lg text-blue-500" />
                            <span>prueba@gmail.com</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MdPhone className="text-lg text-green-500" />
                            <span>+123 456 7890</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};