import React, { ComponentType, CSSProperties, HTMLAttributes, ReactElement, useMemo } from 'react'
import clsx from 'clsx'
import { useValue, noop, toFixed, getPrecision, mergeProps } from '@nami-ui/utils'
import { useSlider } from '@nami-ui/use-slider'

import './slider.scss'

type Value = number | number[]

type InnerValueChanger = (prevValue: number[]) => number[]

export interface SliderLabelProps {
    value: number
    active: boolean
    className?: string
}

export type SliderLabel = ComponentType<SliderLabelProps>

export interface SliderProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange'> {
    /** 每个滑块对应的值 */
    value?: number | number[]

    /** 默认每个滑块对应的值 */
    defaultValue?: number | number[]

    /** 选中状态改变事件 */
    onChange?: (value: number | number[]) => void

    /** 禁用 */
    disabled?: boolean

    /** 是否显示为垂直方向 */
    vertical: boolean

    /** 是否反方向显示 */
    reverse: boolean

    /** 最小值 */
    min?: number

    /** 最大值 */
    max?: number

    /** 步进 */
    step?: number

    /** 标记点 */
    points?: number[]

    /** 是否显示 step 及 points 对应的点位标记 */
    marks: boolean | 'step' | 'points'

    /** 是否显示所选区间 */
    range: boolean

    /** 定制 point 点位下的标签 */
    pointMarkLabel?: SliderLabel
}

function DefaultPointLabel({ value, active, ...otherProps }: SliderLabelProps) {
    return <span {...otherProps}>{value}</span>
}

export function Slider({
    value,
    defaultValue,
    onChange = noop,
    disabled = false,
    vertical,
    reverse,
    min = 0,
    max = 1,
    step,
    points,
    marks,
    range,
    pointMarkLabel = DefaultPointLabel,
    ...otherProps
}: SliderProps): ReactElement {
    const [val, setVal, controlled] = useValue(value, defaultValue, [0])

    const len = max - min
    const stepPrecision = useMemo(() => (step ? getPrecision(step) : 0), [step])

    const isSingle = typeof val === 'number'
    const values = isSingle ? [val as number] : (val as number[])

    function getChangedValue(changer: InnerValueChanger, prevValue: Value) {
        return isSingle ? changer([prevValue as number])[0] : changer(prevValue as number[])
    }

    function handleChange(changer: InnerValueChanger) {
        if (controlled) {
            const updatedVal = getChangedValue(changer, val)
            if (updatedVal !== val) {
                onChange(updatedVal)
            }
        } else {
            setVal((prevValue) => getChangedValue(changer, prevValue))
        }
    }

    const [onMoving, getPosition, getEndPosition] = useMemo<
        [
            (info: useSlider.MovingEvent) => number,
            (value: number) => CSSProperties,
            (value: number) => CSSProperties,
        ]
    >(() => {
        if (vertical) {
            if (reverse) {
                return [
                    (i) => len * i.py + min,
                    (v) => ({ top: `${((v - min) / len) * 100}%` }),
                    (v) => ({ bottom: `${(1 - (v - min) / len) * 100}%` }),
                ]
            }

            return [
                (info) => len * (1 - info.py) + min,
                (v) => ({ bottom: `${((v - min) / len) * 100}%` }),
                (v) => ({ top: `${(1 - (v - min) / len) * 100}%` }),
            ]
        }

        if (reverse) {
            return [
                (info) => len * (1 - info.px) + min,
                (v) => ({ right: `${((v - min) / len) * 100}%` }),
                (v) => ({ left: `${(1 - (v - min) / len) * 100}%` }),
            ]
        }

        return [
            (info) => len * info.px + min,
            (v) => ({ left: `${((v - min) / len) * 100}%` }),
            (v) => ({ right: `${(1 - (v - min) / len) * 100}%` }),
        ]
    }, [min, len, vertical, reverse])

    const slider = useSlider({
        value: values,
        setValue: handleChange,
        disabled,
        axis: { min, max, step, points },
        moving: onMoving,
    })

    const stepMarks = useMemo(() => {
        if (!(step && (marks === true || marks === 'step'))) {
            return undefined
        }

        const els = []

        for (let i = 0, l = Math.floor(len / step); i <= l; i++) {
            const markValue = toFixed(min + i * step, stepPrecision)
            els.push(
                <div
                    key={i}
                    className={clsx('nami-slider__mark', 'nami-slider__step-mark')}
                    style={getPosition(markValue)}
                />,
            )
        }

        return els
    }, [step, marks, len, min, stepPrecision, getPosition])

    const pointMarks = useMemo(() => {
        if (!(points && (marks === true || marks === 'points'))) {
            return undefined
        }

        const PointMarkLabel = pointMarkLabel
        const els = []

        for (let i = 0; i < points.length; i++) {
            els.push(
                <div
                    key={i}
                    className={clsx('nami-slider__mark', 'nami-slider__point-mark')}
                    style={getPosition(points[i])}
                >
                    <PointMarkLabel value={points[i]} active={false} />
                </div>,
            )
        }

        return els
    }, [points, marks, pointMarkLabel, getPosition])

    const className = clsx('nami-slider', {
        'nami-slider--disabled': disabled,
        'nami-slider--vertical': vertical,
        'nami-slider--reverse': reverse,
    })

    return (
        <div {...mergeProps({ className }, otherProps, slider.rootProps)}>
            <div className="nami-slider__track" />
            <div className="nami-slider__rail" {...slider.railProps}>
                {stepMarks}
                {range && values.length <= 2 ? (
                    <div
                        className="nami-slider__range"
                        style={
                            values.length === 1
                                ? getEndPosition(values[0])
                                : {
                                      ...getPosition(values[0]),
                                      ...getEndPosition(values[values.length - 1]),
                                  }
                        }
                    />
                ) : null}
                {pointMarks}
                {values.map((v, i) => (
                    <div
                        key={i}
                        className={clsx('nami-slider__thumb', {
                            'nami-slider__thumb--active': slider.thumb === i,
                        })}
                        style={getPosition(v)}
                        {...slider.thumbProps}
                    />
                ))}
            </div>
        </div>
    )
}
