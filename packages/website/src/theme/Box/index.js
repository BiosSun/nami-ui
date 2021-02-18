import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.scss'

export default function Box({
    inline,
    transparent,
    small,
    large,
    children = 'Box',
    className,
    ...otherProps
}) {
    return (
        <div
            className={clsx(
                styles.box,
                {
                    [styles.inline]: inline,
                    [styles.transparent]: transparent,
                    [styles.small]: small,
                    [styles.large]: large,
                },
                className,
            )}
            {...otherProps}
        >
            {children}
        </div>
    )
}
