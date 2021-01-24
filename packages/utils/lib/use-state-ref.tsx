import { Dispatch, MutableRefObject, useCallback, useRef, useState } from 'react'

export function useStateRef<S>(initialState: S | (() => S)): [MutableRefObject<S>, Dispatch<S>] {
    const [state, setState] = useState(initialState)
    const ref = useRef<S>(state)

    ref.current = state

    const setStateAgent = useCallback((value: S) => {
        ref.current = value
        setState(value)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return [ref, setStateAgent]
}
