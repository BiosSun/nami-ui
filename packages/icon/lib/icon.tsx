import { SVGAttributes } from 'react'
import clsx from 'clsx'

import './icon.scss'

// interface IconComponentProps {
//     className: string
// }

export interface IconProps extends SVGAttributes<SVGElement> {
    // component: ComponentType<IconComponentProps>
    path: string
}

export function Icon({ path, className, ...otherProps }: IconProps) {
    className = clsx('nami-icon', className)

    return (
        <svg className={className} width="16" height="16" viewBox="0 0 48 48" {...otherProps}>
            <path d={path} />
        </svg>
    )
}

type ConcreteIconProps = Omit<IconProps, 'path'>

/**
 * 上方；
 * @线性
 */
export function Up(props: ConcreteIconProps) {
    return (
        <Icon
            path="M24 11.5a2 2 0 011.52.7l18 21a2 2 0 11-3.04 2.6L24 16.57 7.52 35.8a2 2 0 01-3.04-2.6l18-21a2 2 0 011.52-.7z"
            {...props}
        />
    )
}

/**
 * 下方；
 * @线性
 */
export function Down(props: ConcreteIconProps) {
    return (
        <Icon
            path="M4.7 11.98a2 2 0 012.82.22L24 31.43 40.48 12.2a2 2 0 113.04 2.6l-18 21a2 2 0 01-3.04 0l-18-21a2 2 0 01.22-2.82z"
            {...props}
        />
    )
}

/**
 * 左方；
 * @线性
 */
export function Left(props: ConcreteIconProps) {
    return (
        <Icon
            path="M36.02 4.7a2 2 0 01-.22 2.82L16.57 24 35.8 40.48a2 2 0 11-2.6 3.04l-21-18a2 2 0 010-3.04l21-18a2 2 0 012.82.22z"
            {...props}
        />
    )
}

/**
 * 右方；
 * @线性
 */
export function Right(props: ConcreteIconProps) {
    return (
        <Icon
            path="M11.98 4.7a2 2 0 012.82-.22l21 18a2 2 0 010 3.04l-21 18a2 2 0 01-2.6-3.04L31.43 24 12.2 7.52a2 2 0 01-.22-2.82z"
            {...props}
        />
    )
}

/**
 * 添加；
 * @线性
 */
export function Add(props: ConcreteIconProps) {
    return (
        <Icon
            path="M26 6a2 2 0 10-4 0v16H6a2 2 0 100 4h16v16a2 2 0 104 0V26h16a2 2 0 100-4H26V6z"
            {...props}
        />
    )
}

/**
 * 删除；
 * @线性
 */
export function Remove(props: ConcreteIconProps) {
    return (
        <Icon
            path="M39.2 11.63a2 2 0 00-2.83-2.83L24 21.17 11.63 8.8a2 2 0 10-2.83 2.83L21.17 24 8.8 36.37a2 2 0 002.83 2.83L24 26.83 36.37 39.2a2 2 0 102.83-2.83L26.83 24 39.2 11.63z"
            {...props}
        />
    )
}

/**
 * 对号；
 * @线性
 */
export function Check(props: ConcreteIconProps) {
    return (
        <Icon
            path="M43.4 11.28a2 2 0 010 2.83L20.86 36.65a2 2 0 01-2.83 0L4.6 23.32a2 2 0 012.82-2.84l12.03 11.95 21.13-21.14a2 2 0 012.83 0z"
            {...props}
        />
    )
}

/**
 * 圆
 * @填充
 */
export function CircleFilled(props: ConcreteIconProps) {
    return <Icon path="M43.5 24a19.5 19.5 0 11-39 0 19.5 19.5 0 0139 0z" {...props} />
}

/**
 * Github Logo；
 */
export function GitHub(props: ConcreteIconProps) {
    return (
        <Icon
            path="M24.1 4a20.08 20.08 0 00-6.35 39.14c1.01.18 1.37-.45 1.37-.98v-3.41c-5.6 1.22-6.8-2.7-6.8-2.7a5.37 5.37 0 00-2.22-2.95c-1.81-1.23.15-1.23.15-1.23 1.28.18 2.41.95 3.06 2.07a4.29 4.29 0 005.84 1.68 4.27 4.27 0 011.24-2.69c-4.46-.5-9.15-2.23-9.15-9.86-.03-2 .71-3.92 2.06-5.39a7.32 7.32 0 01.2-5.31s1.69-.54 5.52 2.06c3.29-.9 6.76-.9 10.05 0 3.84-2.6 5.51-2.06 5.51-2.06.74 1.67.83 3.55.25 5.28a7.77 7.77 0 012.06 5.38c0 7.72-4.7 9.4-9.17 9.86a4.75 4.75 0 011.37 3.7v5.51c0 .66.35 1.16 1.38.96A20.08 20.08 0 0024.1 4z"
            {...props}
        />
    )
}
