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

function ControlledFactory({ manyItems }: { manyItems?: boolean } = {}) {
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

        const items = []
        for (let i = 0; i < (manyItems ? 100 : 3); i++) {
            items.push(<ListBox.Item value={i} key={i} label={`Item ${i + 1}`} />)
        }

        return (
            <ListBox
                {...args}
                value={value}
                onChange={handleChange}
                style={{ height: manyItems ? 200 : undefined }}
            >
                {items}
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

export const ManyItems = ControlledFactory({ manyItems: true })

ManyItems.args = {}
