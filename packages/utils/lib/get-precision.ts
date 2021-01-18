const { isInteger } = Number

/**
 * 获取一个有限数值中小数部分的位数
 */
export function getPrecision(value: number): number {
    let precision = 0

    while (isInteger(value) === false) {
        precision++
        value *= 10
    }

    return precision
}