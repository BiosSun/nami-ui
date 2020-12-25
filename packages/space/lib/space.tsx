import React, { HTMLAttributes } from 'react'
import { Distances, normalizeDistance } from '@nami-ui/styles'
import clsx from 'clsx'

import './space.scss'

export type SpaceProps = HTMLAttributes<HTMLElement> & {
    /** 空隔尺寸 */
    size?: boolean | Distances

    /** 空隔方向，如果是作为 Stack 组件的子元素使用，那么无需设置该属性 */
    direction?: 'horizontal' | 'vertical'
}

export function Space({ direction, size, className, children, ...otherProps }: SpaceProps) {
    className = clsx(
        'nami-space',
        {
            [`nami-space--${direction}`]: direction,
            [`nami-space--size-${normalizeDistance(size)}`]: size,
        },
        className,
    )

    return <div className={className} {...otherProps} />
}
