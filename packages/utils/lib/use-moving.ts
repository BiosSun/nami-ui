import { useCallback, useLayoutEffect, useRef } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { useValueRef } from './use-value-ref'
import { setStyle, RestoreStyle } from './set-style'

export function useMoving(listeners: {
    onStart(event: PointerEvent): boolean | void
    onMove(event: PointerEvent): void
    onFinish(event: PointerEvent): void
}) {
    const listenersRef = useValueRef(listeners)
    const restoreUserSelectRef = useRef<RestoreStyle>()

    const start = useCallback((event: PointerEvent) => {
        if (listenersRef.current.onStart(event) !== false) {
            restoreUserSelectRef.current = setStyle(document.body, 'user-select', 'none')
            bindMoving()
        }
    }, [])

    const move = useCallback((event: PointerEvent) => {
        unstable_batchedUpdates(() => {
            listenersRef.current.onMove(event)
        })
    }, [])

    const finish = useCallback((event: PointerEvent) => {
        unbindMoving()
        restoreUserSelectRef.current!()
        unstable_batchedUpdates(() => {
            listenersRef.current.onFinish(event)
        })
    }, [])

    const bindMoving = useCallback(() => {
        document.addEventListener('pointermove', move, { passive: false })
        document.addEventListener('pointercancel', finish)
        document.addEventListener('pointerup', finish)
    }, [])

    const unbindMoving = useCallback(() => {
        document.removeEventListener('pointermove', move)
        document.removeEventListener('pointercancel', finish)
        document.removeEventListener('pointerup', finish)
    }, [])

    useLayoutEffect(() => {
        return unbindMoving
    }, [])

    return { props: { onPointerDown: start } }
}
