import { RefObject } from 'react'

export function isRef<T>(obj: unknown): obj is RefObject<T> {
    return typeof obj === 'object' && obj !== null && 'current' in obj
}
