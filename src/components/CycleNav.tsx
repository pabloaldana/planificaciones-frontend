import { useDropdown } from "../hooks/useDropdown";

interface Grado {
    id: number;
    name: string;
    numero: number;
}

interface CycleData {
    primerCiclo: Grado[];
    segundoCiclo: Grado[];
    tercerCiclo: Grado[];
}

interface Props {
    data: CycleData;
}

export const CycleNav = ({ data }: Props) => {
    const primer = useDropdown();
    const segundo = useDropdown();
    const tercero = useDropdown();

    return (
        <nav className="grid grid-cols-1 md:grid-cols-3 bg-sky-100 text-gray-700">

            {/* Primer ciclo */}
            <div ref={primer.ref} className="relative text-center py-4">
                <button
                    onClick={primer.toggle}
                    className="font-semibold hover:text-sky-600 transition"
                >
                    Primer Ciclo
                </button>

                {primer.open && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
                        {data.primerCiclo.map((grado) => (
                            <div
                                key={grado.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {grado.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Segundo ciclo */}
            <div ref={segundo.ref} className="relative text-center py-4">
                <button
                    onClick={segundo.toggle}
                    className="font-semibold hover:text-sky-600 transition"
                >
                    Segundo Ciclo
                </button>

                {segundo.open && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
                        {data.segundoCiclo.map((grado) => (
                            <div
                                key={grado.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {grado.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tercer ciclo */}
            <div ref={tercero.ref} className="relative text-center py-4">
                <button
                    onClick={tercero.toggle}
                    className="font-semibold hover:text-sky-600 transition"
                >
                    Tercer Ciclo
                </button>

                {tercero.open && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
                        {data.tercerCiclo.map((grado) => (
                            <div
                                key={grado.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {grado.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </nav>
    );
};