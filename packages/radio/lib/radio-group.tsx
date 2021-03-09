import { HTMLAttributes, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import { noop, useValue } from '@nami-ui/utils'
import { Stack } from '@nami-ui/stack'
import { RadioValue, RadioGroupContext } from './radio-group-context'

import './radio-group.scss'

export interface RadioGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** 所选选项值 */
    value?: RadioValue

    /** 默认所选选项值 */
    defaultValue?: RadioValue

    /** 选中选项改变事件 */
    onChange?: (value: RadioValue | null) => void

    /** 禁用 */
    disabled?: boolean

    /** 布局方向 */
    direction: 'horizontal' | 'vertical'

    /** 选项 */
    children: ReactNode
}

export function RadioGroup({
    value,
    defaultValue,
    onChange = noop,
    disabled = false,
    direction = 'horizontal',
    className,
    children,
    ...otherProps
}: RadioGroupProps) {
    const [val, setVal, controlled] = useValue(value, defaultValue, null)

    const context = useMemo(() => {
        function isChecked(value: RadioValue) {
            return value === val
        }

        function change(value: RadioValue, check: boolean) {
            const checked = isChecked(value)

            if (check !== checked) {
                const newVal = check ? value : null

                if (!controlled) {
                    setVal(newVal)
                }

                onChange(newVal)
            }
        }

        return { disabled, isChecked, change }
    }, [val, disabled])

    className = clsx('nami-radio-group', className)

    return (
        <Stack
            direction={direction}
            spacing={direction === 'horizontal' ? 'big' : true}
            wrap
            {...otherProps}
        >
            <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
        </Stack>
    )
}
