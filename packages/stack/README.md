---
id: stack
title: Stack
subtitle: 线性布局
---

一个基础的线性布局组件，它是参考 SwiftUI 中 VStack/HStack 并基于 CSS Flex 布局实现的。

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <Stack>
    <Box />
    <Box />
    <Box />
    <Box />
  </Stack>
)
```

## 布局方向

默认所有元素按水平方向布局，通过 direction 参数可以更改为垂直布局或反向布局：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <div>
    <strong>horizontal - 水平布局（默认）</strong>

    <Stack direction="horizontal">
      <Box />
      <Box />
      <Box />
    </Stack>

    <hr />

    <strong>vertical - 垂直布局</strong>

    <Stack direction="vertical">
      <Box />
      <Box />
      <Box />
    </Stack>
  </div>
)
```

另外为了方便使用，我们额外提供了 2 个包装组件：HStack、VStack：

```jsx reactView
import { HStack, VStack } from '@nami-ui/stack'

export default () => (
  <div>
    <strong>HStack - 水平布局</strong>

    <HStack>
      <Box />
      <Box />
      <Box />
    </HStack>

    <hr />

    <strong>VStack - 垂直布局</strong>

    <VStack>
      <Box />
      <Box />
      <Box />
    </VStack>
  </div>
)
```

## 间距

Stack 提供两个间距相关的属性：padding 及 spacing，分别用于控制容器与元素之间的间距，及元素与元素之间的间距，并且和 Space 组件一样，支持 9 种尺寸：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => {
  const size = [
    undefined,
    'micor',
    'mini',
    'tiny',
    'small',
    'middle',
    'large',
    'big',
    'huge',
    'massive',
  ]

  const [padding, setPadding] = useState(undefined)
  const [spacing, setSpacing] = useState(undefined)

  return (
    <>
      <DemoActions>
        <select
          value={padding}
          onChange={(event) => setPadding(event.target.value)}
        >
          {size.map((value) => (
            <option value={value}>{value ?? 'unset'}</option>
          ))}
        </select>
        <select
          value={spacing}
          onChange={(event) => setSpacing(event.target.value)}
        >
          {size.map((value) => (
            <option value={value}>{value ?? 'unset'}</option>
          ))}
        </select>
      </DemoActions>

      <Stack padding={padding} spacing={spacing}>
        <Box />
        <Box />
        <Box />
      </Stack>
    </>
  )
}
```

## 对齐

与对齐相关的也有两个属性：justify 及 align，分别用于控制主轴上的对齐方式，及交叉轴上的对齐方式。它们的默认值和 CSS 属性 justify-content 及 align-items 的默认值相同：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => {
  const justifies = [
    undefined,
    'start',
    'end',
    'center',
    'between',
    'around',
  ]
  const aligns = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
  ]

  const [justify, setJustify] = useState(undefined)
  const [align, setAlign] = useState(undefined)

  return (
    <>
      <DemoActions>
        <select
          value={justify}
          onChange={(event) => setJustify(event.target.value)}
        >
          {justifies.map((value) => (
            <option value={value}>{value ?? 'unset'}</option>
          ))}
        </select>
        <select
          value={align}
          onChange={(event) => setAlign(event.target.value)}
        >
          {aligns.map((value) => (
            <option value={value}>{value ?? 'unset'}</option>
          ))}
        </select>
      </DemoActions>

      <Stack
        spacing="micor"
        justify={justify}
        align={align}
        style={{
          background: 'var(--ifm-color-emphasis-400)',
          height: 70,
        }}
      >
        <Box />
        <Box />
        <Box />
      </Stack>
    </>
  )
}
```

## 弹性布局

默认 Stack 内的所有元素在主轴上仅分配其自身所占用的空间，无论主轴空间是空余还是不足（即 flex: 0 0 auto;）， 但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素变为弹性元素，当主轴上有剩余空间时，它会会自动扩展以填充空间，而当主轴空间不足时，它们又会自动收缩。

在 Stack 组件中，若要实现这一点非常简单（当然有时也不简单），只需给需要弹性伸缩的子元素添加 \$flex 属性即可：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <div>
    <Stack spacing="micor">
      <Box $flex />
      <Box />
      <Box />
    </Stack>

    <Stack spacing="micor">
      <Box $flex />
      <Box />
      <Box $flex />
    </Stack>
  </div>
)
```

## 栅格布局

除了弹性布局之外，我们还提供传统的栅格布局，即将容器空间等分为一定数量的列，其中的元素占据某几列的空间。 该组件中所提供的是 24 列栅格，你只需要在子元素上设置 \$col 属性并指定所占据的列数即可：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <Stack spacing="micor">
    <Box $col={1}>1</Box>
    <Box $col={2}>2</Box>
    <Box $col={3}>3</Box>
    <Box $col={6}>6</Box>
    <Box $col={12}>12</Box>
  </Stack>
)
```

$col 可以和 $flex 同时使用，此时当容器空间不足时，栅格元素会自动收缩：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <Stack spacing="micor">
    <Box />
    <Box $col={12} $flex>
      12
    </Box>
    <Box />
    <Box $col={12} $flex>
      12
    </Box>
    <Box />
  </Stack>
)
```

## 子元素对齐

通过 \$align 属性，我们可以为子元素单独指定其在交叉轴上的对齐方式：

```jsx reactView
import { Stack } from '@nami-ui/stack'

export default () => (
  <div>
    <strong>stretch - 填充</strong>

    <Stack>
      <Box small $align="stretch" />
      <Box large />
      <Box />
    </Stack>

    <hr />
    <strong>start - 顶端对齐</strong>

    <Stack>
      <Box small $align="stretch" $align="start" />
      <Box large />
      <Box />
    </Stack>

    <hr />

    <strong>end - 底端对齐</strong>

    <Stack>
      <Box small $align="stretch" $align="end" />
      <Box large />
      <Box />
    </Stack>

    <hr />

    <strong>center - 中部对齐</strong>

    <Stack>
      <Box small $align="stretch" $align="center" />
      <Box large />
      <Box />
    </Stack>
  </div>
)
```

## 注意事项

1\. 修饰属性 $flex、$col 及 \$align 只能设置在 Stack 组件的直接子元素中，因此像下面的代码是无效的：

```jsx
function Demo() {
    return (
        <Stack>
            <SomeWrapComponent>
                <div $flex >
            </SomeWrapComponent>
        </Stack>
    )
}
```

当然，设置在子元素的组件内也是无效的：

```jsx
function Demo() {
  return (
    <Stack>
      <Item />
    </Stack>
  )
}

function Item() {
  return <div $flex />
}
```

2\. Stack 组件会在子元素上追加一些额外的类名和样式，因此子元素组件必须接收并处理从 props 传入的 className 和 style（只会传入一些 flex 相关的样式属性）：

```jsx
import clsx from 'clsx'

function Demo() {
  return (
    <Stack>
      <Item $flex />
    </Stack>
  )
}

function Item({ className, style, ...otherProps }) {
  return (
    <div
      className={clsx(className, 'own-class-name')}
      style={{ ...style, color: '#fff' }}
      {...otherProps}
    />
  )
}
```

3\. 在使用 $flex 或 $col 时，需要确保子元素组件是支持弹性伸缩的。如果子元素组件仅支持固定宽/高，或仅支持在某个宽/高度区间内，那么就要考虑是改造该组件，还是确实不能将其应用于弹性布局或栅格布局中。
