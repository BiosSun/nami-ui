import { createContext } from 'react'

export type ListBoxValue = null | boolean | symbol | number | bigint | string | object

export interface ListBoxContextType {
    /** 列表框已禁用 */
    disabled?: boolean

    /** 判断所传入的选项是否被选中 */
    isSelected: (value: ListBoxValue) => boolean

    /** 改变选中项 */
    change: (value: ListBoxValue, select: boolean) => void
}

export const ListBoxContext = createContext<ListBoxContextType | null>(null)
