---
id: popup
title: Popup
subtitle: 弹出层
---

用于在指定目标（元素、指针、视口等）的附近展示一个弹出层。

```jsx reactView
import { Popup } from '@nami-ui/popup'

export default () => {
  return (
    <Popup my="center" at="center" of={<button>按钮</button>}>
      Tooltip
    </Popup>
  )
}
```
