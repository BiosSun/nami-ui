import React, { ChangeEvent, HTMLAttributes, useContext } from 'react'
import { useValue, noop } from '@nami-ui/utils'
import { Check as CheckIcon } from '@nami-ui/icon'
import clsx from 'clsx'

import { CheckBoxGroupContext, CheckBoxValue } from './checkbox-group-context'

import './checkbox.scss'

export interface CheckBoxProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
    /** 选项值 */
    value?: CheckBoxValue

    /** 是否选中 */
    checked?: boolean

    /** 默认是否选中 */
    defaultChecked?: boolean

    /** 选项说明文本 */
    label?: string

    /** 禁用 */
    disabled?: boolean

    /** 选中状态改变事件 */
    onChange?: (checked: boolean) => void
}

export function CheckBox({
    value,
    checked,
    defaultChecked,
    label,
    disabled = false,
    onChange = noop,
    className,
    ...otherProps
}: CheckBoxProps) {
    // 内部选中状态值
    let check: boolean

    // 修改内部选中状态值
    let setCheck: (check: boolean) => void

    // 当前内部选中状态值是否受 `checked` 属性控制，若不是，则应当在状态值改变时，调用 setCheck
    let controlled: boolean

    const groupContext = useContext(CheckBoxGroupContext)

    if (groupContext) {
        check = groupContext.isChecked(value!)
        setCheck = (check: boolean) => groupContext.change(value!, check)
        controlled = false
        disabled = groupContext.disabled || disabled
    } else {
        ;[check, setCheck, controlled] = useValue(checked, defaultChecked, false)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const check = event.target.checked

        if (!controlled) {
            setCheck(check)
        }

        onChange(check)
    }

    className = clsx(
        'nami-checkbox',
        {
            'nami-checkbox--checked': check,
            'nami-checkbox--disabled': disabled,
        },
        className,
    )

    return (
        <label className={className} {...otherProps}>
            <input
                className="nami-checkbox__input"
                type="checkbox"
                checked={check}
                disabled={disabled}
                onChange={handleChange}
            />
            <span className="nami-checkbox__cell">
                <span className="nami-checkbox__cell__frame" />
                <CheckIcon className="nami-checkbox__cell__icon" />
            </span>
            {label ? <span className="nami-checkbox__label">{label}</span> : null}
        </label>
    )
}
