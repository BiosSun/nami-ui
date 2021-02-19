import { useLayoutEffect, useRef, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import clsx from 'clsx'
import { DISTANCE_OPTIONS } from '@nami-ui/styles'
import { Stack } from '../../stack'

import { Space, SpaceProps } from '../lib'
import styles from './index.module.scss'

export default {
    title: 'Space',
    component: Space,
    argTypes: {
        size: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        direction: { control: { type: 'inline-radio' } },
    },
} as Meta

export const NotInStack: Story<SpaceProps> = (args) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [length, setLength] = useState(0)

    useLayoutEffect(() => {
        const rect = containerRef.current!.querySelector('.nami-space')!.getBoundingClientRect()
        setLength(args.direction === 'vertical' ? rect.width : rect.height)
    }, [args.size])

    return (
        <>
            <div className={styles.length}>{length}px</div>
            <div
                className={clsx(styles.container, args.direction && styles[args.direction])}
                ref={containerRef}
            >
                <hr className={styles.hr} />
                <Space {...args} />
                <hr className={styles.hr} />
            </div>
        </>
    )
}

export const InStack: Story<SpaceProps & { stackDirection: any }> = ({
    stackDirection,
    ...args
}) => {
    return (
        <Stack className={styles.stack} direction={stackDirection}>
            <hr className={styles.hr} />
            <Space {...args} />
            <hr className={styles.hr} />
        </Stack>
    )
}

InStack.argTypes = {
    direction: { table: { disable: true } },
    stackDirection: { control: { type: 'inline-radio', options: ['horizontal', 'vertical'] } },
}
