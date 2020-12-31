import { useCallback, useLayoutEffect } from 'react'
import { useValueRef } from './use-value-ref'

export function useMoving(listeners: {
    onStart(event: PointerEvent): boolean | void
    onMove(event: PointerEvent): void
    onFinish(event: PointerEvent): void
}) {
    const listenersRef = useValueRef(listeners)

    const start = useCallback((event: PointerEvent) => {
        if (listenersRef.current.onStart(event) !== false) {
            bindMoving()
        }
    }, [])

    const move = useCallback((event: PointerEvent) => {
        listenersRef.current.onMove(event)
    }, [])

    const finish = useCallback((event: PointerEvent) => {
        unbindMoving()
        listenersRef.current.onFinish(event)
    }, [])

    const bindMoving = useCallback(() => {
        document.addEventListener('pointermove', move, { passive: true })
        document.addEventListener('pointercancel', finish, false)
        document.addEventListener('pointerup', finish, false)
    }, [])

    const unbindMoving = useCallback(() => {
        document.removeEventListener('pointermove', move)
        document.removeEventListener('pointercancel', finish, false)
        document.removeEventListener('pointerup', finish, false)
    }, [])

    useLayoutEffect(() => {
        return unbindMoving
    }, [])

    return { props: { onPointerDown: start } }
}
