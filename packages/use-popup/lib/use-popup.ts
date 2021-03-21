import { CSSProperties, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import { useResize } from '@nami-ui/utils'
import { position, RectAnchor, PopupElement, TargetElement } from './position'

interface UsePopupState {
    popupProps: {
        style: CSSProperties
    }
}

interface UsePopupResult extends UsePopupState {
    refresh: () => void
    lazyRefresh: () => void
}

const DEFAULT_STATE: UsePopupState = {
    popupProps: {
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 'auto',
            right: 'auto',
            transform: undefined,
        },
    },
}

export default function usePopup(
    el: PopupElement | undefined | null,
    of: TargetElement | undefined | null,
    my: RectAnchor,
    at: RectAnchor,
): UsePopupResult {
    const [state, setState] = useState<UsePopupState>(DEFAULT_STATE)

    function refresh() {
        if (!el || !of) {
            setState(DEFAULT_STATE)
            return
        }

        const { top, left } = position(el, of, my, at)

        setState({
            popupProps: {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 'auto',
                    right: 'auto',
                    transform: `translate3d(${left}px, ${top}px, 0)`,
                },
            },
        })
    }

    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    function lazyRefresh() {
        if (timerRef.current) {
            return
        }

        timerRef.current = setTimeout(() => {
            refresh()
            timerRef.current = undefined
        })
    }

    useIsomorphicLayoutEffect(refresh, [el, of, ...my, ...at])

    useResize(el, lazyRefresh)
    useResize(of, lazyRefresh)
    useResize(window, lazyRefresh)

    return { ...state, refresh, lazyRefresh }
}
