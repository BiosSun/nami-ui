import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Button, ButtonProps } from '../lib'

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        $flex: { table: { disable: true } },
        $col: { table: { disable: true } },
        $align: { table: { disable: true } },
        onClick: { action: 'clicked' },
    },
} as Meta

export const Demo: Story<ButtonProps> = (args) => {
    return <Button {...args}>Button</Button>
}
