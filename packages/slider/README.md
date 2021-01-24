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
    </div>
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

当传入的初值为数值或仅包含一个元素的数组时，表示为单滑块滑动条；若传入包含两个元素的数组，则为双滑块滑动条；若是包含两个以上元素的数组，则为多滑块滑动条，滑块数量依照数组元素的数量，比如：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <Slider defalutValue={0} />
        <Slider defalutValue={[0]} />
        <Slider defalutValue={[0, 1]} />
        <Slider defalutValue={[0, 0.5, 1]} />
    </div>,
)
```

通常情况下，在单滑块滑动条及双滑块滑动条中，用户所选的都是一个区间值，比如在单滑块滑动条中，所选区间为 `[起始值，选中值]`，而在双滑块滑动条中，则为 `[左侧选中值，右侧选中值]`。因此，Slider 组件默认会在这两种模式中高亮所选区间。

若这不是你想要的，那么设置 `separate` 即可（在多滑块滑动条模式时，该属性固定为 `true`）：

```jsx
import { Slider } from '@nami-ui/slider'

render(
    <div>
        <Slider defalutValue={0} separate />
        <Slider defalutValue={[0]} separate />
        <Slider defalutValue={[0, 1]} separate />
        <Slider defalutValue={[0, 0.5, 1]} separate />
    </div>,
)
```
