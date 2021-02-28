---
id: use-slider
title: useSlider
subtitle: 滑动交互
---

提供一套滑动交互逻辑，可以用于实现大多数的滑动组件，类似 滑块 或 旋纽 等。

一个完整的 slider 应至少包含如下三个元素：

- 容器（root）：包含其它所有元素，响应指针、滚轮及键盘事件，可以获取焦点；
- 滑轨（rail）：用于限定滑块的滑动区域；
- 滑块（thumb）：指示当前滑动位置及滑动状态。

具体可查看下面示例的代码。

## 示例

### 横向滑动选择器

```jsx reactView
import { useSlider } from '@nami-ui/use-slider'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    maxWidth: 300,
    height: 40,
    background: '#ddd',
    borderRadius: 20,
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 20,
    right: 20,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: 'translate(-20px, 0)',
    position: 'absolute',
    top: 0,

    // TODO: 不知道这样性能怎么样，有时间可以测试一下
    left: (props) => props.value * 100 + '%',
    background: (props) => (props.sliding ? '#000' : '#777'),
  },
})

export default () => {
  const [value, setValue] = useState([0])

  const slider = useSlider({
    value,
    setValue,
    moving: ({ px }) => px,
  })

  const classes = useStyles({
    value: value[0],
    sliding: slider.sliding,
  })

  return (
    <div className={classes.root} {...slider.rootProps}>
      <div className={classes.rail} {...slider.railProps}>
        <div
          className={classes.thumb}
          {...slider.thumbProps}
        />
      </div>
    </div>
  )
}
```

### 垂直滑动选择器

将横向滑动选择器改为垂直方向非常简单，只需要在 `moving` 中将 `px` 改为 `py`，剩下的的就都是样式上的调整：

```jsx reactView
import { useSlider } from '@nami-ui/use-slider'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    width: 40,
    height: 300,
    background: '#ddd',
    borderRadius: 20,
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: 'translate(0, -20px)',
    position: 'absolute',
    left: 0,

    top: (props) => props.value * 100 + '%',
    background: (props) => (props.sliding ? '#000' : '#777'),
  },
})

export default () => {
  const [value, setValue] = useState([0])

  const slider = useSlider({
    value,
    setValue,
    moving: ({ py }) => py,
  })

  const classes = useStyles({
    value: value[0],
    sliding: slider.sliding,
  })

  return (
    <div className={classes.root} {...slider.rootProps}>
      <div className={classes.rail} {...slider.railProps}>
        <div
          className={classes.thumb}
          {...slider.thumbProps}
        />
      </div>
    </div>
  )
}
```

### 平面滑动选择器

而同时使用 `px` 和 `py`，就可以实现平面滑动选择器了：

```jsx reactView
import { useSlider } from '@nami-ui/use-slider'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    maxWidth: 300,
    height: 200,
    background: '#ddd',
    borderRadius: 20,
    position: 'relative',
  },
  rail: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: 'translate(-20px, -20px)',
    position: 'absolute',

    top: (props) => props.value.y * 100 + '%',
    left: (props) => props.value.x * 100 + '%',
    background: (props) => (props.sliding ? '#000' : '#777'),
  },
})

export default () => {
  const [value, setValue] = useState([{ x: 0, y: 0 }])

  const slider = useSlider({
    value,
    setValue,
    moving: ({ px, py }) => ({ x: px, y: py }),
  })

  const classes = useStyles({
    value: value[0],
    sliding: slider.sliding,
  })

  return (
    <div className={classes.root} {...slider.rootProps}>
      <div className={classes.rail} {...slider.railProps}>
        <div
          className={classes.thumb}
          {...slider.thumbProps}
        />
      </div>
    </div>
  )
}
```

### 表格行列数选择器（常用于富文本编辑器）

```jsx reactView
import { useSlider } from '@nami-ui/use-slider'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

const COL_SIZE = 26
const COL_SPACE = 1
const MIN_LEN = 3
const MAX_LEN = 10

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    width: (props) =>
      props.collen * COL_SIZE +
      (props.collen - 1) * COL_SPACE,
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    display: 'flex',
    marginTop: COL_SPACE,
    '&:first-child': {
      marginTop: 0,
      '& $col': {
        background: '#f0f0f0',
      },
    },
  },
  col: {
    width: COL_SIZE,
    height: COL_SIZE,
    border: '1px solid #ddd',
    marginLeft: COL_SPACE,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  selectedRow: {
    '& $selectedCol': {
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgb(11 142 208 / 15%)',
      },
    },
  },
  selectedCol: {},
})

export default () => {
  const [value, setValue] = useState([{ row: 2, col: 2 }])

  const slider = useSlider({
    value,
    setValue,
    axis: { step: 1, min: 0, max: MAX_LEN },
    moving: ({ breakX: x, breakY: y }) => ({
      row: Math.ceil(y / (COL_SIZE + COL_SPACE)),
      col: Math.ceil(x / (COL_SIZE + COL_SPACE)),
    }),
  })

  const { row, col } = value[0]
  const rowlen = Math.max(MIN_LEN, row)
  const collen = Math.max(MIN_LEN, col)

  const classes = useStyles({ row, col, rowlen, collen })

  const cols = []
  for (let i = 1; i <= collen; i++) {
    cols.push(
      <div
        key={i}
        className={clsx(classes.col, {
          [classes.selectedCol]: i <= col,
        })}
      />,
    )
  }

  const rows = []
  for (let i = 1; i <= rowlen; i++) {
    rows.push(
      <div
        key={i}
        className={clsx(classes.row, {
          [classes.selectedRow]: i <= row,
        })}
      >
        {cols}
      </div>,
    )
  }

  return (
    <div className={classes.root} {...slider.rootProps}>
      {rows}
      <div className={classes.rail} {...slider.railProps}>
        <div
          className={classes.thumb}
          {...slider.thumbProps}
        />
      </div>
    </div>
  )
}
```

## 类型定义

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
// - 更新到下一个或上一个值：`'next'` 或 `{ x: 'prev' }`；
// - 在当前值的基础上加减指定值：`'+0.2'`，或 `{ x: '-0.2' }`；
// - 自定义更新，如：`prevValue => prevValue / 2` 或 `prevValue => ( { x: prevValue.x / 2 } )`
type ValuePatch =
    | number
    | 'prev' | 'next' | string
    | { [prop: string]: number | 'prev' | 'next' | string }
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

## 基础样式

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
