import { createContext } from 'react'

export type CheckBoxValue = null | boolean | symbol | number | bigint | string | object

export interface CheckBoxGroupContextType {
    /** 禁用该组下的所有复选框 */
    disabled: boolean

    /** 判断所传入的选项是否被选中 */
    isChecked: (value: CheckBoxValue) => boolean

    /** 改变选中项 */
    change: (value: CheckBoxValue, check: boolean) => void
}

export const CheckBoxGroupContext = createContext<CheckBoxGroupContextType | null>(null)
