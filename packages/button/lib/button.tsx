import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

import './button.scss'

export type ButtonProps = HTMLAttributes<HTMLElement> & {
    /** 让按钮保持在 hover 状态 */
    hover?: boolean

    /** 让按钮保持在 active 状态 */
    active?: boolean

    /** 让按钮保持在 focus 状态 */
    focus?: boolean

    /** 禁用按钮 */
    disabled?: boolean

    /** 点击事件 */
    onClick?: (event: MouseEvent) => void
}

/**
 * 提供最基础的点击交互能力。
 */
export function Button({
    hover = false,
    active = false,
    focus = false,
    disabled = false,
    className,
    children,
    ...otherProps
}: ButtonProps) {
    className = clsx(
        'nami-button',
        {
            'nami-button--hover': hover,
            'nami-button--active': active,
            'nami-button--focus': focus,
        },
        className,
    )
    return (
        <button className={className} disabled={disabled} {...otherProps}>
            {children}
        </button>
    )
}
