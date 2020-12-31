import { useCallback } from 'react'
import { useValueRef } from './use-value-ref'

/**
 * 在目标元素上追加鼠标滚轮事件
 */
export function useWheel(listener?: (event: WheelEvent) => void) {
    const listenerRef = useValueRef(listener)

    const onWheel = useCallback((event: WheelEvent) => {
        listenerRef.current?.(event)
    }, [])

    return {
        props: {
            onWheel: listener ? onWheel : undefined,
        },
    }
}
