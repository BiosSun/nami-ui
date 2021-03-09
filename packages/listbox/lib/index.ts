import { ListBox, ListBoxProps } from './listbox'
import { ListBoxItem, ListBoxItemProps } from './item'

const ExportedListBox = ListBox as typeof ListBox & {
    Item: typeof ListBoxItem
}

ExportedListBox.Item = ListBoxItem

export { ExportedListBox as ListBox, ListBoxProps, ListBoxItem, ListBoxItemProps }
export * from './listbox-context'
