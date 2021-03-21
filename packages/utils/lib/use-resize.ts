import { useEffect } from 'react'
import { isHTMLElement, isWindow } from './is'
import { useValueRef } from './use-value-ref'

type ObserveCallback = () => void

type Observer = {
    observe: (el: Element, callback: ObserveCallback) => () => void
}

function createElementResizeObserver(): Observer {
    type ObserveCallbacksMap = Map<Element, Set<ObserveCallback>>

    // ResizeObserver 会在元素加入其中后，立即触发回调（我们可以将这种行为称之为”立即回调“），而在我们的这个 useResize 中，
    // 我们是希望默认不触发立即回调的。因为这样和 ”resize“ 这个名称的语义一致，而且也和 window 上的 resize 的默认行为保持一致。
    // 那么会了实现这一点，我们创建了下面这两个 map，新添加的监听，会先被放置到 waitMap 中，然后在其立即回调触发时，
    // 我们再将其移入到 activeMap 中；再之后因为元素 resize 而触发回调时，就会从 activeMap 中取回调函数进行调用了。
    const activeMap: ObserveCallbacksMap = new Map()
    const waitMap: ObserveCallbacksMap = new Map()

    // 下面这几个静态方法都是用来处理上面那两个 map 的

    function getAndEnsure(map: ObserveCallbacksMap, el: Element) {
        let cbset = map.get(el)

        if (!cbset) {
            cbset = new Set()
            map.set(el, cbset)
        }

        return cbset
    }

    function deleteAndClean(map: ObserveCallbacksMap, el: Element, callback: ObserveCallback) {
        const cbset = map.get(el)

        if (cbset) {
            cbset.delete(callback)

            if (cbset.size === 0) {
                map.delete(el)
            }
        }
    }

    function putOnWaitMap(el: Element, callback: ObserveCallback) {
        getAndEnsure(waitMap, el).add(callback)
    }

    function moveToMap(el: Element) {
        const waitCallbackSet = waitMap.get(el)

        if (waitCallbackSet) {
            const callbackSet = getAndEnsure(activeMap, el)

            for (const callback of waitCallbackSet) {
                callbackSet.add(callback)
                waitCallbackSet.delete(callback)
            }

            waitMap.delete(el)
        }
    }

    function runMapCallbacks(el: Element) {
        const activeCallbackSet = activeMap.get(el)

        if (activeCallbackSet) {
            for (const callback of activeCallbackSet) {
                callback()
            }
        }
    }

    function clean(el: Element, callback: ObserveCallback) {
        deleteAndClean(waitMap, el, callback)
        deleteAndClean(activeMap, el, callback)
    }

    const resizeObserver = new ResizeObserver((entries) => {
        for (const { target } of entries) {
            runMapCallbacks(target)
            moveToMap(target)
        }
    })

    return {
        observe(el, callback) {
            putOnWaitMap(el, callback)
            resizeObserver.observe(el)

            return () => {
                clean(el, callback)
                resizeObserver.unobserve(el)
            }
        },
    }
}

let elementResizeObserver: Observer

export function useResize(target: unknown, callback: () => void): void {
    const callbackRef = useValueRef(callback)

    useEffect(() => {
        if (!callbackRef.current) {
            return undefined
        }

        function handleResize() {
            callbackRef.current?.()
        }

        if (isWindow(target)) {
            target.addEventListener('resize', handleResize)

            return () => {
                target.removeEventListener('resize', handleResize)
            }
        }

        if (isHTMLElement(target)) {
            if (!elementResizeObserver) {
                elementResizeObserver = createElementResizeObserver()
            }

            return elementResizeObserver.observe(target, handleResize)
        }

        return undefined
    }, [callbackRef, target])
}
