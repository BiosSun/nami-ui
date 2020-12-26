import React, { HTMLAttributes, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import { noop, useValue } from '@nami-ui/utils'
import { Stack } from '@nami-ui/stack'
import { CheckBoxValue, CheckBoxGroupContext } from './checkbox-group-context'

import './checkbox-group.scss'

export interface CheckBoxGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** 所选选项值 */
    value?: CheckBoxValue[]

    /** 默认所选选项值 */
    defaultValue?: CheckBoxValue[]

    /** 选中选项改变事件 */
    onChange?: (value: CheckBoxValue[]) => void

    /** 禁用 */
    disabled?: boolean

    /** 布局方向 */
    direction: 'horizontal' | 'vertical'

    /** 选项 */
    children: ReactNode
}

export function CheckBoxGroup({
    value,
    defaultValue,
    onChange = noop,
    disabled = false,
    direction = 'horizontal',
    className,
    children,
    ...otherProps
}: CheckBoxGroupProps) {
    const [val, setVal, controlled] = useValue(value, defaultValue, [])

    const context = useMemo(() => {
        function isChecked(value: CheckBoxValue) {
            return val.includes(value)
        }

        function change(value: CheckBoxValue, check: boolean) {
            const checked = isChecked(value)

            if (check !== checked) {
                const newVal = check ? [...val, value] : val.filter((v) => v !== value)

                if (!controlled) {
                    setVal(newVal)
                }

                onChange(newVal)
            }
        }

        return { disabled, isChecked, change }
    }, [val, disabled])

    className = clsx('nami-checkbox-group', className)

    return (
        <Stack
            direction={direction}
            spacing={direction === 'horizontal' ? 'big' : true}
            wrap
            {...otherProps}
        >
            <CheckBoxGroupContext.Provider value={context}>
                {children}
            </CheckBoxGroupContext.Provider>
        </Stack>
    )
}
