import clsx from 'clsx'
import { FC, HTMLAttributes, useContext } from 'react'
import { noop } from '@nami-ui/utils'
import { HStack } from '@nami-ui/stack'
import { ListBoxValue, ListBoxContext } from './listbox-context'

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
    disabled,
    label,
    className,
    ...otherProps
}) => {
    const context = useContext(ListBoxContext)

    if (!context) {
        throw new Error(
            '[Nami-UI] (ListBoxItem) ListBoxItem should be used as a child component of the ListBox component.',
        )
    }

    disabled = disabled || context.disabled

    function handleChange() {
        context!.change(value, !context!.isSelected(value))
        onSelect()
    }

    className = clsx(
        'nami-listbox__item',
        {
            'nami-listbox__item--disabled': disabled,
            'nami-listbox__item--selected': context.isSelected(value),
        },
        className,
    )

    return (
        <HStack className={className} {...otherProps} onClick={handleChange}>
            <span className="nami-listbox__item__label">{label}</span>
        </HStack>
    )
}
