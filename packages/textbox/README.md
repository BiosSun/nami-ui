---
id: textbox
title: TextBox
subtitle: 文本框
---

用于输入一些简短的文本内容；

```jsx reactView
import { TextBox } from '@nami-ui/textbox'

export default () => {
  const [value, setValue] = useState('')

  return (
    <TextBox
      value={value}
      onChange={setValue}
      placeholder="Please enter some text ..."
    />
  )
}
```

## 占位符

通过设置 `placeholder` 属性，可以在文本框中值为空时显示一段占位文本（仅支持字符串）：

```jsx reactView
import { TextBox } from '@nami-ui/textbox'

export default () => <TextBox placeholder="请输入一些文本" />
```

## 禁用

通过设置 `disabled` 属性，可以设置文本框为禁用状态：

```jsx reactView
import { TextBox } from '@nami-ui/textbox'

export default () => (
  <TextBox disabled defaultValue="disabled" />
)
```
