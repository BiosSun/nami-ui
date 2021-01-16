import { useCallback, useMemo, useRef } from 'react'

const CODE_MAPS: { [code: string]: string } = {
    KeyA: 'a',
    KeyB: 'b',
    KeyC: 'c',
    KeyD: 'd',
    KeyE: 'e',
    KeyF: 'f',
    KeyG: 'g',
    KeyH: 'h',
    KeyI: 'i',
    KeyJ: 'j',
    KeyK: 'k',
    KeyL: 'l',
    KeyM: 'm',
    KeyN: 'n',
    KeyO: 'o',
    KeyP: 'p',
    KeyQ: 'q',
    KeyR: 'r',
    KeyS: 's',
    KeyT: 't',
    KeyU: 'u',
    KeyV: 'v',
    KeyW: 'w',
    KeyX: 'x',
    KeyY: 'y',
    KeyZ: 'z',
    Digit0: '0',
    Digit1: '1',
    Digit2: '2',
    Digit3: '3',
    Digit4: '4',
    Digit5: '5',
    Digit6: '6',
    Digit7: '7',
    Digit8: '8',
    Digit9: '9',
    F1: 'f1',
    F2: 'f2',
    F3: 'f3',
    F4: 'f4',
    F5: 'f5',
    F6: 'f6',
    F7: 'f7',
    F8: 'f8',
    F9: 'f9',
    F10: 'f10',
    F11: 'f11',
    F12: 'f12',
    Minus: '-',
    Equal: '=',
    Backslash: '\\',
    Backquote: '`',
    BracketLeft: '[',
    BracketRight: ']',
    Semicolon: ';',
    Quote: "'",
    Comma: ',',
    Period: '.',
    Slash: '/',
    Backspace: 'backspace',
    Space: 'space',
    Enter: 'enter',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
}

class Keys {
    /** 解析到的快捷键 */
    private keys: Set<string>

    /** 是否捕获所有按键 */
    private any: boolean

    /** 当设置为 true 时，用户同时按下 ctrl 键及所监听快捷键时也会触发事件 */
    ctrl: boolean = false

    /** 当设置为 true 时，用户同时按下 shift 键及所监听快捷键时也会触发事件 */
    shift: boolean = false

    /** 当设置为 true 时，用户同时按下 meta 键及所监听快捷键时也会触发事件 */
    meta: boolean = false

    /** 当设置为 true 时，用户同时按下 alt 键及所监听快捷键时也会触发事件 */
    alt: boolean = false

    constructor(keys: string) {
        this.keys = new Set(keys.trim().split(/\s*,\s*/g))
        this.any = this.keys.has('ANY')
    }

    match(k: string, ctrl: boolean, shift: boolean, meta: boolean, alt: boolean) {
        let match = false
        let key = ''

        if (this.any) {
            key = 'ANY'
            match = true
        } else {
            const c = ctrl && !this.ctrl ? 'ctrl-' : ''
            const s = shift && !this.shift ? 'shift-' : ''
            const a = alt && !this.any ? 'alt-' : ''
            const m = meta && !this.meta ? 'meta-' : ''

            key = `${c}${s}${a}${m}${k}`
            match = this.keys.has(key)
        }

        if (!match) {
            return undefined
        }

        return key
    }
}

/**
 * 快捷键监听信息
 */
export interface HotkeyConfig {
    /** 需要监听的快捷键 */
    keys: string

    /** 当设置为 true 时，用户同时按下 ctrl 键及所监听快捷键时也会触发事件 */
    ctrl?: boolean

    /** 当设置为 true 时，用户同时按下 shift 键及所监听快捷键时也会触发事件 */
    shift?: boolean

    /** 当设置为 true 时，用户同时按下 meta 键及所监听快捷键时也会触发事件 */
    meta?: boolean

    /** 当设置为 true 时，用户同时按下 alt 键及所监听快捷键时也会触发事件 */
    alt?: boolean

    /** 当所监听的快捷键按下时需要回调的函数 */
    handle: (event: HotkeyEvent) => void
}

/**
 * 解析 HotkeyListener 后得到的快捷键监听信息，在内部使用
 */
interface Hotkey extends Omit<HotkeyConfig, 'keys'> {
    /** 需要监听的快捷键 */
    keys: Keys

    /** 原始的 keys 字符串 */
    originalKeys: string
}

class Hotkey {
    /** 原始的 keys 字符串 */
    originalKeys!: string

    /** 需要监听的快捷键 */
    keys!: Keys

    /** 当所监听的快捷键按下时需要回调的函数 */
    handle!: (event: HotkeyEvent) => void

