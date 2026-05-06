import { useDropdown } from "../hooks/useDropdown";
import { CycleDropdown } from "./ui/CycleDropdown";

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

            <CycleDropdown title="Primer Ciclo" data={data.primerCiclo} hook={primer} />
            <CycleDropdown title="Segundo Ciclo" data={data.segundoCiclo} hook={segundo} />
            <CycleDropdown title="Tercer Ciclo" data={data.tercerCiclo} hook={tercero} />

        </nav>
    );
};