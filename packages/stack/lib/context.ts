import { createContext } from 'react'

export interface StackContextType {
    // 布局方向
    direction: 'horizontal' | 'vertical'
}

export const StackContext = createContext<StackContextType>({
    direction: 'horizontal',
})
