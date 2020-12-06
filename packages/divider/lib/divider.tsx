import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import './divider.scss'

export interface DividerProps extends HTMLAttributes<HTMLElement> {
    /** 分隔符方向，如果是作为 Stack 组件的子元素使用，那么无需设置该属性 */
    direction?: 'horizontal' | 'vertical'
}

/**
 * 提供最基础的点击交互能力。
 */
export function Divider({ direction, className, children, ...otherProps }: DividerProps) {
    className = clsx(
        'nami-divider',
        {
            [`nami-divider--${direction}`]: direction,
        },
        className,
    )

    return <div className={className} {...otherProps} />
}
