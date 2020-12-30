---
name: Radio
displayName: 单选框
group: general
---

# @nami-ui/radio

传统风格的单选框组件；

```jsx
import { Radio } from '@nami-ui/radio'

function Demo() {
    const [value, setValue] = useState('js')

    return (
        <div>
            <Radio label="JavaScript" checked={value === 'js'} onChange={() => setValue('js')} />
            <Radio label="TypeScript" checked={value === 'ts'} onChange={() => setValue('ts')} />
        </div>
    )
}

render(<Demo />)
```

## 禁用

通过设置 `disabled` 属性，可以设置单选框为禁用状态：

```jsx
import { Radio } from '@nami-ui/radio'

render(
    <div>
        <Radio label="JavaScript" disabled />
        <Radio label="TypeScript" disabled defaultChecked />
    </div>,
)
```

## 分组

单选框往往都是成组出现的，而自行实现单选框组的选择逻辑需要写大量模式代码（就像上面示例中的代码），而通过 Radio.Group 组件则可以非常方便地实现分组功能：

```jsx
import { Radio } from '@nami-ui/radio'

function Demo() {
    const [checkedValue, setCheckedValue] = useState('js')

    return (
        <Radio.Group value={checkedValue} onChange={setCheckedValue}>
            <Radio value="js" label="JavaScript (js)" />
            <Radio value="ts" label="TypeScript (ts)" />
            <Radio value="cs" label="CoffeeScript (cs)" />
            <Radio value="as" label="ActionScript (as)" />
        </Radio.Group>
    )
}
```
