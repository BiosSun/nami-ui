import { isWindow, isElement, isHTMLElement } from '@nami-ui/utils'

type LineAnchor = 'center' | 'start' | 'end'

type Line = {
    length: number
    start: number
}

export type HorizontalAnchor = 'center' | 'left' | 'right'
export type VerticalAnchor = 'center' | 'top' | 'bottom'
export type RectAnchor = [HorizontalAnchor, VerticalAnchor]

export type Position = {
    top: number
    left: number
}

export type Rect = {
    width: number
    height: number
    top: number
    left: number
}

const RECT_ANCHOR_TO_LINE_ANCHOR: {
    [key in HorizontalAnchor | VerticalAnchor]: LineAnchor
} = {
    center: 'center',
    top: 'start',
    left: 'start',
    bottom: 'end',
    right: 'end',
}

export function positionPoint(el: Line, at: LineAnchor): number {
    return el.length * (at === 'end' ? 1 : at === 'center' ? 0.5 : 0)
}

export function positionSingle(el: Line, of: Line, my: LineAnchor, at: LineAnchor): number {
    const elPoint = positionPoint(el, my)
    const ofPoint = positionPoint(of, at)
    return ofPoint + of.start - elPoint
}

export function positionRect(el: Rect, of: Rect, my: RectAnchor, at: RectAnchor): Position {
    return {
        top: positionSingle(
            { start: el.top, length: el.height },
            { start: of.top, length: of.height },
            RECT_ANCHOR_TO_LINE_ANCHOR[my[1]],
            RECT_ANCHOR_TO_LINE_ANCHOR[at[1]],
        ),
        left: positionSingle(
            { start: el.left, length: el.width },
            { start: of.left, length: of.width },
            RECT_ANCHOR_TO_LINE_ANCHOR[my[0]],
            RECT_ANCHOR_TO_LINE_ANCHOR[at[0]],
        ),
    }
}

type Point = {
    pageX: number
    pageY: number
}

type Touch = {
    changedTouch: TouchList
}

export type PopupElement = Element | Rect
export type TargetElement = Element | Rect | Window | Point | Touch

function isPoint(obj: any): obj is Point {
    return typeof obj?.pageX === 'number'
}

function isTouch(obj: any): obj is Touch {
    return obj?.changedTouch instanceof TouchList
}

function toRect(el: PopupElement | TargetElement): Rect {
    if (isElement(el)) {
        return toRect.element(el)
    }

    if (isWindow(el)) {
        return toRect.window(el)
    }

    if (isPoint(el)) {
        return toRect.point(el)
    }

    if (isTouch(el)) {
        return toRect.touch(el)
    }

    return el
}

toRect.element = (el: Element) => {
    const { width, height, top, left } = el.getBoundingClientRect()
    return { width, height, top: top + window.scrollY, left: left + window.scrollX }
}

toRect.window = (el: Window) => {
    const { innerWidth, innerHeight, scrollX, scrollY } = el
    return { width: innerWidth, height: innerHeight, top: scrollY, left: scrollX }
}

toRect.point = (el: Point) => {
    const { pageX, pageY } = el
    return { width: 0, height: 0, top: pageY, left: pageX }
}

toRect.touch = (el: Touch) => {
    const { pageX, pageY } = el.changedTouch[0]
    return { width: 0, height: 0, top: pageY, left: pageX }
}

function relativeOffsetParent(el: PopupElement, po: Position): Position {
    if (!isHTMLElement(el)) {
        return po
    }

    const { offsetParent } = el

    if (!offsetParent) {
        return po
    }

    const parentRect = toRect.element(offsetParent)

    return {
        top: po.top - parentRect.top,
        left: po.left - parentRect.left,
    }
}

function roundPosition(of: Rect, po: Position): Position {
    return {
        top: Math.round(of.top) > of.top ? Math.ceil(po.top) : Math.floor(po.top),
        left: Math.round(of.left) > of.left ? Math.ceil(po.left) : Math.floor(po.left),
    }
}

export function position(
    el: PopupElement,
    of: TargetElement,
    my: RectAnchor,
    at: RectAnchor,
): Position {
    const elRect = toRect(el)
    const ofRect = toRect(of)

    let po = positionRect(elRect, ofRect, my, at)
    po = relativeOffsetParent(el, po)
    po = roundPosition(ofRect, po)

    return po
}
