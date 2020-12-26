import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { CheckBox, CheckBoxProps } from '../lib'

export default {
    title: 'CheckBox',
    component: CheckBox,
    argTypes: {
        // $flex: { table: { disable: true } },
        // $col: { table: { disable: true } },
        // $align: { table: { disable: true } },
        // onChange: { action: 'changed' },
        // defaultValue: { control: 'text' },
    },
} as Meta

function ControlledFactory() {
    const Template: Story<CheckBoxProps> = (args) => {
        const [{ checked = false, onChange }, updateArgs] = useArgs()

        function handleChange(checked: boolean) {
            onChange(checked)
            updateArgs({ checked })
        }

        return <CheckBox {...args} checked={checked} onChange={handleChange} />
    }

    Template.argTypes = {
        defaultChecked: { table: { disable: true } },
    }

    return Template
}

// Uncontrolled
// ---------------------------

export const Uncontrolled: Story<CheckBoxProps> = (args) => <CheckBox {...args} />

Uncontrolled.args = {
    defaultChecked: true,
    label: 'Uncontrolled CheckBox',
}

Uncontrolled.argTypes = {
    checked: { table: { disable: true } },
}

// Controlled
// ---------------------------

export const Controlled = ControlledFactory()

Controlled.args = {
    label: 'Controlled CheckBox',
}

// Disabled
// ---------------------------

export const Disabled = ControlledFactory()

Disabled.args = {
    disabled: true,
    label: 'Disabled CheckBox',
}