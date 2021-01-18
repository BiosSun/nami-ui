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
        points = [...points, stepValue]
    }

    const diffs = points.map((point) => Math.abs(point - value))
    const point = points[diffs.indexOf(Math.min(...diffs))]

    return point
}
