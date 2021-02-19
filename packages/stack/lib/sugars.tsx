import { Stack, StackProps } from './stack'

type StackSugarProps = Omit<StackProps, 'direction'>

export function HStack(props: StackSugarProps) {
    return <Stack {...props} direction="horizontal" />
}

export function VStack(props: StackSugarProps) {
    return <Stack {...props} direction="vertical" />
}
