import { useState, Dispatch, SetStateAction } from 'react'

/**
 * 用于构建同时支持受控及非受控状态的组件，当该勾子在所在组件中第一次被调用时，
 * 将根据 `value` 及 `defaultValue` 的值判断该组件的受控状态——若此时 `value` 的值不为 `null` 及 `undefined`，
 * 则为受控状态，该勾子之后将一直沿用 `value` 的值，否则为非受控状态，沿用 `defaultValue` 的值。
 *
 * 该勾子返回一个元组——`[value, setValue, isControlled]`，若当前为受控状态，则 `value` 与参数 `value` 相同，
 * 且 `setValue` 方法就只是一个空方法，而若为非受控状态，则 `value` 是由勾子内部维护的一个状态值，其默认为 `defaultValue` 的值，
 * 且只能通过勾子所返回的 `setValue` 来改变它。
 *
 * 当勾子在所在组件中第一次被调用时，受控状态将被确定，并保持不变。
 *
 * @param value 受控值
 * @param defaultValue 非受控默认值
 * @param initialValue 默认值，若 `defaultValue` 为 null 或 undefined，则返回该默认值
 *
 * @example
 * function MyComponent({ value, default, onChange }) {
 *     const [val, setVal, controlled] = useValue(value, defaultValue, '')
 *
 *     function handleChange(event) {
 *         const val = event.target.value
 *
 *         if (!controlled) {
 *             setVal(val)
 *         }
 *
 *         onChange(val)
 *     }
 *
 *     return (<input value={val} onChange={handleChange} />)
 * }
 */
export function useValue<T>(
    value: T,
    defaultValue: T,
    initialValue: Exclude<T, undefined>,
): [Exclude<T, undefined>, Dispatch<SetStateAction<Exclude<T, undefined>>>, boolean] {
    // 检测是否同时提供了 value 和 defaultValue
    if (__DEV__) {
        if (value !== undefined && defaultValue !== undefined) {
            console.error('[useValue] 组件不能同处于受控状态及非受控状态')
        }
    }

    // 是否处于受控状态
    const [controlled] = useState(value !== undefined)

    if (controlled) {
        return [
            value !== undefined ? value as Exclude<T, undefined> : initialValue,
            function setValue() {
                if (__DEV__) {
                    console.error('在受控状态下，组件内不应该调用 setValue 以自行改变 value。')
                }

                // noop
            },
            controlled,
        ]
    } else {
        // NOTE 虽说不能在分支或循环语句内调用 useState，但这里的分支条件将保持不变，
        //      因此可以放心使用。
        const [value, setValue] = useState(defaultValue !== undefined ? defaultValue as Exclude<T, undefined> : initialValue)
        return [value, setValue, controlled]
    }
}
