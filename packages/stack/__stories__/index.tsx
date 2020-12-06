import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import produce from 'immer'
import clsx from 'clsx'
import { Button } from '../../button'
import { Space } from '../../space'
import { Divider } from '../../divider'
import { DISTANCE_OPTIONS, Distances } from '@nami-ui/styles'
import { Stack, StackProps, StackItemProps } from '../lib'
import styles from './index.module.scss'

export default {
    title: 'Stack',
    component: Stack,
    argTypes: {
        $flex: { table: { disable: true } },
        $col: { table: { disable: true } },
        $align: { table: { disable: true } },
        component: { table: { disable: true } },

        direction: { control: { type: 'inline-radio' } },
        justify: { control: { type: 'inline-radio' } },
        align: { control: { type: 'inline-radio' } },

        padding: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingHorizontal: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingVertical: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingTop: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingRight: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingBottom: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        paddingLeft: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },

        spacing: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        spacingHorizontal: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
        spacingVertical: { control: { type: 'inline-radio', options: DISTANCE_OPTIONS } },
    },
} as Meta

interface BoxProps extends StackItemProps {
    num: number
    className?: string
}

function Box({ num, className, ...otherProps }: BoxProps) {
    return (
        <div className={clsx(className, styles[`box${num}`])} {...otherProps}>
            {num}
        </div>
    )
}

// Demo
// ---------------------------

type DemoItem = {
    type: 'box' | 'space' | 'divider'
    num?: number
    size?: Distances
    flex?: boolean
    col?: number
    align?: string
}

interface DemoPaddingProps {
    paddingHorizontal: any
    paddingVertical: any
    paddingTop: any
    paddingRight: any
    paddingBottom: any
    paddingLeft: any
}

interface DemoSpacingProps {
    spacingHorizontal: any
    spacingVertical: any
}

export const Demo: Story<StackProps & DemoPaddingProps & DemoSpacingProps> = ({
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    spacing,
    spacingHorizontal,
    spacingVertical,
    ...args
}) => {
    const [items, setItems] = useState<DemoItem[]>([
        { type: 'box', num: 1 },
        { type: 'box', num: 2 },
        { type: 'box', num: 3 },
    ])

    padding = padding || {
        horizontal: paddingHorizontal,
        vertical: paddingVertical,
        top: paddingTop,
        right: paddingRight,
        bottom: paddingBottom,
        left: paddingLeft,
    }

    spacing = spacing || {
        horizontal: spacingHorizontal,
        vertical: spacingVertical,
    }

    return (
        <div>
            <Stack spacing>
                <Button onClick={() => setItems([...items, { type: 'box', num: 1 }])}>
                    增加 Box 1
                </Button>
                <Button onClick={() => setItems([...items, { type: 'box', num: 2 }])}>
                    增加 Box 2
                </Button>
                <Button onClick={() => setItems([...items, { type: 'box', num: 3 }])}>
                    增加 Box 3
                </Button>
                <Button onClick={() => setItems([...items, { type: 'space' }])}>增加 Space</Button>
                <Button onClick={() => setItems([...items, { type: 'divider' }])}>
                    增加 Divider
                </Button>
                <Button onClick={() => setItems(items.slice(0, items.length - 1))}>减少项</Button>
            </Stack>
            <hr />
            <DemoItemEditor items={items} onChange={setItems} />
            <hr />
            <Stack
                className={styles.demo}
                style={{ height: args.direction === 'vertical' ? '200px' : undefined }}
                padding={padding}
                spacing={spacing}
                {...args}
            >
                {items.map((item, index) =>
                    item.type === 'box' ? (
                        <Box
                            key={index}
                            num={item.num as any}
                            $flex={item.flex}
                            $col={item.col as any}
                            $align={item.align as any}
                        />
                    ) : item.type === 'space' ? (
                        <Space
                            key={index}
                            size={item.size}
                            $flex={item.flex}
                            $col={item.col as any}
                            $align={item.align as any}
                        />
                    ) : item.type === 'divider' ? (
                        <Divider
                            key={index}
                            $flex={item.flex}
                            $col={item.col as any}
                            $align={item.align as any}
                        />
                    ) : null,
                )}
            </Stack>
        </div>
    )
}

function DemoItemEditor({
    items,
    onChange,
}: {
    items: DemoItem[]
    onChange: (items: DemoItem[]) => void
}) {
    function handleChange(index: number, changedProps: Partial<DemoItem>) {
        const newItems = produce(items, (items) => {
            items[index] = { ...items[index], ...changedProps }
        })

        onChange(newItems)
    }

    return (
        <div className={styles.demoItemEditor}>
            <Stack padding={{ vertical: true }} spacing>
                {items.map((item, index) => (
                    <Stack
                        padding
                        spacing="tiny"
                        direction="vertical"
                        className={styles.demoItemEditorSection}
                    >
                        <div>
                            Item {index}, {item.type} {item.num}
                        </div>
                        <hr />
                        {item.type === 'box' ? (
                            <Stack align="center" spacing="tiny">
                                <span>num:</span>
                                <select
                                    value={item.num}
                                    onChange={(event) =>
                                        handleChange(index, { num: Number(event.target.value) })
                                    }
                                >
                                    <option value={1}>box 1</option>
                                    <option value={2}>box 2</option>
                                    <option value={3}>box 3</option>
                                </select>
                            </Stack>
                        ) : null}
                        {item.type === 'space' ? (
                            <Stack align="center" spacing="tiny">
                                <span>size:</span>
                                <select
                                    value={(item.size ?? 'unset').toString()}
                                    onChange={(event) => {
                                        const val = event.target.value
                                        handleChange(index, {
                                            size:
                                                val === 'unset'
                                                    ? false
                                                    : val === 'true'
                                                    ? true
                                                    : (val as any),
                                        })
                                    }}
                                >
                                    {DISTANCE_OPTIONS.map((val) => (
                                        <option
                                            value={
                                                val === false
                                                    ? 'unset'
                                                    : val === true
                                                    ? 'true'
                                                    : val
                                            }
                                        >
                                            {val === false ? 'unset' : val === true ? 'true' : val}
                                        </option>
                                    ))}
                                </select>
                            </Stack>
                        ) : null}
                        <hr />
                        <Stack align="center" spacing="tiny">
                            <span>Flex:</span>
                            <input
                                type="checkbox"
                                checked={!!item.flex}
                                onChange={(event) =>
                                    handleChange(index, { flex: event.target.checked })
                                }
                            />
                        </Stack>
                        <Stack align="center" spacing="tiny">
                            <span>Col:</span>
                            <select
                                value={item.col}
                                onChange={(event) =>
                                    handleChange(index, {
                                        col:
                                            event.target.value === 'unset'
                                                ? undefined
                                                : Number(event.target.value),
                                    })
                                }
                            >
                                <option value={undefined}>unset</option>
                                {new Array(25).fill(0).map((_, index) => (
                                    <option key={index} value={index}>
                                        {index}
                                    </option>
                                ))}
                            </select>
                        </Stack>
                        <Stack align="center" spacing="tiny">
                            <span>Align:</span>
                            <select
                                value={item.align}
                                onChange={(event) =>
                                    handleChange(index, {
                                        align:
                                            event.target.value === 'unset'
                                                ? undefined
                                                : event.target.value,
                                    })
                                }
                            >
                                {[undefined, 'start', 'end', 'center', 'stretch'].map((value) => (
                                    <option key={value} value={value}>
                                        {value === undefined ? 'unset' : value}
                                    </option>
                                ))}
                            </select>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </div>
    )
}
