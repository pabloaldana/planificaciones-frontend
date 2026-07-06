import { useEffect } from "react"

type DocumentMeta = {
    title: string
    description?: string
    ogImage?: string
}

const SITE_NAME = "Aula"

const setMeta = (name: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[property="${name}"], meta[name="${name}"]`)
    if (!el) {
        el = document.createElement("meta")
        el.setAttribute(name.startsWith("og:") || name.startsWith("twitter:") ? "property" : "name", name)
        document.head.appendChild(el)
    }
    el.setAttribute("content", content)
}

export const useDocumentMeta = ({ title, description, ogImage }: DocumentMeta) => {
    useEffect(() => {
        const fullTitle = `${title} | ${SITE_NAME}`
        document.title = fullTitle

        if (description) {
            setMeta("description", description)
            setMeta("og:description", description)
            setMeta("twitter:description", description)
        }

        setMeta("og:title", fullTitle)
        setMeta("twitter:title", fullTitle)

        if (ogImage) {
            setMeta("og:image", ogImage)
            setMeta("twitter:image", ogImage)
        }
    }, [title, description, ogImage])
}
