/* eslint-disable no-param-reassign, import/export */
import { useRef, useMemo, Dispatch, useCallback } from 'react'
import {
    useToggle,
    useFocus,
    useMoving,
    useWheel,
    useHotkeys,
    HotkeyEvent,
    clamp,
    useStateRef,
    swap,
} from '@nami-ui/utils'
import {
    patchValue,
    Value,
    ValueCollection,
    AbsoluteValuePatch,
    RelativeValuePatch,
    ValueCollectionPatch,
    ValueUpdater,
    ValueCollectionUpdater,
    Patch,
    Axis,
} from './patch-value'

// 下面是留待之后可能会实现的功能的类型定义：
// // 给 plane 模式使用的值类型
// // ---------------------------

// type SinglePlaneValue = {
//     x: number
//     y: number
// }

// type MultiPlaneValue = SinglePlaneValue[]

// type PlaneValue = SinglePlaneValue | MultiPlaneValue

// type PlaneValuePatch = ValueCollectionPatch | ValueCollectionUpdater

// // 其它辅助用的值类型
// // ---------------------------

// type SingleValue<T extends ValueCollection> = SingleLineValue | SingleSpaceValue<T>

// type MultiValue<T extends ValueCollection> = MultiLineValue | MultiSpaceValue<T>

// // Hook Props 类型
// // ---------------------------

// interface SingleValueHorizontalModeProps extends Axis {
//     mode: 'horizontal'
//     value: SingleLineValue
//     setValue: SetValue<SingleLineValue>
// }

// interface MultiValueHorizontalModeProps extends Axis {
//     mode: 'horizontal'
//     value: MultiLineValue
//     setValue: SetValue<MultiLineValue>
// }

// type HorizontalModeProps = MultiValueHorizontalModeProps | SingleValueHorizontalModeProps

// interface SingleValueVerticalModeProps extends Axis {
//     mode: 'vertical'
//     value: SingleLineValue
//     setValue: SetValue<SingleLineValue>
// }

// interface MultiValueVerticalModeProps extends Axis {
//     mode: 'vertical'
//     value: MultiLineValue
//     setValue: SetValue<MultiLineValue>
// }

// type VerticalModeProps = MultiValueVerticalModeProps | SingleValueVerticalModeProps

// interface SingleValuePlaneModeProps {
//     mode: 'plane'
//     value: SinglePlaneValue
//     setValue: SetValue<SinglePlaneValue>

//     /** x 轴定义 */
//     x: Axis

//     /** y 轴定义 */
//     y: Axis
// }

// interface MultiValuePlaneModeProps {
//     mode: 'plane'
//     value: MultiPlaneValue
//     setValue: SetValue<MultiPlaneValue>

//     /** x 轴定义 */
//     x: Axis

//     /** y 轴定义 */
//     y: Axis
// }

// type PlaneModeProps = MultiValuePlaneModeProps | SingleValuePlaneModeProps

// type SingleLineValue = number
// type SingleSpaceValue<T extends ValueCollection> = T

// interface SingleLineValueCustomModeProps extends BasicProps<SingleLineValue, LineValuePatch> {
//     axis?: Axis
// }

// interface SingleSpaceValueCustomModeProps<T extends ValueCollection>
//     extends BasicProps<SingleSpaceValue<T>, SpaceValuePatch> {
//     axis?: Axis | Record<keyof T, Axis>
// }

type SetValue<T> = Dispatch<(prevState: T) => T>

// 事件类型
// ---------------------------

/**
 * 指针移动事件信息
 */
interface MovingEvent {
    x: number
    y: number
    breakX: number
    breakY: number
    px: number
    py: number
    breakPX: number
    breakPY: number
    dirX: 'left' | 'right'
    dirY: 'up' | 'down'
    velocity: number
}

/**
 * 滚轮滚动事件信息
 */
interface WheelEvent {
    deltaX: number
    deltaY: number
    deltaZ: number
    altKey: boolean
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
}

/**
 * 快捷键按下事件信息
 */
// use HotkeyEvent

// 值类型
// ---------------------------

// 单个数值
type MultiLineValue = number[]
type LineValuePatch = AbsoluteValuePatch | RelativeValuePatch | ValueUpdater | undefined

// 多个数值
type MultiSpaceValue<T extends ValueCollection> = T[]
type SpaceValuePatch = ValueCollectionPatch | ValueCollectionUpdater | undefined

// Hook Props 类型
// ---------------------------

/** 快捷键 */
interface Hotkey<T extends Patch> {
    keys: string
    shift?: boolean
    ctrl?: boolean
    meta?: boolean
    alt?: boolean
    handle: (eventData: HotkeyEvent) => T | void
}

/** 基础属性 */
interface BasicProps<T, K extends Patch> {
    value: T
    setValue: SetValue<T>

    /** 是否禁用选择器 */
    disabled?: boolean

    /** 是否对值进行排序，并定制比较函数 */
    sort?: boolean | ((v1: T, v2: T) => number)

