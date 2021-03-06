/* eslint-disable react/destructuring-assignment */
import clsx from 'clsx'
import { FC, HTMLAttributes, ReactNode, useMemo, useContext } from 'react'
import { noop, useValue } from '@nami-ui/utils'
import { Stack, HStack } from '@nami-ui/stack'
import { CheckBox } from '@nami-ui/checkbox'
import { Radio } from '@nami-ui/radio'
import { ListBoxValue, ListBoxContext } from './listbox-context'

import './listbox.scss'

interface BasicListBoxProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    /** 是否禁用 */
    disabled?: boolean

    /** 是否显示 checkbox / radio */
    check?: boolean

    /** 选项 */
    children: ReactNode
}

interface SingleListBoxProps extends BasicListBoxProps {
    /** 单选 */
    multiple?: false

    /** 所选值 */
    value?: ListBoxValue

    /** 默认所选值 */
    defaultValue?: ListBoxValue

    onChange?: (value: ListBoxValue) => void
}

interface MultipleListBoxProps extends BasicListBoxProps {
    /** 多选 */
    multiple: true

    /** 所选值 */
    value?: ListBoxValue[]

    /** 默认所选值 */
    defaultValue?: ListBoxValue[]

    onChange?: (value: ListBoxValue[]) => void
}

export type ListBoxProps = SingleListBoxProps | MultipleListBoxProps

export const ListBox: FC<ListBoxProps> = ({
    value: _val,
    defaultValue: _defval,
    multiple,
    check,
    onChange = noop,
    disabled,
    className,
    children,
    ...otherProps
}) => {
    const [value, setValue, controlled] = useValue(_val, _defval, multiple ? [] : null)

    const context = useMemo(() => {
        if (multiple) {
            const isSelected = (val: ListBoxValue) => {
                return (value as ListBoxValue[]).includes(val)
            }

            const change = (val: ListBoxValue, select: boolean) => {
                const selected = isSelected(val)

                if (select !== selected) {
                    const newValue = select
                        ? [...(value as ListBoxValue[]), val]
                        : (value as ListBoxValue[]).filter((v) => v !== val)

                    if (!controlled) {
                        setValue(newValue)
                    }

                    onChange(newValue)
                }
            }

            return { disabled, check, multiple, isSelected, change }
        }
        // eslint-disable-next-line no-else-return
        else {
            const isSelected = (val: ListBoxValue) => {
                return val === value
            }

            const change = (val: ListBoxValue, select: boolean) => {
                const selected = isSelected(val)

                if (select !== selected) {
                    const newValue = select ? val : null

                    if (!controlled) {
                        setValue(newValue)
                    }

                    onChange(newValue as any)
                }
            }

            return { disabled, check, multiple, isSelected, change }
        }
    }, [multiple, disabled, check, value, controlled, onChange, setValue])

    className = clsx('nami-listbox', className)

    return (
        <Stack direction="vertical" className={className} {...otherProps}>
            <ListBoxContext.Provider value={context}>{children}</ListBoxContext.Provider>
        </Stack>
    )
}

export interface ListBoxItemProps extends HTMLAttributes<HTMLLabelElement> {
    /* 选项值 */
    value: ListBoxValue

    /* 选项说明文本 */
    label: string

    /* 是否禁用 */
    disabled?: boolean

    /* 选中事件 */
    onSelect?: () => void
}

export const ListBoxItem: FC<ListBoxItemProps> = ({
    value,
    onSelect = noop,
    disabled: _disabled,
    label,
    className: _className,
    ...otherProps
}) => {
    const context = useContext(ListBoxContext)

    if (!context) {
        throw new Error(
            '[Nami-UI] (ListBoxItem) ListBoxItem should be used as a child component of the ListBox component.',
        )
    }

    const disabled = _disabled || context.disabled
    const selected = context.isSelected(value)

    function handleChange() {
        if (disabled) {
            return
        }

        context!.change(value, !selected)
        onSelect()
    }

    const className = clsx(
        'nami-listbox__item',
        {
            'nami-listbox__item--disabled': disabled,
            'nami-listbox__item--selected': selected,
        },
        _className,
    )

    const CheckComponent = context.check ? (context.multiple ? CheckBox : Radio) : null

    return (
        <HStack
            className={className}
            {...otherProps}
            onClick={handleChange}
            spacing="small"
            align="center"
        >
            {CheckComponent ? (
                <CheckComponent className="nami-listbox__item__check" checked={selected} readOnly />
            ) : null}
            <span $flex className="nami-listbox__item__label">
                {label}
            </span>
        </HStack>
    )
}
