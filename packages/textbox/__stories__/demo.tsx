import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { TextBox, TextBoxProps } from '../lib'

export default {
    title: 'TextBox',
    component: TextBox,
    argTypes: {
        $flex: { table: { disable: true } },
        $col: { table: { disable: true } },
        $align: { table: { disable: true } },
        onChange: { action: 'changed' },
        defaultValue: { control: 'text' },
    },
} as Meta

function ControlledFactory() {
    const Template: Story<TextBoxProps> = (args) => {
        const [{ value = '', onChange }, updateArgs] = useArgs()

        function handleChange(value: string) {
            onChange(value)
            updateArgs({ value })
        }

        return <TextBox {...args} value={value} onChange={handleChange} />
    }

    Template.argTypes = {
        defaultValue: { table: { disable: true } },
    }

    return Template
}

// Uncontrolled
// ---------------------------

export const Uncontrolled: Story<TextBoxProps> = (args) => <TextBox {...args} />

Uncontrolled.args = {
    defaultValue: 'Hello, Nami UI.',
}

Uncontrolled.argTypes = {
    value: { table: { disable: true } },
}

// Controlled
// ---------------------------

export const Controlled = ControlledFactory()

Controlled.args = {
    value: 'Hello, Nami UI.',
}

// Placehold
// ---------------------------

export const Placeholder = ControlledFactory()

Placeholder.args = {
    placeholder: '请输入一些文本…',
}

// Disabled
// ---------------------------

export const Disabled = ControlledFactory()

Disabled.args = {
    disabled: true,
    placeholder: '请输入一些文本…',
    value: 'Hello, Nami UI.',
}
