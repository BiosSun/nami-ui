import { Story, Meta } from '@storybook/react/types-6-0'
import { useArgs } from '@storybook/client-api'

import { RadioGroup, Radio, RadioGroupProps, RadioValue } from '../lib'

const VALUES = ['js', 'ts', 'cs', 'as']

export default {
    title: 'RadioGroup',
    component: RadioGroup,
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

export const Demo: Story<RadioGroupProps> = ({ onItemChange, ...args }) => {
    const [{ value = [], onChange }, updateArgs] = useArgs()

    function handleChange(value: RadioValue) {
        updateArgs({ value })
        onChange(value)
    }

    return (
        <RadioGroup {...args} value={value} onChange={handleChange}>
            <Radio
                value="js"
                label="JavaScript (js)"
                onChange={(...args) => onItemChange('js', ...args)}
            />
            <Radio
                value="ts"
                label="TypeScript (ts)"
                onChange={(...args) => onItemChange('ts', ...args)}
            />
            <Radio
                value="cs"
                label="CoffeeScript (cs)"
                onChange={(...args) => onItemChange('cs', ...args)}
            />
            <Radio
                value="as"
                label="ActionScript (as)"
                onChange={(...args) => onItemChange('as', ...args)}
            />
        </RadioGroup>
    )
}
