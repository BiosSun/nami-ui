/* eslint-disable no-param-reassign */
export function swap<S>(array: S[], i1: number, i2: number): void {
    const tmp = array[i1]
    array[i1] = array[i2]
    array[i2] = tmp
}
