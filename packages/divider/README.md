---
id: divider
title: Divider
subtitle: 分隔线
---

用于在两个元素之间插入一条分隔线。

```jsx reactView
import { Divider } from '@nami-ui/divider'

export default () => (
  <>
    Hello <Divider /> World
  </>
)
```

## 方向

通常建议在 Stack 布局组件中使用 Divider，当其被放置在布局组件中时，它将会自动根据布局方向调整自己的样式（水平/垂直）：

```jsx reactView
import { HStack } from '@nami-ui/stack'
import { Divider } from '@nami-ui/divider'

export default () => (
  <HStack>
    <div>Item</div>
    <div>Item</div>
    <Divider />
    <div>Item</div>
  </HStack>
)
```

```jsx reactView
import { VStack } from '@nami-ui/stack'
import { Divider } from '@nami-ui/divider'

export default () => (
  <VStack>
    <div>Item</div>
    <div>Item</div>
    <Divider />
    <div>Item</div>
  </VStack>
)
```

当然，你也可以不将其放在布局组件中，此时你可以通过设置 `direction` 属性来控制它的方向：

```jsx reactView
import { Divider } from '@nami-ui/divider'

export default () => (
  <>
    Hello <Divider direction="vertical" /> World
  </>
)
```

但正如上例中所示，因为它是一个块级元素组件，其兄弟元素位于其上下方而不是左右，所以仅是将其改为垂直分隔线并没有任何意义，你同时还需要使用 flex、grid 或其它布局方式来控制分隔线及其兄弟元素的位置。

## 长度

当作为水平分隔线时，其长度为 `100%`，而作为垂直分隔线时，则变为 `1em + 2px`，如果这个长度不是你需要的，那么可以通过 CSS 变量来更改它：

```scss
.my-divider {
  --nami-divider--length: 20px;
}
```

注意，当在 Stack 组件中，且其 align 置为默认值 `stretch` 时，受些影响，分隔符的长度将与容器交叉轴的长度相同，此时单独将其 align 置为其它值即可：

```jsx  reactView
import { HStack } from '@nami-ui/stack'
import { Divider } from '@nami-ui/divider'

export default () => (
  <HStack spacing>
    <div>Item</div>
    <div>Item</div>
    <Divider $align="center" />
    <div>Item</div>
  </HStack>
)
```

## 颜色

你可以通过设置 CSS 变量来改变分隔线的颜色：

```scss
.my-divider {
  --nami-divider--background: #f5222d;
}
```
