export function toFixed(value: number, precision: number): number {
    const p = 10 ** precision
    return Math.round(value * p) / p
}
