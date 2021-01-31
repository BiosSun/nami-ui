/* eslint-disable no-param-reassign */
import { toFixed } from './to-fixed'
import { getPrecision } from './get-precision'

/** 数轴 */
export interface Axis {
    /** 最小值，默认为 0 */
    min: number

    /** 最大值，默认为 1 */
    max: number

    /** 步长 */
    step?: number

    /** 标记点 */
    points?: number[]
}

export function getClosestPoint(value: number, { min, max, step, points }: Axis): number {
    if (value < min) {
        return min
    }

    if (value > max) {
        return max
    }

    let stepValue: number = value

    if (step) {
        const len = value - min
        const mult = Math.round(len / step)

        stepValue = toFixed(min + mult * step, getPrecision(step))
    }

    if (points === undefined || points.length === 0) {
        return stepValue
    }

    if (step) {
        // eslint-disable-next-line no-param-reassign
        points = [...points, stepValue]
    }

    const diffs = points.map((point) => Math.abs(point - value))
    const point = points[diffs.indexOf(Math.min(...diffs))]

    return point
}

export function getNextPoint(value: number, { min, max, step, points }: Axis): number {
    const len = max - min
    const hasStep = step !== undefined
    const hasPoints = !!(points && points.length)

    if (!hasStep && !hasPoints) {
        if (value < min) {
            return min
        }

        if (value >= max) {
            return value
        }

        const incr = len / 100
        const prec = Math.max(getPrecision(max) + 2, getPrecision(min) + 2, getPrecision(value))

        return Math.min(toFixed(value + incr, prec), max)
    }

    const results = []

    if (hasStep) {
        const prec = getPrecision(step!)
        results.push(
            value < min
                ? min
                : toFixed(value + step! - ((value - min + 0.0000000000001) % step!), prec), // NOTE fix ( 0.15 % 0.05 ) => 0.049999999999999
        )
    }

    if (hasPoints) {
        const nextPoints = points!.filter((point) => point > value)
        const diffs = nextPoints.map((point) => point - value)
        results.push(nextPoints[diffs.indexOf(Math.min(...diffs))] ?? Infinity)
    }

    const result = Math.min(...results)
    return result <= max ? result : value
}

export function getPrevPoint(value: number, { min, max, step, points }: Axis): number {
    const len = max - min
    const dist = Math.abs(value - min) + 0.0000000000001
    const hasStep = step !== undefined
    const hasPoints = !!(points && points.length)

    if (!hasStep && !hasPoints) {
        if (value > max) {
            return max
        }

        if (value <= min) {
            return value
        }

        const decr = len / 100
        const prec = Math.max(getPrecision(max) + 2, getPrecision(min) + 2, getPrecision(value))

        return Math.max(toFixed(value - decr, prec), min)
    }

    const results = []

    if (hasStep) {
        const prec = getPrecision(step!)
        results.push(
            value > max ? max : toFixed(value - (toFixed(dist % step!, prec) || step!), prec),
        )
    }

    if (hasPoints) {
        const nextPoints = points!.filter((point) => point < value)
        const diffs = nextPoints.map((point) => point - value)
        results.push(nextPoints[diffs.indexOf(Math.max(...diffs))] ?? -Infinity)
    }

    const result = Math.max(...results)
    return result >= min ? result : value
}
