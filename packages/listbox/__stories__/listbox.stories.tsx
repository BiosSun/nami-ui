import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { ListBox, ListBoxProps, ListBoxValue } from '../lib'

export default {
    title: 'ListBox',
    component: ListBox,
    argTypes: {
        disabled: { control: 'boolean' },
    },
} as Meta

function ControlledFactory() {
    const Template: Story<ListBoxProps> = () => {
        const [args, updateArgs] = useArgs()

        const value =
            args.multiple && !Array.isArray(args.value)
                ? []
                : !args.multiple && Array.isArray(args.value)
                ? null
                : args.value

        function handleChange(value: ListBoxValue | ListBoxValue[]) {
            args.onChange(value)
            updateArgs({ value })
        }

        return (
            <ListBox {...args} value={value} onChange={handleChange}>
                <ListBox.Item value={0} label="Item 1" />
                <ListBox.Item value={1} label="Item 2" />
                <ListBox.Item value={2} label="Item 3" />
            </ListBox>
        )
    }

    Template.argTypes = {
        defaultValue: { table: { disable: true } },
    }

    return Template
}

export const Single = ControlledFactory()

Single.args = {
    multiple: false,
}

export const Multiple = ControlledFactory()

Multiple.args = {
    multiple: true,
}