    constructor(config: HotkeyConfig) {
        this.setKeys(config.keys)
        this.updateOtherProps(config)
    }

    setKeys(keys: string) {
        this.originalKeys = keys
        this.keys = new Keys(keys)
    }

    updateOtherProps(config: HotkeyConfig) {
        this.keys.ctrl = !!config.ctrl
        this.keys.shift = !!config.shift
        this.keys.meta = !!config.meta
        this.keys.alt = !!config.alt
        this.handle = config.handle
    }
}

class Hotkeys {
    private hotkeys: Hotkey[] = []

    /** 注册一些新的快捷键以替换现有的 */
    set(configs: HotkeyConfig[]) {
        const { hotkeys } = this
        let i = 0

        for (; i < configs.length; i++) {
            const config = configs[i]
            const hotkey = hotkeys[i]

            if (hotkey?.originalKeys !== config.keys) {
                hotkeys[i] = new Hotkey(config)
            } else {
                hotkey.updateOtherProps(config)
            }
        }

        if (i < hotkeys.length - 1) {
            hotkeys.splice(i, hotkeys.length - 1 - i)
        }
    }

    /** 删除内部所有已注册的快捷键 */
    clean() {
        this.hotkeys = []
    }

    /** 将键盘事件派发给对应快捷键的监听函数 */
    dispatch(event: KeyboardEvent) {
        const {
            ctrlKey: ctrl,
            shiftKey: shift,
            metaKey: meta,
            altKey: alt,
            code,
            stopPropagation,
            preventDefault,
        } = event

        const k = CODE_MAPS[code]
        if (k === undefined) {
            return
        }

        const c = ctrl ? 'ctrl-' : ''
        const s = shift ? 'shift-' : ''
        const a = alt ? 'alt-' : ''
        const m = meta ? 'meta-' : ''
        const key = `${c}${s}${a}${m}${k}`

        let dispatched = false
        let prevDispatchedKey = key

        for (const hotkey of this.hotkeys) {
            const matchedKey = hotkey.keys.match(k, ctrl, shift, meta, alt)

            if (!matchedKey) {
                continue
            }

            const hotkeyEvent: HotkeyEvent = {
                key: matchedKey === 'ANY' ? prevDispatchedKey : matchedKey,

                ctrl,
                shift,
                meta,
                alt,

                get dispatched(): boolean {
                    return dispatched
                },

                get defaultPrevented(): boolean {
                    return event.defaultPrevented
                },

                stopPropagation: stopPropagation.bind(event),
                preventDefault: preventDefault.bind(event),
            }

            hotkey.handle(hotkeyEvent)

            dispatched = true
            prevDispatchedKey = matchedKey
        }
    }
}

/**
 * 快捷键事件对象
 */
export interface HotkeyEvent {
    /** 用户所按下的快捷键 */
    readonly key: string

    /** 是否按下了 ctrl 键 */
    readonly ctrl: boolean

    /** 是否按下了 shift 键 */
    readonly shift: boolean

    /** 是否按下了 meta 键 */
    readonly meta: boolean

    /** 是否按下了 alt 键 */
    readonly alt: boolean

    /** 停止事件传播 */
    readonly stopPropagation: () => void

    /** 阻止事件默认行为 */
    readonly preventDefault: () => void

    /** 是否已阻止事件默认行为 */
    readonly defaultPrevented: boolean

    /** 是否已匹配并触发某个快捷键 */
    readonly dispatched: boolean
}

/**
 * 在指定元素上监听快捷键按下事件
 *
 * @param target 监听目标元素，支持如下类型：
 * - 一个 React 的元素引用对象（Ref）；
 * - 一个元素选择器字符串（监听第一个匹配到的元素）；
 * - 一个字符串常量 —— `global`（这将在全局 window 上监听）；
 * - 或传入 undefined 以取消监听。
 *
 * @param hotkeyConfigs 快捷键注册信息
 */
export function useHotkeys(hotkeyConfigs: HotkeyConfig[] | undefined) {
    const isEmpty = hotkeyConfigs === undefined || hotkeyConfigs.length === 0
    const hotkeysRef = useRef<Hotkeys>()

    useMemo(() => {
        if (isEmpty) {
            hotkeysRef.current = undefined
        } else {
            if (hotkeysRef.current === undefined) {
                hotkeysRef.current = new Hotkeys()
            }

            hotkeysRef.current.set(hotkeyConfigs!)
        }
    }, [hotkeyConfigs])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        hotkeysRef.current!.dispatch(event)
    }, [])

    return {
        props: {
            onKeyDown: isEmpty ? undefined : onKeyDown,
        },
    }
}
