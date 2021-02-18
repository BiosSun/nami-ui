---
id: button
title: Button
subtitle: 按钮
---

提供最基本的点击交互功能。

```jsx reactView
import { Button } from '@nami-ui/button'

export default () => (
  <Button onClick={() => alert('Hello, World!')}>
    Hello
  </Button>
)
```

## 状态

每个按钮都有 4 个状态：`hover`、`active`、`focus` 和 `disabled`。通常这些状态都是根据用户行为自动切换，但你也可以让按钮强制处于某个状态：

```jsx reactView
import { Button } from '@nami-ui/button'
import { HStack } from '@nami-ui/stack'

export default () => (
  <HStack spacing>
    <Button hover>Hover</Button>
    <Button active>Active</Button>
    <Button focus>Focus</Button>
    <Button disabled>Disabled</Button>
  </HStack>
)
```
