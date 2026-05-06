interface SidebarItem {
    label: string
    icon: string
    path: string
}

interface Props {
    title: string //nombre del rol, ej: "Panel", "Admin", etc
    items: SidebarItem[]
}

export const Sidebar = ({ title, items }: Props) => {
    return (
        <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
            <div className="p-6">
                <h2 className="text-xl font-bold text-sky-600">{title}</h2>
            </div>

            <nav className="px-4 space-y-2">
                {items.map((item) => (
                    <button
                        key={item.path}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-sky-100 transition"
                    >
                        {item.icon} {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    )
}