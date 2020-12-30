---
name: CheckBox
displayName: 复选框
group: general
---

# @nami-ui/checkbox

传统「CheckBox」风格的切换选择组件；

```jsx
import { CheckBox } from '@nami-ui/checkbox'

function Demo() {
    const [checked, setChecked] = useState(false)
    return <CheckBox label="Check Box" checked={checked} onChange={setChecked} />
}

render(<Demo />)
```

## 禁用

通过设置 `disabled` 属性，可以设置复选框为禁用状态：

```jsx
import { CheckBox } from '@nami-ui/checkbox'

render(
    <div>
        <CheckBox label="Check Box" disabled />
        <CheckBox label="Check Box" disabled defaultChecked />
    </div>
)
```

## 分组

通常，复选框组件都是成组出现，以供用户在多个可选项中挑选一些选项。而通过额外提供的 CheckBox.Group 组件，可以非常方便地实现分组功能：

```jsx
import { CheckBox } from '@nami-ui/checkbox';

function Demo() {
    const [checkedValues, setCheckedValues] = useState(['ts', 'as']);

    return (
        <CheckBox.Group value={checkedValues} onChange={setCheckedValues}>
            <CheckBox value="js" label="JavaScript (js)" />
            <CheckBox value="ts" label="TypeScript (ts)" />
            <CheckBox value="cs" label="CoffeeScript (cs)" />
            <CheckBox value="as" label="ActionScript (as)" />
        </CheckBox.Group>
    )
}
```