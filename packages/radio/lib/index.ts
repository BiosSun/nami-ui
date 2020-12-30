import { Radio, RadioProps } from './radio'
import { RadioGroup, RadioGroupProps } from './radio-group'

const ExportedRadio = Radio as typeof Radio & {
    Group: typeof RadioGroup
}

ExportedRadio.Group = RadioGroup

export { ExportedRadio as Radio, RadioProps, RadioGroup, RadioGroupProps }
export * from './radio-group-context'
