import { createContext } from 'react'

export type RadioValue = null | boolean | symbol | number | bigint | string | object

export interface RadioGroupContextType {
    /** 禁用该组下的所有单选框 */
    disabled: boolean

    /** 判断所传入的选项是否被选中 */
    isChecked: (value: RadioValue) => boolean

    /** 改变选中项 */
    change: (value: RadioValue, check: boolean) => void
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null)
