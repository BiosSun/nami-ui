import { useRef, MutableRefObject } from 'react'

export function useValueRef<T>(value: T): MutableRefObject<T> {
    const ref = useRef<T>(value)
    ref.current = value
    return ref
}
