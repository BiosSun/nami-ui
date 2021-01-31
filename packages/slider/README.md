---
name: Slider
displayName: 滑动条
group: general
---

# @nami-ui/slider

用于在给定的一个数值区间中选择某个数值。

```jsx
import { Slider } from '@nami-ui/slider'

function Demo() {
    const [value, setValue] = useState(0)
    return <Slider value={value} onChange={setChecked} />
}

render(<Demo />)
```

## 禁用

通过设置 `disabled` 属性，可以设置滑动条为禁用状态：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <Slider disabled defaultValue={0} />
        <Slider disabled defaultValue={0.5} />
        <Slider disabled defaultValue={1} />
    </div>,
)
```

## 方向

可能通过设置 `vertical` 将滑动条切换为垂直方向，或者设置 `reverse` 来切换为反向滑动：

```jsx
import { HStack, VStack } from '@nami-ui/stack'
import { Slider } from '@nami-ui/slider'

render(
    <HStack spacing>
        <VStack spacing>
            <Slider />
            <Slider reverse />
        </VStack>

        <Slider vertical />
        <Slider vertical reverse />
    </HStack>,
)
```

## 区间

可以通过设置 `min`、`max`、`step` 及 `points` 来定制数值区间，默认为 `{ min: 0, max: 1 }`：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <label>min: 0, max: 100</label>
        <Slider min={0} max={100} />

        <label>min: 0, max: 100, step: 10</label>
        <Slider min={0} max={100} step={10} />

        <label>min: 0, max: 100, points: 0, 27, 38, 56, 72, 94</label>
        <Slider min={0} max={100} points={[0, 27, 38, 56, 72, 94]} />

        <label>min: 0, max: 100, step: 10, points: 0, 27, 38, 56, 72, 94</label>
        <Slider min={0} max={100} step={10} points={[0, 27, 38, 56, 72, 94]} />
    </div>,
)
```

另外，可以通过设置 `marks` 来显示 step 和 points 对应的点位：

```jsx
import { Slider } from '@nami-ui/slider'
render(<Slider min={0} max={100} step={10} points={[0, 27, 38, 56, 72, 94]} marks />)
```

`marks` 可以配置仅显示 step 对应的点位，或仅显示 points 的：

```jsx
import { Slider } from '@nami-ui/slider'
render(
    <div>
        <label>marks: step</label>
        <Slider min={0} max={100} step={10} points={[0, 27, 38, 56, 72, 94]} marks="step" />

        <label>marks: points</label>
        <Slider min={0} max={100} step={10} points={[0, 27, 38, 56, 72, 94]} marks="points" />
    </div>,
)
```

以及如果需要的话，还可以通过设置 `pointMarkLabel` 来定制 point 点位下的标签内容及样式：

```jsx
import clsx from 'clsx'
import { Slider } from '@nami-ui/slider'

function PointLabel({ value, active, className, ...otherProps }) {
    return (
        <span className={clsx('point-label', { active }, className)} {...otherProps}>
            {value}°C
        </span>
    )
}
```

## 多滑块

根据滑块数量的不同，通常滑动条可以分为三种类型：

-   单滑块滑动条，仅有一个滑块；
-   双滑块滑动条，仅有两个滑块；
-   多滑块滑动条，有三个或三个以上滑块。

这根据所传入值的数量来决定，比如：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <Slider defalutValue={[0]} /> // or: single 0
        <Slider defalutValue={[0, 1]} />
        <Slider defalutValue={[0, 0.5, 1]} />
    </div>,
)
```

通常情况下，在单滑块滑动条及双滑块滑动条中，用户所选的都是一个区间值，比如在单滑块滑动条中，所选区间为 `[起始值，选中值]`，而在双滑块滑动条中，则为 `[左侧选中值，右侧选中值]`，而且有时我们会希望在 UI 上高亮所选区间，而这可以通过设置 `range` 属性来实现：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <Slider defalutValue={0} range />
        <Slider defalutValue={[0, 1]} range />
    </div>,
)
```

range 属性仅在单滑块或双滑块时有效，而在多滑块滑动条中，该属性固定为 false。

另外还请注意，在双滑块中开启 `range` 属性后，所传入的值应当是有序的，当然 `onChange` 事件中返回的值也会是有序的。

## 交互

该滑动条组件除支持指针（鼠标、手指）拖拽之外，还支持滚轮及快捷键（仅当组件获取到焦点时支持）。

