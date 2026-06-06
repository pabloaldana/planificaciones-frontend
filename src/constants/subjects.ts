export const subjectConfig: Record<string, { label: string; badge: string }> = {
    "matemática":           { label: "Matemática",         badge: "bg-[#E8DAEF] text-[#5C3D7A]" },
    "lengua y literatura":  { label: "Lengua",             badge: "bg-[#FFF7C2] text-[#7A6200]" },
    "ciencias naturales":   { label: "Ciencias Naturales", badge: "bg-[#D1F2EB] text-[#1A6B4A]" },
    "ciencias sociales":    { label: "Ciencias Sociales",  badge: "bg-[#D7F0FA] text-[#1A5F7A]" },
    "tecnología":           { label: "Tecnología",         badge: "bg-[#FFE8D0] text-[#8B4500]" },
    "inglés":               { label: "Inglés",             badge: "bg-[#FFF7C2] text-[#7A6200]" },
}

export const getSubjectConfig = (name: string) =>
    subjectConfig[name.toLowerCase()] ?? { label: name, badge: "bg-slate-100 text-slate-600" }
