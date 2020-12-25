---
name: Button
displayName: 按钮
group: general
---

提供最基本的点击交互功能。

```jsx
import { Button } from '@nami-ui/button'

render(<Button onClick={() => alert('Hello, World!')}>Text</Button>)
```

## 状态

每个按钮都有 4 个状态：`hover`、`active`、`focus` 和 `disabled`。通常这些状态都是根据用户行为自动切换，但你也可以让按钮强制处于某个状态：

```jsx
import { Button } from '@nami-ui/button'

render(
    <>
        <Button hover>Hover</Button>
        <Button active>Active</Button>
        <Button focus>Focus</Button>
        <Button disabled>Disabled</Button>
    </>,
)
```
