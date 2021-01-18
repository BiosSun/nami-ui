import { useCallback, useState } from 'react'

interface UseFocusProps {
    tabIndex?: number
}

export function useFocus(props: UseFocusProps = {}) {
    const [focused, setFocused] = useState(false)

    const onFocus = useCallback(() => {
        setFocused(true)
    }, [])

    const onBlur = useCallback(() => {
        setFocused(false)
    }, [])

    return {
        focused,
        props: { onFocus, onBlur, tabIndex: props.tabIndex ?? 0 },
    }
}
