import React from 'react'
import { Stack, StackProps } from './stack'

type StackSugarProps = Omit<StackProps, 'direction'>

export function HLinear(props: StackSugarProps) {
    return <Stack {...props} direction="horizontal" />
}

export function VLinear(props: StackSugarProps) {
    return <Stack {...props} direction="vertical" />
}
