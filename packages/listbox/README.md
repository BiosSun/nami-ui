---
id: listbox
title: ListBox
subtitle: 选择列表
---

用于从一组数据中选择一条或多条数据。

```jsx reactView
import { ListBox } from '@nami-ui/listbox'

export default () => {
  const [value, setValue] = useState('js')

  return (
    <ListBox value={value} onChange={setValue}>
      <ListBox.Item value="js" label="JavaScript (js)" />
      <ListBox.Item value="ts" label="TypeScript (ts)" />
      <ListBox.Item value="cs" label="CoffeeScript (cs)" />
      <ListBox.Item value="as" label="ActionScript (as)" />
    </ListBox>
  )
}
```

## 多选

通过设置 `multiple` 属性，可以开启多选，此时 `value` 需要改为数组类型。

```jsx reactView
import { ListBox } from '@nami-ui/listbox'

export default () => {
  const [values, setValues] = useState(['js', 'cs'])

  return (
    <ListBox value={values} onChange={setValues} multiple>
      <ListBox.Item value="js" label="JavaScript (js)" />
      <ListBox.Item value="ts" label="TypeScript (ts)" />
      <ListBox.Item value="cs" label="CoffeeScript (cs)" />
      <ListBox.Item value="as" label="ActionScript (as)" />
    </ListBox>
  )
}
```

## 显示单/复选框

通过设置 `check` 属性，可以在每个选项前显示一个单/复选框（根据是否多选自动切换）。

单选框：

```jsx reactView
import { ListBox } from '@nami-ui/listbox'

export default () => {
  const [value, setValue] = useState('js')

  return (
    <ListBox value={value} onChange={setValue} check>
      <ListBox.Item value="js" label="JavaScript (js)" />
      <ListBox.Item value="ts" label="TypeScript (ts)" />
      <ListBox.Item value="cs" label="CoffeeScript (cs)" />
      <ListBox.Item value="as" label="ActionScript (as)" />
    </ListBox>
  )
}
```

复选框：

```jsx reactView
import { ListBox } from '@nami-ui/listbox'

export default () => {
  const [values, setValues] = useState(['js', 'cs'])

  return (
    <ListBox
      value={values}
      onChange={setValues}
      multiple
      check
    >
      <ListBox.Item value="js" label="JavaScript (js)" />
      <ListBox.Item value="ts" label="TypeScript (ts)" />
      <ListBox.Item value="cs" label="CoffeeScript (cs)" />
      <ListBox.Item value="as" label="ActionScript (as)" />
    </ListBox>
  )
}
```

也许你会感觉这样就和 CheckBox.Group 及 Radio.Group 重复了；没错，你的感觉是对的，但它们相似，却并不相同，这之间的区别，需要你分辨清楚。至于应该用哪个，那这就是你的事了。