    /** 处理指针移动事件 */
    moving: (eventData: MovingEvent) => K

    /** 开启滚轮滚动支持，并进行相关配置 */
    wheel?: (eventData: WheelEvent) => K

    /** 开启快捷键支持，并进行相关配置 */
    hotkeys?: Hotkey<K>[]
}

interface MultiLineValueCustomModeProps extends BasicProps<MultiLineValue, LineValuePatch> {
    axis?: Axis
}

interface MultiSpaceValueCustomModeProps<T extends ValueCollection>
    extends BasicProps<MultiSpaceValue<T>, SpaceValuePatch> {
    axis?: Axis | Record<keyof T, Axis>
}

type Props<T extends ValueCollection> =
    | MultiLineValueCustomModeProps
    | MultiSpaceValueCustomModeProps<T>

// 内部规范化属性
// ---------------------------

interface NormalHotkey extends Omit<Hotkey<Patch>, 'handle'> {
    handle: (eventData: HotkeyEvent) => Patch
}

interface NormalProps {
    value: (Value | ValueCollection)[]
    setValue: SetValue<(Value | ValueCollection)[]>
    disabled: boolean
    axis: Axis | { [prop: string]: Axis }
    sort?: (v1: Value | ValueCollection, v2: Value | ValueCollection) => number
    moving: (eventData: MovingEvent) => Patch
    wheel?: (eventData: WheelEvent) => Patch
    hotkeys: NormalHotkey[]
}

// 返回值类型
// ---------------------------

/**
 * useSlider 返回的数据
 */
interface Slider {
    /** 需要注入到 slider 根元素上的属性 */
    rootProps: Record<string, unknown>

    /** 需要注入到轨道元素上的属性 */
    railProps: Record<string, unknown>

    /** 需要注入到滑块元素上的属性 */
    thumbProps: Record<string, unknown>

    /** 当前是否在滑动中 */
    sliding: boolean

    /** 当前 thumb 的索引 */
    thumb: number | undefined
}

interface MoveInfo {
    rail: {
        el: Element
        rect: DOMRect
    }

    thumbs: Element[]

    thumb: {
        el: Element
        index: number
    }

    start: {
        x: number
        y: number
        timeStamp: number
    }

    points: {
        x: number
        y: number
        timeStamp: number
    }[]
}

function compare(v1: number, v2: number) {
    return v1 - v2
}

function useNormalizeProps<T extends ValueCollection>(props: Props<T>): NormalProps {
    return {
        ...props,

        axis: props.axis ?? {
            min: 0,
            max: 1,
        },

        sort: props.sort === true ? compare : props.sort,
    } as NormalProps
}

function chooseThumb(thumbs: Element[], event: PointerEvent): [number, boolean] {
    // 首先看指针是否直接点在了某个滑块上
    let targetIsThumb = true
    let targetThumbIndex = thumbs.findIndex((thumb) => thumb.contains(event.target as Node))

    // 否则找到离指针最近的一个滑块
    if (targetThumbIndex === -1) {
        targetIsThumb = false
        targetThumbIndex = thumbs
            .map((thumb) => thumb.getBoundingClientRect())
            .map((rect) => ({
                top: rect.top + rect.width / 2,
                left: rect.left + rect.height / 2,
            }))
            .map(
                (center) =>
                    Math.abs(event.clientY - center.top) + Math.abs(event.clientX - center.left),
            )
            .reduce(
                (minIndex, distance, index, array) =>
                    distance <= array[minIndex] ? index : minIndex,
                0,
            )
    }

    return [targetThumbIndex, targetIsThumb]
}

function isEqual<T extends number | ValueCollection>(v1: T, v2: T): boolean {
    if (typeof v1 === 'number') {
        return v1 === v2
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in v1) {
        if (v1[key] !== v2[key]) {
            return false
        }
    }

    return true
}

export declare namespace useSlider {
    export { MovingEvent, WheelEvent, HotkeyEvent, Hotkey, Slider }
}

