import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import TextAlign from "@tiptap/extension-text-align"
import {
    TextB, TextItalic, TextUnderline,
    ListBullets, ListNumbers,
    TextAlignLeft, TextAlignCenter, TextAlignRight,
} from "@phosphor-icons/react"
import { useEffect } from "react"

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
}

// ── Colores disponibles ───────────────────────────────────────────────────────

const COLORS = [
    { label: "Negro", value: "#1e293b" },
    { label: "Verde", value: "#1A6B4A" },
    { label: "Azul", value: "#1d4ed8" },
    { label: "Rojo", value: "#dc2626" },
    { label: "Naranja", value: "#d97706" },
]

// ── Botón de toolbar ──────────────────────────────────────────────────────────

const ToolbarBtn = ({
    onClick,
    active,
    title,
    children,
}: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
}) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick() }}
        title={title}
        className={[
            "flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold transition-colors",
            active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted",
        ].join(" ")}
    >
        {children}
    </button>
)

// ── Editor ────────────────────────────────────────────────────────────────────

export const RichTextEditor = ({ value, onChange, placeholder = "Escribí el contenido..." }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: "rich-content min-h-[200px] px-4 py-3 text-sm text-foreground focus:outline-none",
            },
        },
    })

    // Sincronizar valor externo (ej: cuando se precarga un plan en EditarPlanificacion)
    useEffect(() => {
        if (!editor) return
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "")
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="rounded-md border border-border bg-muted overflow-hidden focus-within:border-primary transition-colors">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-border bg-card">

                {/* Headings */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editor.isActive("heading", { level: 1 })}
                    title="Título (H1)"
                >
                    H1
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive("heading", { level: 2 })}
                    title="Subtítulo (H2)"
                >
                    H2
                </ToolbarBtn>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Formato inline */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    title="Negrita"
                >
                    <TextB size={15} weight="bold" />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    title="Cursiva"
                >
                    <TextItalic size={15} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    active={editor.isActive("underline")}
                    title="Subrayado"
                >
                    <TextUnderline size={15} />
                </ToolbarBtn>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Listas */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive("bulletList")}
                    title="Lista con viñetas"
                >
                    <ListBullets size={15} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive("orderedList")}
                    title="Lista numerada"
                >
                    <ListNumbers size={15} />
                </ToolbarBtn>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Alineación */}
                <ToolbarBtn
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    active={editor.isActive({ textAlign: "left" })}
                    title="Alinear izquierda"
                >
                    <TextAlignLeft size={15} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    active={editor.isActive({ textAlign: "center" })}
                    title="Centrar"
                >
                    <TextAlignCenter size={15} />
                </ToolbarBtn>
                <ToolbarBtn
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    active={editor.isActive({ textAlign: "right" })}
                    title="Alinear derecha"
                >
                    <TextAlignRight size={15} />
                </ToolbarBtn>

                <div className="w-px h-5 bg-border mx-1" />

                {/* Colores */}
                <div className="flex items-center gap-1">
                    {COLORS.map((c) => (
                        <button
                            key={c.value}
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setColor(c.value).run() }}
                            title={c.label}
                            className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                            style={{ backgroundColor: c.value }}
                        />
                    ))}
                    <button
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run() }}
                        title="Sin color"
                        className="w-5 h-5 rounded-full border-2 border-border bg-card hover:scale-110 transition-transform text-[9px] text-muted-foreground flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Área de escritura */}
            <div className="relative">
                {editor.isEmpty && (
                    <p className="absolute top-3 left-4 text-sm text-muted-foreground pointer-events-none select-none">
                        {placeholder}
                    </p>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
