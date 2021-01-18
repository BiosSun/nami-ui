import clsx from 'clsx'

type BoxedTupleTypes<T extends any[]> = { [P in keyof T]: [T[P]] }[Exclude<keyof T, keyof any[]>]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never

type UnboxIntersection<T> = T extends { 0: infer U } ? U : never

const R_EVENT_PROP_PREFIX = /^on[A-Z]/

export function mergeProps<T, S extends any[]>(
    firstProps: T,
    ...otherPropsSet: S
): T & UnboxIntersection<UnionToIntersection<BoxedTupleTypes<S>>> {
    const result = { ...firstProps } as any

    for (const props of otherPropsSet) {
        for (const key in props) {
            // no't in result
            if (result[key] === undefined) {
                result[key] = props[key]
            }
            // className
            else if (key === 'className') {
                result[key] = clsx(result[key], props[key])
            }
            // style
            else if (
                key === 'style' &&
                typeof result.style === 'object' &&
                typeof props.style === 'object'
            ) {
                Object.assign({}, result.style, props.style)
            }
            // event callback
            else if (
                R_EVENT_PROP_PREFIX.test(key) &&
                typeof result[key] === 'function' &&
                typeof props[key] === 'function'
            ) {
                result[key] = chainCallback(result[key], props[key])
            }
            // override
            else if (props[key] !== undefined) {
                result[key] = props[key]
            }
        }
    }

    return result
}

function chainCallback<T>(c1: T, c2: T): T {
    return ((...args: any[]) => {
        ;(c1 as any)(...args)
        ;(c2 as any)(...args)
    }) as any
}
