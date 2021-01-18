import { getPrecision } from './get-precision'
import { toFixed } from './to-fixed'

/**
 * @example
 *
 * shiftPoint(0.2, '+0.1') // => 0.3
 * shiftPoint(0.2, '-0.1') // => 0.1
 */
export function shiftPoint(value: number, offsetDescriptor: string): number {
    const offset = parseFloat(offsetDescriptor)
    return toFixed(value + offset, getPrecision(offset))
}
