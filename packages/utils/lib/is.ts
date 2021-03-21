export function isHTMLElement(obj: any): obj is HTMLElement {
    return obj instanceof HTMLElement
}

export function isElement(obj: any): obj is Element {
    return obj instanceof Element
}

export function isWindow(obj: any): obj is Window {
    return obj === window
}
