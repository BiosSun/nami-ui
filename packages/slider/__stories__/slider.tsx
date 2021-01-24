import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { Slider, SliderLabelProps, SliderProps } from '../lib'
import { noop } from '@nami-ui/utils'

export default {
    title: 'Slider',
    component: Slider,
    argTypes: {
        // $flex: { table: { disable: true } },
        // $col: { table: { disable: true } },
        // $align: { table: { disable: true } },
        // onChange: { action: 'changed' },
        // defaultValue: { control: 'text' },
    },
} as Meta

function ControlledFactory() {
    const Template: Story<SliderProps> = (args) => {
        const [{ value = 0, onChange, vertical }, updateArgs] = useArgs()

        function handleChange(value: number | number[]) {
            onChange(value)
            updateArgs({ value })
        }

        return (
            <Slider
                {...args}
                value={value}
                vertical={vertical}
                style={{ height: vertical ? 500 : undefined }}
                onChange={handleChange}
            />
        )
    }

    Template.argTypes = {
        defaultValue: { table: { disable: true } },
    }

    return Template
}

// Uncontrolled
// ---------------------------

export const Uncontrolled: Story<SliderProps> = (args) => <Slider {...args} />

Uncontrolled.args = {
    defaultValue: [0, 1],
}

// Uncontrolled.argTypes = {
//     checked: { table: { disable: true } },
// }

// Controlled
// ---------------------------

export const Controlled = ControlledFactory()

Controlled.args = {}

// Disabled
// ---------------------------

export const Disabled = ControlledFactory()

Disabled.args = {
    disabled: true,
}

// Asix
// ---------------------------

export const Axis = ControlledFactory()

Axis.args = {
    value: [10, 30],
    min: 0,
    max: 100,
    step: 10,
    points: [3, 18, 27, 56, 89],
    marks: true,
    vertical: true,
    range: true,
}
