import React, { ChangeEvent, HTMLAttributes } from 'react'
import { useValue, noop } from '@nami-ui/utils'
import clsx from 'clsx'

import './textbox.scss'

export interface TextboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** 文本值 */
    value?: string

    /** 默认文本值 */
    defaultValue?: string

    /** 占位符 */
    placeholder?: string

    /** 禁用按钮 */
    disabled?: boolean

    /** 值改变事件 */
    onChange?: (value: string) => void
}

/**
 * 最基础地文本编辑功能。
 *
 * ```jsx
 * import {Textbox} from '@nami-ui/textbox'
 *
 * function Demo() {
 *     const [value, setValue] = useState('')
 *     return <Textbox value={value} onChange={setValue} />
 * }
 *
 * render(<Demo />)
 * ```
 *
 * ## 占位符
 *
 * 设置 `placeholder` 属性，可以显示空占位符（仅支持字符串）：
 *
 * ```jsx
 * render(<Textbox placeholder="请输入一些文本" />)
 * ```
 *
 * ## 禁用
 *
 * 设置 `disabled` 属性，可以禁用文本框：
 *
 * ```jsx
 * render(<Textbox disabled />)
 * ```
 */
export function Textbox({
    value,
    defaultValue,
    placeholder,
    disabled = false,
    onChange = noop,
    className,
    ...otherProps
}: TextboxProps) {
    const [val, setVal, controlled] = useValue(value, defaultValue, '')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const val = event.target.value

        if (!controlled) {
            setVal(val)
        }

        onChange(val)
    }

    className = clsx('nami-textbox', { 'nami-textbox--disabled': disabled }, className)

    return (
        <div className={className} {...otherProps}>
            <div className="nami-textbox__container">
                <input
                    className="nami-textbox__input"
                    value={val}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
