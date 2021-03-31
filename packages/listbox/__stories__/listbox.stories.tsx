import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { ListBox, ListBoxProps, ListBoxValue } from '../lib'

export default {
    title: 'ListBox',
    component: ListBox,
    argTypes: {
        disabled: { control: 'boolean' },
        multiple: { control: 'boolean' },
        check: { control: 'boolean' },
    },
} as Meta

function ControlledFactory({ manyItems }: { manyItems?: boolean } = {}) {
    const itemsCount = manyItems ? 100 : 3

    function rightValueType(multiple: boolean, value: ListBoxValue | ListBoxValue[]) {
        if (multiple && !Array.isArray(value)) {
            return []
        }

        if (!multiple && Array.isArray(value)) {
            return null
        }

        return value
    }

    const Template: Story<ListBoxProps> = () => {
        const [args, updateArgs] = useArgs()
        const value = rightValueType(args.multiple, args.value)

        function handleChange(value: ListBoxValue | ListBoxValue[]) {
            args.onChange(value)
            updateArgs({ value })
        }

        const items = []
        for (let i = 0; i < itemsCount; i++) {
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

export const SingleWithCheck = ControlledFactory()

SingleWithCheck.args = {
    multiple: false,
    check: true,
}

export const Multiple = ControlledFactory()

Multiple.args = {
    multiple: true,
}

export const MultipleWithCheck = ControlledFactory()

MultipleWithCheck.args = {
    multiple: true,
    check: true,
}

export const ManyItems = ControlledFactory({ manyItems: true })

ManyItems.args = {}
