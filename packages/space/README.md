---
id: space
title: Space
subtitle: 空隔符
---

用于在两个元素之间插入一段空白间隔。

```jsx reactView
import { Space } from '@nami-ui/space'

export default () => (
  <>
    <Box>Hello</Box>
    <Space />
    <Box>World</Box>
  </>
)
```

## 方向

通常，我们建议在 Stack 这种布局组件中使用这个 Space 组件，因为当其被放置在布局组件中时，它会自动根据布局方向调整自己的样式（水平/垂直）：

```jsx reactView
import { HStack } from '@nami-ui/stack'
import { Space } from '@nami-ui/space'

export default () => (
  <HStack>
    <Box>Item</Box>
    <Box>Item</Box>
    <Space />
    <Box>Item</Box>
  </HStack>
)
```

```jsx reactView
import { VStack } from '@nami-ui/stack'
import { Space } from '@nami-ui/space'

export default () => (
  <VStack>
    <Box>Item</Box>
    <Box>Item</Box>
    <Space />
    <Box>Item</Box>
  </VStack>
)
```

当然，你也可以不将其放在布局组件中，此时你可以通过设置 `direction` 属性来控制它的方向：

```jsx reactView
import { Space } from '@nami-ui/space'

export default () => (
  <div style={{ display: 'flex' }}>
    <Box>Hello</Box>
    <Space direction="vertical" />
    <Box>World</Box>
  </div>
)
```

但正如上例中所示，因为它是一个块级元素组件，其兄弟元素位于其上下方而不是左右，所以仅是将其改为垂直空隔符并没有任何意义，你同时还需要使用 flex、grid 或其它布局方式来控制空隔符及其兄弟元素的位置。

## 尺寸

该组件丧心病狂地提供了 9 个空隔符的尺寸：

```jsx reactView
import { Space } from '@nami-ui/space'

export default () => (
  <>
    <Box small transparent>
      micor 1px
    </Box>
    <Space
      size="micor"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      mini 2px
    </Box>
    <Space
      size="mini"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      tiny 4px
    </Box>
    <Space
      size="tiny"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      small 8px
    </Box>
    <Space
      size="small"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      middle 12px (default)
    </Box>
    <Space
      size="middle"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      large 16px
    </Box>
    <Space
      size="large"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      big 24px
    </Box>
    <Space
      size="big"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      huge 36px
    </Box>
    <Space
      size="huge"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />

    <Box small transparent>
      massive 60px
    </Box>
    <Space
      size="massive"
      style={{ background: 'var(--ifm-color-emphasis-600)' }}
    />
  </>
)
```

当然，如果上面这些都不是你想要的，那么可以通过设置 `--nami-space--size` 变量来自定义需要的尺寸：

```scss
.my-divider {
  --nami-space--size: 20px;
}
```
