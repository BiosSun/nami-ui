import { ChangeEvent, FC, HTMLAttributes, useContext } from 'react'
import { useValue, noop } from '@nami-ui/utils'
import { CircleFilled as CircleFilledIcon } from '@nami-ui/icon'
import clsx from 'clsx'

import './radio.scss'
import { RadioGroupContext, RadioValue } from './radio-group-context'

export interface RadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
    /** 选项值 */
    value?: RadioValue

    /** 是否选中 */
    checked?: boolean

    /** 默认是否选中 */
    defaultChecked?: boolean

    /** 选项说明文本 */
    label?: string

    /** 禁用 */
    disabled?: boolean

    /** 只读 */
    readOnly?: boolean

    /** 选中事件 */
    onChange?: () => void
}

export const Radio: FC<RadioProps> = ({
    value,
    checked: $checked,
    defaultChecked: $defaultChecked,
    label,
    disabled = false,
    readOnly = false,
    onChange = noop,
    className,
    ...otherProps
}) => {
    // 内部选中状态值
    let checked: boolean

    // 修改内部选中状态值
    let setChecked: (checked: boolean) => void

    // 当前内部选中状态值是否受 `checked` 属性控制，若不是，则应当在选中时，调用 setCheck
    let controlled: boolean

    const groupContext = useContext(RadioGroupContext)

    if (groupContext) {
        checked = groupContext.isChecked(value!)
        setChecked = (checked) => groupContext.change(value!, checked)
        controlled = false
        disabled = groupContext.disabled || disabled
    } else {
        ;[checked, setChecked, controlled] = useValue($checked, $defaultChecked, false)
    }

    const handleChange =
        !readOnly && !disabled
            ? (event: ChangeEvent<HTMLInputElement>) => {
                  const check = event.target.checked

                  if (!controlled) {
                      setChecked(check)
                  }

                  onChange()
              }
            : undefined

    className = clsx(
        'nami-radio',
        {
            'nami-radio--checked': checked,
            'nami-radio--readonly': readOnly,
            'nami-radio--disabled': disabled,
        },
        className,
    )

    return (
        <label className={className} {...otherProps}>
            <input
                className="nami-radio__input"
                type="radio"
                checked={checked}
                readOnly={readOnly}
                disabled={disabled}
                onChange={handleChange}
            />
            <span className="nami-radio__cell">
                <span className="nami-radio__cell__frame" />
                <CircleFilledIcon className="nami-radio__cell__icon" />
            </span>
            {label ? <span className="nami-radio__label">{label}</span> : null}
        </label>
    )
}
