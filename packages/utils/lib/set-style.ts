export type RestoreStyle = () => void

export function setStyle(el: HTMLElement, name: string, value: string): RestoreStyle {
    const originalValue = el.style.getPropertyValue(name)
    el.style.setProperty(name, value)

    return () => {
        el.style.setProperty(name, originalValue)
    }
}
