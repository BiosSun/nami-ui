import React, { useLayoutEffect, useRef, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import clsx from 'clsx'
import { DISTANCE_OPTIONS } from '@nami-ui/styles'
import { Stack } from '../../stack'

import { Divider, DividerProps } from '../lib'
import styles from './index.module.scss'

export default {
    title: 'Divider',
    component: Divider,
    argTypes: {
        direction: { control: { type: 'inline-radio' } },
    },
} as Meta

export const NotInStack: Story<DividerProps> = (args) => {
    return (
        <>
            <div className={clsx(styles.container, args.direction && styles[args.direction])}>
                <Divider {...args} />
            </div>
        </>
    )
}

export const InStack: Story<DividerProps & { stackDirection: any }> = ({
    stackDirection,
    ...args
}) => {
    return (
        <Stack className={styles.stack} direction={stackDirection}>
            <Divider {...args} />
        </Stack>
    )
}

InStack.argTypes = {
    direction: { table: { disable: true } },
    stackDirection: { control: { type: 'inline-radio', options: ['horizontal', 'vertical'] } },
}
