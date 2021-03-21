export function cartesianProduct<T, K>(a: T[], b: K[]): [T, K][] {
    const result = [] as [T, K][]
    a.forEach((x) => b.forEach((y) => result.push([x, y])))
    return result
}
