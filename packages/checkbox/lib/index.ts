import { CheckBox, CheckBoxProps } from './checkbox'
import { CheckBoxGroup, CheckBoxGroupProps } from './checkbox-group'

const ExportedCheckBox = CheckBox as typeof CheckBox & {
    Group: typeof CheckBoxGroup
}

ExportedCheckBox.Group = CheckBoxGroup

export { ExportedCheckBox as CheckBox, CheckBoxProps, CheckBoxGroup, CheckBoxGroupProps }
export * from './checkbox-group-context'
