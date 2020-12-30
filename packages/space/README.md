---
name: Space
displayName: 空隔符
group: general
---

# @nami-ui/space

用于在两个元素之间插入一段空白间隔。

```jsx
import { Space } from '@nami-ui/space'

render(
    <>
        Hello <Space /> World
    </>,
)
```

## 方向

通常，我们建议在 Stack 这种布局组件中使用这个 Space 组件，因为当其被放置在布局组件中时，它会自动根据布局方向调整自己的样式（水平/垂直）：

```jsx
import { HStack } from '@nami-ui/stack'
import { Space } from '@nami-ui/space'

render(
    <HStack>
        <div>Item</div>
        <div>Item</div>
        <Space />
        <div>Item</div>
    </HStack>,
)
```

```jsx
import { VStack } from '@nami-ui/stack'
import { Space } from '@nami-ui/space'

render(
    <VStack>
        <div>Item</div>
        <div>Item</div>
        <Space />
        <div>Item</div>
    </VStack>,
)
```

当然，你也可以不将其放在布局组件中，此时你可以通过设置 `direction` 属性来控制它的方向：

```jsx
import { Space } from '@nami-ui/space'

render(
    <>
        Hello <Space direction="vertical" /> World
    </>,
)
```

但正如上例中所示，因为它是一个块级元素组件，其兄弟元素位于其上下方而不是左右，所以仅是将其改为垂直空隔符并没有任何意义，你同时还需要使用 flex、grid 或其它布局方式来控制空隔符及其兄弟元素的位置。

## 尺寸

该组件丧心病狂地提供了 9 个空隔符的尺寸：

```jsx
import { Space } from '@nami-ui/space'

render(
    <>
        <label>micor 1px</label>
        <Space size="micor" />

        <label>mini 2px</label>
        <Space size="mini" />

        <label>tiny 4px</label>
        <Space size="tiny" />

        <label>small 8px</label>
        <Space size="small" />

        <label>middle 12px (default)</label>
        <Space size="middle" />

        <label>large 16px</label>
        <Space size="large" />

        <label>big 24px</label>
        <Space size="big" />

        <label>huge 36px</label>
        <Space size="huge" />

        <label>massive 60px</label>
        <Space size="massive" />
    </>,
)
```

当然，如果上面这些都不是你想要的，那么可以通过设置 `--nami-space--size` 变量来自定义需要的尺寸：

```scss
.my-divider {
    --nami-space--size: 20px;
}
```
