---
name: Space
displayName: 线性布局
group: general
---

# `@nami-ui/stack`

一个基础的线性布局组件，它是参考 SwiftUI 中 VStack/HStack 并基于 CSS Flex 布局实现的。

```jsx
import { Stack } from 'nami'

render(
    <Stack>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
    </Stack>,
)
```

## 布局方向

默认所有元素按水平方向布局，通过 direction 参数可以更改为垂直布局或反向布局：

```jsx
import { Stack } from '@nami-ui/stack'

render(
    <div>
        <strong>horizontal - 水平布局（默认）</strong>

        <Stack direction="horizontal">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Stack>

        <hr />

        <strong>vertical - 垂直布局</strong>

        <Stack direction="vertical">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Stack>
    </div>,
)
```

另外为了方便使用，我们额外提供了 2 个包装组件：HStack、VStack：

```jsx
import { HStack, VStack } from '@nami-ui/stack'

render(
    <div>
        <strong>HStack - 水平布局</strong>

        <HStack>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </HStack>

        <hr />

        <strong>VStack - 垂直布局</strong>

        <VStack>
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </VStack>
    </div>,
)
```

## 间距

Stack 提供两个间距相关的属性：padding 及 spacing，分别用于控制容器与元素之间的间距，及元素与元素之间的间距，并且和 Space 组件一样，支持 9 种尺寸：

```jsx
import { Stack } from '@nami-ui/stack'

const size = ['micor', 'mini', 'tiny', 'small', 'middle', 'large', 'big', 'huge', 'massive']

function Template() {
    const [padding, setPadding] = useState(undefined)
    const [spacing, setSpacing] = useState(undefined)

    return (
        <>
            <DemoActions>
                <Select options={size} value={padding} onChange={setPadding} clearable />
                <Select options={size} value={spacing} onChange={setSpacing} clearable />
            </DemoActions>

            <Stack padding={padding} spacing={spacing}>
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </Stack>
        </>
    )
}
```

## 对齐

与对齐相关的也有两个属性：justify 及 align，分别用于控制主轴上的对齐方式，及交叉轴上的对齐方式。它们的默认值和 CSS 属性 justify-content 及 align-items 的默认值相同：

```jsx
import { Stack } from '@nami-ui/stack'

const justifies = ['start', 'end', 'center', 'between', 'around']
const aligns = ['start', 'end', 'center', 'stretch']

function Template() {
    const [justify, setJustify] = useState(undefined)
    const [align, setAlign] = useState(undefined)

    return (
        <>
            <DemoActions>
                <Select options={justifies} value={justify} onChange={setJustify} clearable />
                <Select options={aligns} value={align} onChange={setAlign} clearable />
            </DemoActions>

            <Stack justify={justify} align={align}>
                <div className="box" />
                <div className="box" />
                <div className="box" />
            </Stack>
        </>
    )
}
```

## 弹性布局

默认 Stack 内的所有元素在主轴上仅分配其自身所占用的空间，无论主轴空间是空余还是不足（即 flex: 0 0 auto;）， 但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素变为弹性元素，当主轴上有剩余空间时，它会会自动扩展以填充空间，而当主轴空间不足时，它们又会自动收缩。

在 Stack 组件中，若要实现这一点非常简单（当然有时也不简单），只需给需要弹性伸缩的子元素添加 \$flex 属性即可：

```jsx
import { Stack } from '@nami-ui/stack'

render(
    <div>
        <Stack>
            <div className="box" $flex />
            <div className="box" />
            <div className="box" />
        </Stack>

        <Stack>
            <div className="box" $flex />
            <div className="box" />
            <div className="box" $flex />
        </Stack>
    </div>,
)
```

## 栅格布局

除了弹性布局之外，我们还提供传统的栅格布局，即将容器空间等分为一定数量的列，其中的元素占据某几列的空间。 该组件中所提供的是 24 列栅格，你只需要在子元素上设置 \$col 属性并指定所占据的列数即可：

```jsx
import { Stack } from '@nami-ui/stack'

render(
    <div>
        <Stack>
            <div className="box" $col={1}>
                1
            </div>
            <div className="box" $col={2}>
                2
            </div>
            <div className="box" $col={3}>
                3
            </div>
            <div className="box" $col={6}>
                6
            </div>
            <div className="box" $col={12}>
                12
            </div>
        </Stack>
    </div>,
)
```

$col 可以和 $flex 同时使用，此时当容器空间不足时，栅格元素会自动收缩：

```jsx
import { Stack } from '@nami-ui/stack'

render(
    <div>
        <Stack>
            <div className="box"></div>
            <div className="box" $col={12} $flex>
                12
            </div>
            <div className="box"></div>
            <div className="box" $col={12} $flex>
                12
            </div>
            <div className="box"></div>
        </Stack>
    </div>,
)
```

## 子元素对齐

通过 \$align 属性，我们可以为子元素单独指定其在交叉轴上的对齐方式：

```jsx
import { Stack } from '@nami-ui/stack'

render(
    <div>
        <strong>stretch - 填充</strong>

        <Stack align="end">
            <div className="box box-h-small" $align="stretch" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Stack>

        <hr />
        <strong>start - 顶端对齐</strong>

        <Stack>
            <div className="box box-h-small" $align="start" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Stack>

        <hr />

        <strong>end - 底端对齐</strong>

        <Stack>
            <div className="box box-h-small" $align="end" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Stack>

        <hr />

        <strong>center - 中部对齐</strong>

        <Stack>
            <div className="box box-h-small" $align="center" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Stack>
    </div>,
)
```

## 注意事项

1\. 修饰属性 $flex、$col 及 \$align 只能设置在 Stack 组件的直接子元素中，因此像下面的代码是无效的：

```js
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

```js
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

```js
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
