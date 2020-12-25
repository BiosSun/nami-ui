import React, { ChangeEvent, HTMLAttributes } from 'react'
import { useValue, noop } from '@nami-ui/utils'
import clsx from 'clsx'

import './textbox.scss'

export interface TextBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

export function TextBox({
    value,
    defaultValue,
    placeholder,
    disabled = false,
    onChange = noop,
    className,
    ...otherProps
}: TextBoxProps) {
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
