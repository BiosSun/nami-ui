---
name: useSlider
displayName: 滑动交互
group: hooks
---

# @nami-ui/use-slider

提供一套滑动交互逻辑，可以用于实现大多数的滑动组件，类似 滑块 或 旋纽 等。

一个完整的 slider 应至少包含如下三个元素：

-   容器（root）：包含其它所有元素，响应指针、滚轮及键盘事件，可以获取焦点；
-   滑轨（rail）：用于限定滑块的滑动区域；
-   滑块（thumb）：指示当前滑动位置及滑动状态。

如下列所示：

```javascript
import clsx from 'clsx'
import styles from './demo.scss'

import { useSlider } from '@nami-ui/use-slider'

function Slider() {
    const [values, setValues] = useState(() => [0, 1])

    const slider = useSlider({
        value: values,
        setValue: setValues,
        moving: (info) => info.px,
    })

    return (
        <div className={styles.container} {...slider.rootProps}>
            <div className={styles.rail} {...slider.railProps}>
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={clsx(styles.thumb, {
                            [styles.activeThumb]: slider.thumb === index,
                        })}
                        style={{
                            left: value * 100 + '%',
                        }}
                        {...slider.thumbProps}
                    />
                ))}
            </div>
        </div>
    )
}
```

`useSlider` 所接收参数及返回值类型定义如下：

```typescript
interface useSlider {
    (props: UseSliderProps): Slider
}

interface UseSliderProps {
    // 一组值，分别对应每个滑块
    value: Value
    // 设置值
    setValue: React.Dispatch<React.SetStateAction<Value>>

    // 数轴
    axis: Axis | { [prop: string]: Axis }

    // 是否禁用
    disabled: boolean

    // 处理指针（鼠标、手指）拖拽事件
    moving: (event: MovingEvent) => ValuePatch

    // 处理滚轮事件
    wheel?: (event: WheelEvent) => ValuePatch

    // 快捷键
    hotkeys?: Hotkey[]
}

interface Slider {
    // 需要分别注入到对应元素上的属性
    rootProps: HTMLAttributes<HTMLElement>
    railProps: HTMLAttributes<HTMLElement>
    thumbProps: HTMLAttributes<HTMLElement>

    // 是否在滑动中
    sliding: boolean

    // 当前正在滑动的滑块索引
    thumb: number | undefined
}

// 每个滑块的值；可以是单个数值，如：`[0, 1]`，
// 也可以是包含一组数值的对象，如：`[ { x: 0, y: 0 }, { x: 1, y: 1 } ]`
type Value = number[] | { [prop: string]: number }[]

// 数轴，用于限定滑块在某个方向上的数值；若滑块值为单个数值，则只能指定一个数轴，
// 而若是包含一组数值的对象，则既可以指定一个通用数轴，也可以分别为每个数值属性指定对应的数轴，
// 如：{ x: { min: 0, max: 100 }, y: { min: 0, max: 60 }  }
interface Axis {
    // 最小值
    min: number

    // 最大值
    max: number

    // 步长
    step?: number

    // 额外数值点
    points?: number[]
}

// 用于更新滑块值，需要在事件处理器中返回，如：
// - 更新到指定数值：`0.2`，或 `{ x: 0.2 }`；
// - 在当前值的基础上加减指定值：`'+0.2'`，或 `{ x: '-0.2' }`；
// - 自定义更新，如：`prevValue => prevValue / 2` 或 `prevValue => ( { x: prevValue.x / 2 } )`
type ValuePatch =
    | number
    | string
    | { [prop: string]: number | string }
    | (value: Value) => Value

// 指针拖拽事件
interface MovingEvent {
    // 指针相对于轨道元素的坐标位置
    x: number
    y: number
    breakX: number
    breakY: number

    // 指针相对于轨道元素的位置百分比
    px: number
    py: number
    breakPX: number
    breakPY: number

    // 指针移动方向
    dirX: 'left' | 'right'
    dirY: 'up' | 'down'

    // 指针移动速度
    velocity: number
}

// 滚轮事件
interface WheelEvent {
    // 滚轮滚动值
    deltaX: number
    deltaY: number
    deltaZ: number

    // 修饰键
    altKey: boolean
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
}

// 快捷键事件
interface Hotkey {
    // 需要监听的快捷键，如： `a, ctrl-a`（特殊值 `ANY`，用于监听任意快捷键）
    keys: string

    // 可选修饰键，如 `{ key: 'ctrl-a', shift: true }` 表示监听快捷键 `ctrl-a` 及 `ctrl-shift-a`。
    shift?: boolean
    ctrl?: boolean
    meta?: boolean
    alt?: boolean

    // 事件处理函数
    handle: (eventData: HotkeyEvent) => ValuePatch | void
}

interface HotkeyEvent {
    // 用户所按下的快捷键，对应在 Hotkey.keys 中配置的某个快捷键
    readonly key: string

    /** 修饰键 */
    readonly ctrl: boolean
    readonly shift: boolean
    readonly meta: boolean
    readonly alt: boolean

    // 停止事件传播
    readonly stopPropagation: () => void

    // 阻止事件默认行为
    readonly preventDefault: () => void

    // 是否已阻止事件默认行为
    readonly defaultPrevented: boolean

    // 是否已匹配并触发某个快捷键
    readonly dispatched: boolean
}
```

这三者的基础样式可如下所示：

```scss
.container {
    width: 400px;
    height: 40px;
    background: #ddd;
}

.rail {
    height: 40px;
    margin: 0 20px;
    position: relative;
}

.thumb {
    width: 40px;
    height: 40px;
    background: #000;

    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-20px, -19px);
}
```
