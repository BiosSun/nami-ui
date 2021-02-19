/* eslint-disable react/jsx-key */
import { useState } from 'react'
import clsx from 'clsx'
import { HStack, VStack } from '@nami-ui/stack'

import { useSlider } from '../lib'

import styles from './use-slider.module.scss'

export default {
    title: 'useSlider',
}

export function DebugSingle() {
    const [values, setValues] = useState(() => [0, 1])

    const min = 0
    const max = 1
    const step = 0.03
    const points = [0.22, 0.48]

    const [disabled, setDisabled] = useState(false)

    function addItem() {
        setValues([...values, Math.random()])
    }

    function removeItem() {
        if (values.length === 1) {
            return
        }

        const newValues = [...values]
        newValues.pop()
        setValues(newValues)
    }

    function toggleDisabled() {
        setDisabled(!disabled)
    }

    const [moveEventData, setMoveEventData] = useState<useSlider.MovingEvent>()
    const [wheelEventData, setWheelEventData] = useState<useSlider.WheelEvent>()
    const [keyEventData, setKeyEventData] = useState<useSlider.HotkeyEvent>()

    const slide = useSlider({
        value: values,
        setValue: setValues,

        disabled,

        axis: {
            min,
            max,
            step,
            points,
        },

        sort: true,

        moving(info: useSlider.MovingEvent) {
            setMoveEventData(info)
            return info.px
        },

        wheel(info: useSlider.WheelEvent) {
            setWheelEventData(info)
            return info.deltaY > 0 ? 'next' : info.deltaY < 0 ? 'prev' : undefined
        },

        hotkeys: [
            {
                keys: 'left, a, h',
                shift: true,
                handle: ({ shift }) => `-${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: 'right, d, l',
                shift: true,
                handle: ({ shift }) => `+${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
                shift: true,
                handle: ({ key }) => parseInt(key, 10) / 10,
            },
            {
                keys: 'ANY',
                handle: (eventData) => {
                    if (eventData.dispatched) {
                        eventData.stopPropagation()
                        eventData.preventDefault()
                    }

                    setKeyEventData(eventData)
                },
            },
        ],
    })

    return (
        <HStack spacing="huge">
            <VStack spacing="huge">
                <div
                    {...slide.rootProps}
                    className={clsx(styles.lineDebugSlider, {
                        [styles.grabbing]: slide.sliding,
                        [styles.disabled]: disabled,
                    })}
                >
                    <div className={styles.rail} {...slide.railProps}>
                        {values.map((value, index) => (
                            <div
                                {...slide.thumbProps}
                                key={index}
                                className={styles.thumb}
                                style={{
                                    background:
                                        slide.sliding && slide.thumb === index
                                            ? 'rgba(0, 0, 0, .4)'
                                            : '',
                                    left: `${value * 100}%`,
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button type="button" onClick={addItem}>
                        Add Item
                    </button>
                    <button type="button" onClick={removeItem}>
                        Remove Item
                    </button>
                    <button type="button" onClick={toggleDisabled}>
                        Toggle Disabled
                    </button>
                </div>
            </VStack>
            <div $flex className={styles.note}>
                positions: {JSON.stringify(values, null, 4)}
                <br />
                <hr />
                sliding: {slide.sliding ? 'true' : 'false'}
                <br />
                thumb: {slide.thumb ?? '-'}
                <br />
                disabled: {disabled ? 'true' : 'false'}
                <br />
                <hr />
                move event:
                <br />
                {JSON.stringify(moveEventData, null, 4)}
                <hr />
                wheel event:
                <br />
                {JSON.stringify(wheelEventData, null, 4)}
                <hr />
                hotkey event:
                <br />
                {JSON.stringify(keyEventData, null, 4)}
            </div>
        </HStack>
    )
}

export function DebugSpace() {
    type Position = {
        x: number
        y: number
    }

    const [positions, setPositions] = useState<Position[]>(() => [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
    ])

    const min = 0
    const max = 1
    const step = 0.05
    // const points = [0.22, 0.48]

    const [disabled, setDisabled] = useState(false)

    function addItem() {
        setPositions([...positions, { x: Math.random(), y: Math.random() }])
    }

    function removeItem() {
        if (positions.length === 1) {
            return
        }

        const newPosition = [...positions]
        newPosition.pop()
        setPositions(newPosition)
    }

    function toggleDisabled() {
        setDisabled(!disabled)
    }

    const [moveEventData, setMoveEventData] = useState<useSlider.MovingEvent>()
    const [wheelEventData, setWheelEventData] = useState<useSlider.WheelEvent>()
    const [keyEventData, setKeyEventData] = useState<useSlider.HotkeyEvent>()

    const slide = useSlider({
        value: positions,
        setValue: setPositions,

        disabled,

        axis: {
            min,
            max,
            step,
            // points,
        },

        moving(info: useSlider.MovingEvent) {
            setMoveEventData(info)
            return { x: info.px, y: info.py }
        },

        wheel(info: useSlider.WheelEvent) {
            setWheelEventData(info)

            const patch = {
                x: info.deltaX > 0 ? '+0.02' : info.deltaX < 0 ? '-0.02' : undefined,
                y: info.deltaY > 0 ? '+0.02' : info.deltaY < 0 ? '-0.02' : undefined,
            }

            return patch
        },

        hotkeys: [
            {
                keys: 'up, w, k',
                shift: true,
                handle: ({ shift }) => ({ y: `-${shift ? '0.1' : '0.01'}` }),
            },
            {
                keys: 'left, a, h',
                shift: true,
                handle: ({ shift }) => ({ x: `-${shift ? '0.1' : '0.01'}` }),
            },
            {
                keys: 'down, s, j',
                shift: true,
                handle: ({ shift }) => ({ y: `+${shift ? '0.1' : '0.01'}` }),
            },
            {
                keys: 'right, d, l',
                shift: true,
                handle: ({ shift }) => ({ x: `+${shift ? '0.1' : '0.01'}` }),
            },
            {
                keys: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
                shift: true,
                handle: ({ key, shift }) => {
                    const offset = parseInt(key, 10) / 10
                    return shift ? { x: offset } : { y: offset }
                },
            },
            {
                keys: 'ANY',
                handle: (eventData) => {
                    if (eventData.dispatched) {
                        eventData.stopPropagation()
                        eventData.preventDefault()
                    }

                    setKeyEventData(eventData)
                },
            },
        ],
    })

    return (
        <HStack spacing="huge">
            <VStack spacing="huge">
                <div
                    {...slide.rootProps}
                    className={clsx(styles.spaceDebugSlider, {
                        [styles.grabbing]: slide.sliding,
                        [styles.disabled]: disabled,
                    })}
                >
                    <div className={styles.rail} {...slide.railProps}>
                        {positions.map((position, index) => (
                            <div
                                {...slide.thumbProps}
                                key={index}
                                className={styles.thumb}
                                style={{
                                    background:
                                        slide.sliding && slide.thumb === index
                                            ? 'rgba(0, 0, 0, .4)'
                                            : '',
                                    left: `${position.x * 100}%`,
                                    top: `${position.y * 100}%`,
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button type="button" onClick={addItem}>
                        Add Item
                    </button>
                    <button type="button" onClick={removeItem}>
                        Remove Item
                    </button>
                    <button type="button" onClick={toggleDisabled}>
                        Toggle Disabled
                    </button>
                </div>
            </VStack>
            <div $flex className={styles.note}>
                positions: {JSON.stringify(positions, null, 4)}
                <br />
                <hr />
                sliding: {slide.sliding ? 'true' : 'false'}
                <br />
                thumb: {slide.thumb ?? '-'}
                <br />
                disabled: {disabled ? 'true' : 'false'}
                <br />
                <hr />
                move event:
                <br />
                {JSON.stringify(moveEventData, null, 4)}
                <hr />
                wheel event:
                <br />
                {JSON.stringify(wheelEventData, null, 4)}
                <hr />
                hotkey event:
                <br />
                {JSON.stringify(keyEventData, null, 4)}
            </div>
        </HStack>
    )
}

export function Horizontal() {
    const [values, setValues] = useState(() => [0, 1])

    const slide = useSlider({
        value: values,
        setValue: setValues,

        moving(info: useSlider.MovingEvent) {
            return info.px
        },

        wheel(info: useSlider.WheelEvent) {
            return info.deltaY > 0 ? '+0.02' : info.deltaY < 0 ? '-0.02' : undefined
        },

        hotkeys: [
            {
                keys: 'left, a, h',
                shift: true,
                handle: ({ shift }) => `-${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: 'right, d, l',
                shift: true,
                handle: ({ shift }) => `+${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
                shift: true,
                handle: ({ key }) => parseInt(key, 10) / 10,
            },
            {
                keys: 'ANY',
                handle: (eventData) => {
                    if (eventData.dispatched) {
                        eventData.stopPropagation()
                        eventData.preventDefault()
                    }
                },
            },
        ],
    })

    return (
        <HStack spacing="huge">
            <div
                {...slide.rootProps}
                className={clsx(styles.lineDebugSlider, {
                    [styles.grabbing]: slide.sliding,
                })}
            >
                <div className={styles.rail} {...slide.railProps}>
                    {values.map((value, index) => (
                        <div
                            {...slide.thumbProps}
                            key={index}
                            className={styles.thumb}
                            style={{
                                background:
                                    slide.sliding && slide.thumb === index
                                        ? 'rgba(0, 0, 0, .4)'
                                        : '',
                                left: `${value * 100}%`,
                            }}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div $flex className={styles.note}>
                positions: {JSON.stringify(values, null, 4)}
                <br />
                <hr />
                sliding: {slide.sliding ? 'true' : 'false'}
                <br />
                thumb: {slide.thumb ?? '-'}
            </div>
        </HStack>
    )
}

export function Vertical() {
    const [values, setValues] = useState(() => [0, 1])

    const slide = useSlider({
        value: values,
        setValue: setValues,

        moving(info: useSlider.MovingEvent) {
            return 1 - info.py
        },

        wheel(info: useSlider.WheelEvent) {
            return info.deltaY > 0 ? '+0.02' : info.deltaY < 0 ? '-0.02' : undefined
        },

        hotkeys: [
            {
                keys: 'down, s, j',
                shift: true,
                handle: ({ shift }) => `-${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: 'up, w, k',
                shift: true,
                handle: ({ shift }) => `+${shift ? '0.1' : '0.01'}`,
            },
            {
                keys: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9',
                shift: true,
                handle: ({ key }) => parseInt(key, 10) / 10,
            },
            {
                keys: 'ANY',
                handle: (eventData) => {
                    if (eventData.dispatched) {
                        eventData.stopPropagation()
                        eventData.preventDefault()
                    }
                },
            },
        ],
    })

    return (
        <HStack spacing="huge">
            <div
                {...slide.rootProps}
                className={clsx(styles.verticalSlider, {
                    [styles.grabbing]: slide.sliding,
                })}
            >
                <div className={styles.rail} {...slide.railProps}>
                    {values.map((value, index) => (
                        <div
                            {...slide.thumbProps}
                            key={index}
                            className={styles.thumb}
                            style={{
                                background:
                                    slide.sliding && slide.thumb === index
                                        ? 'rgba(0, 0, 0, .4)'
                                        : '',
                                top: `${(1 - value) * 100}%`,
                            }}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div $flex className={styles.note}>
                positions: {JSON.stringify(values, null, 4)}
                <br />
                <hr />
                sliding: {slide.sliding ? 'true' : 'false'}
                <br />
                thumb: {slide.thumb ?? '-'}
            </div>
        </HStack>
    )
}

export function Circle() {
    const [values, setValues] = useState(() => [0, Math.PI, Math.PI * 2])
    const [info, setInfo] = useState({ x: 0, y: 0.5, r: 0, r_360: 0 })

    const slide = useSlider({
        value: values,
        setValue: setValues,

        axis: {
            min: 0,
            max: Math.PI * 2,
        },

        moving({ px, py }: useSlider.MovingEvent) {
            const x = px - 0.5
            const y = 0.5 - py
            const DPI = Math.PI * 2
            const atan2 = Math.atan2(x, y)
            const r = (DPI + atan2) % DPI

            setInfo({
                x,
                y,
                r,
                r_360: Math.round((r / (2 * Math.PI)) * 360),
            })

            return r
        },

        wheel(info: useSlider.WheelEvent) {
            return info.deltaY > 0 ? '+0.1' : info.deltaY < 0 ? '-0.1' : undefined
        },

        hotkeys: [
            {
                keys: 'left, a, h',
                shift: true,
                handle: ({ shift }) => `-${shift ? '0.4' : '0.1'}`,
            },
            {
                keys: 'right, d, l',
                shift: true,
                handle: ({ shift }) => `+${shift ? '0.4' : '0.1'}`,
            },
            {
                keys: 'ANY',
                handle: (eventData) => {
                    if (eventData.dispatched) {
                        eventData.stopPropagation()
                        eventData.preventDefault()
                    }
                },
            },
        ],
    })

    return (
        <HStack spacing="huge">
            <div
                {...slide.rootProps}
                className={clsx(styles.circleSlider, {
                    [styles.grabbing]: slide.sliding,
                })}
            >
                <div className={styles.rail} {...slide.railProps}>
                    {values.map((value, index) => (
                        <div
                            {...slide.thumbProps}
                            key={index}
                            className={styles.thumb}
                            style={{
                                background:
                                    slide.sliding && slide.thumb === index
                                        ? 'rgba(0, 0, 0, .4)'
                                        : '',
                                top: `${(0.5 - Math.cos(value) / 2) * 100}%`,
                                left: `${(0.5 + Math.sin(value) / 2) * 100}%`,
                            }}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div $flex className={styles.note}>
                positions: {JSON.stringify(values, null, 4)}
                <br />
                <hr />
                sliding: {slide.sliding ? 'true' : 'false'}
                <br />
                thumb: {slide.thumb ?? '-'}
                <hr />
                info: {JSON.stringify(info, null, 4)}
            </div>
        </HStack>
    )
}
