import type { useDropdown } from "../../hooks/useDropdown";

interface Grado {
    id: number;
    name: string;
    numero: number;
}

interface Props {
    title: string;
    data: Grado[];
    hook: ReturnType<typeof useDropdown>;
}

export const CycleDropdown = ({ title, data, hook }: Props) => {
    return (
        <div ref={hook.ref} className="relative text-center py-4">
            <button
                onClick={hook.toggle}
                className="font-semibold hover:text-sky-600 transition"
            >
                {title}
            </button>

            {hook.open && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">
                    {data.map((grado) => (
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
    );
};