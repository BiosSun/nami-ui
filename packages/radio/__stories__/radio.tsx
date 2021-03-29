import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { Radio, RadioProps } from '../lib'

export default {
    title: 'Radio',
    component: Radio,
    argTypes: {
        // $flex: { table: { disable: true } },
        // $col: { table: { disable: true } },
        // $align: { table: { disable: true } },
        // onChange: { action: 'changed' },
        // defaultValue: { control: 'text' },
    },
} as Meta

function ControlledFactory() {
    const Template: Story<RadioProps> = (args) => {
        const [{ checked = false, onChange }, updateArgs] = useArgs()

        function handleChange() {
            onChange()
            updateArgs({ checked: true })
        }

        return <Radio {...args} checked={checked} onChange={handleChange} />
    }

    Template.argTypes = {
        defaultChecked: { table: { disable: true } },
    }

    return Template
}

// Uncontrolled
// ---------------------------

export const Uncontrolled: Story<RadioProps> = (args) => <Radio {...args} />

Uncontrolled.args = {
    defaultChecked: false,
    label: 'Uncontrolled Radio',
}

Uncontrolled.argTypes = {
    checked: { table: { disable: true } },
}

// Controlled
// ---------------------------

export const Controlled = ControlledFactory()

Controlled.args = {
    label: 'Controlled Radio',
}

// ReadOnly
// ---------------------------

export const ReadOnly = ControlledFactory()

ReadOnly.args = {
    readOnly: true,
    label: 'ReadOnly Radio',
}
// Disabled
// ---------------------------

export const Disabled = ControlledFactory()

Disabled.args = {
    disabled: true,
    label: 'Disabled Radio',
}
