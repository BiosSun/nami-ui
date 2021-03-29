---
id: checkbox
title: CheckBox
subtitle: 复选框
---

传统「CheckBox」风格的切换选择组件；

```jsx reactView
import { CheckBox } from '@nami-ui/checkbox'

export default () => {
  const [checked, setChecked] = useState(false)

  return (
    <CheckBox
      label="Check Box"
      checked={checked}
      onChange={setChecked}
    />
  )
}
```

## 禁用

通过设置 `disabled` 属性，可以设置复选框为禁用状态：

```jsx reactView
import { CheckBox } from '@nami-ui/checkbox'

export default () => (
  <div>
    <CheckBox label="Check Box" disabled />
    <CheckBox label="Check Box" disabled defaultChecked />
  </div>
)
```

## 只读

而通过设置 `readOnly` 属性，则可以设置其为只读状态：

```jsx reactView
import { CheckBox } from '@nami-ui/checkbox'

export default () => (
  <div>
    <CheckBox label="Check Box" readOnly />
    <CheckBox label="Check Box" readOnly defaultChecked />
  </div>
)
```

## 分组

通常，复选框组件都是成组出现，以供用户在多个可选项中挑选一些选项。而通过额外提供的 CheckBox.Group 组件，可以非常方便地实现分组功能：

```jsx reactView
import { CheckBox } from '@nami-ui/checkbox'

export default () => {
  const [checkedValues, setCheckedValues] = useState([
    'ts',
    'as',
  ])

  return (
    <CheckBox.Group
      value={checkedValues}
      onChange={setCheckedValues}
    >
      <CheckBox value="js" label="JavaScript (js)" />
      <CheckBox value="ts" label="TypeScript (ts)" />
      <CheckBox value="cs" label="CoffeeScript (cs)" />
      <CheckBox value="as" label="ActionScript (as)" />
    </CheckBox.Group>
  )
}
```