// eslint-disable-next-line import/export
export function useSlider<T extends ValueCollection>(props: Props<T>): Slider {
    const {
        disabled,
        setValue,
        axis,
        sort,
        moving: onMoving,
        wheel: onWheel,
        hotkeys: hotkeyConfigs,
    } = useNormalizeProps(props)

    const [sliding, startSlide, endSlide] = useToggle(false)
    const [currentThumbIndexRef, setCurrentThumbIndex] = useStateRef<number>(0)
    const railRef = useRef<HTMLElement>(null)
    const moveInfoRef = useRef<MoveInfo>()

    const updateIndex = useCallback(
        (value) => {
            if (!sort) {
                return
            }

            const index = currentThumbIndexRef.current

            let i = index

            while (i > 0 && sort(value[i], value[i - 1]) < 0) {
                swap(value, i, (i -= 1))
            }

            if (i === index) {
                while (i < value.length - 1 && sort(value[i], value[i + 1]) > 0) {
                    swap(value, i, (i += 1))
                }
            }

            if (i !== index) {
                setCurrentThumbIndex(i)
            }
        },
        [sort, currentThumbIndexRef, setCurrentThumbIndex], // NOTE currentThumbIndexRef and setCurrentThumbIndex is immobile
    )

    const updateValue = useCallback(
        (patch: Patch) => {
            if (disabled) {
                return
            }

            setValue((prevValue) => {
                const index = currentThumbIndexRef.current

                const prevItem = prevValue[index]

                const updater = patchValue(patch, axis)
                const item = updater(prevItem)

                if (isEqual(prevItem, item)) {
                    return prevValue
                }

                const value = [...prevValue]
                value[index] = item

                updateIndex(value)

                return value
            })
        },
        [axis, disabled, setValue, updateIndex, currentThumbIndexRef], // NOTE currentThumbIndexRef is immobile
    )

    function move(event: PointerEvent) {
        const info = moveInfoRef.current

        if (info === undefined) {
            return
        }

        const x = event.clientX - info.start.x - info.rail.rect.left
        const y = event.clientY - info.start.y - info.rail.rect.top
        const px = x / info.rail.rect.width
        const py = y / info.rail.rect.height
        const deltaX = event.clientX - info.points[0].x
        const deltaY = event.clientY - info.points[0].y

        const patch = onMoving({
            x: clamp(x, 0, info.rail.rect.width),
            y: clamp(y, 0, info.rail.rect.height),

            breakX: x,
            breakY: y,

            px: clamp(px, 0, 1),
            py: clamp(py, 0, 1),

            breakPX: px,
            breakPY: py,

            dirX: deltaX > 0 ? 'right' : 'left',
            dirY: deltaY > 0 ? 'up' : 'down',

            velocity:
                Math.sqrt(Math.abs(deltaX) ** 2 + Math.abs(deltaY) ** 2) /
                    (event.timeStamp - info.points[0].timeStamp) || 0,
        })

        updateValue(patch)
    }

    const focus = useFocus()

    const moving = useMoving({
        onStart(event) {
            const root = event.currentTarget as HTMLElement
            const rail = railRef.current

            if (!root) {
                // eslint-disable-next-line no-console
                console.warn('No slider root element was obtained.')
                return false
            }

            if (!rail) {
                // eslint-disable-next-line no-console
                console.warn('No rail element was obtained, pleace put `slide.railProps` to rail element.') // prettier-ignore
                return false
            }

            if (disabled) {
                return false
            }

            const thumbs = Array.from(root.querySelectorAll('[role=slider]'))

            if (thumbs.length === 0) {
                // eslint-disable-next-line no-console
                console.warn('No thumb element found.')
                return false
            }

            const [thumbIndex, isClickThumb] = chooseThumb(thumbs, event)
            const thumb = thumbs[thumbIndex]
            const thumbRect = thumb.getBoundingClientRect()

            moveInfoRef.current = {
                rail: {
                    el: rail,
                    rect: rail.getBoundingClientRect(),
                },

                thumbs,

                thumb: {
                    el: thumbs[thumbIndex],
                    index: thumbIndex,
                },

                start: {
                    x: !isClickThumb ? 0 : event.clientX - (thumbRect.left + thumbRect.width / 2),
                    y: !isClickThumb ? 0 : event.clientY - (thumbRect.top + thumbRect.height / 2),
                    timeStamp: event.timeStamp,
                },

                points: [{ x: event.clientX, y: event.clientY, timeStamp: event.timeStamp }],
            }

            startSlide()
            setCurrentThumbIndex(thumbIndex)

            return true
        },

        onMove(event) {
            if (disabled) {
                return
            }

            move(event)
        },

        onFinish(event) {
            if (!disabled) {
                move(event)
            }

            moveInfoRef.current = undefined
            endSlide()
        },
    })

    const wheel = useWheel(
        onWheel
            ? (event: WheelEvent) => {
                  if (sliding) {
                      return
                  }

                  if (!focus.focused) {
                      return
                  }

                  const { deltaX, deltaY, deltaZ, altKey, ctrlKey, metaKey, shiftKey } = event

                  const patch = onWheel({
                      deltaX,
                      deltaY,
                      deltaZ,
                      altKey,
                      ctrlKey,
                      metaKey,
                      shiftKey,
                  })

                  updateValue(patch)
              }
            : undefined,
    )

    const hotkeys = useHotkeys(
        useMemo(
            () =>
                hotkeyConfigs?.map((hotkey) => ({
                    ...hotkey,
                    handle(event: HotkeyEvent) {
                        if (sliding) {
                            return
                        }

                        if (!focus.focused) {
                            return
                        }

                        const patch = hotkey.handle(event)

                        updateValue(patch)
                    },
                })),
            [focus.focused, hotkeyConfigs, sliding, updateValue],
        ),
    )

    return {
        sliding,
        thumb: currentThumbIndexRef.current,
        rootProps: {
            ...moving.props,
            ...focus.props,
            ...wheel.props,
            ...hotkeys.props,
        },
        railProps: { ref: railRef },
        thumbProps: { role: 'slider' },
    }
}
