import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { CheckBoxGroup, CheckBox, CheckBoxGroupProps, CheckBoxValue } from '../lib'

const VALUES = ['js', 'ts', 'cs', 'as']

export default {
    title: 'CheckBoxGroup',
    component: CheckBoxGroup,
    argTypes: {
        $flex: { table: { disable: true } },
        $col: { table: { disable: true } },
        $align: { table: { disable: true } },
        children: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        value: { control: { type: 'inline-check', options: VALUES } },
        onChange: { table: { disable: true }, action: 'changed' },
        onItemChange: { table: { disable: true }, action: 'item changed' },
    },
} as Meta

export const Demo: Story<CheckBoxGroupProps> = ({ onItemChange, ...args }) => {
    const [{ value = [], onChange }, updateArgs] = useArgs()

    function handleChange(value: CheckBoxValue[]) {
        updateArgs({ value })
        onChange(value)
    }

    return (
        <CheckBoxGroup {...args} value={value} onChange={handleChange}>
            <CheckBox
                value="js"
                label="JavaScript (js)"
                onChange={(...args) => onItemChange('js', ...args)}
            />
            <CheckBox
                value="ts"
                label="TypeScript (ts)"
                onChange={(...args) => onItemChange('ts', ...args)}
            />
            <CheckBox
                value="cs"
                label="CoffeeScript (cs)"
                onChange={(...args) => onItemChange('cs', ...args)}
            />
            <CheckBox
                value="as"
                label="ActionScript (as)"
                onChange={(...args) => onItemChange('as', ...args)}
            />
        </CheckBoxGroup>
    )
}
