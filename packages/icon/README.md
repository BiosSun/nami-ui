---
name: Icon
displayName: 图标
group: general
---

# @nami-ui/icon

Icon 组件提供一组 SVG 格式的图标。

```jsx
import { Check } from '@nami-ui/icon'

render(<Check />)
```

所有图标如下所示：

```jsx
import { Up, Down, Left, Right, Check, GitHub } from '@nami-ui/icon'

function IconBoxList({ children }) {
    return <ul className="icon-box-list">{children}</ul>
}

function IconBox({ Icon }) {
    return (
        <li className="icon-box">
            <Icon />
            <span className="icon-box__name">{Icon.displayName || Icon.name}</span>
        </li>
    )
}

const Icons = [Up, Down, Left, Right, Check, GitHub]

render(
    <IconBoxList>
        {Icons.map((Icon) => (
            <IconBox Icon={Icon} />
        ))}
    </IconBoxList>,
)
```

## "SVG Icon" vs "Icon Font"

Icon 组件之所以选择提供 SVG 格式的图标，而非 "Icon Font"，
是因为我们认为「图标应当是一种图形，而非文字」。_（有关详细的区别，请参阅[这篇文章](https://css-tricks.com/icon-fonts-vs-svg/)）_

当然，"Icon Font" 也是有很多优点的，比如 "Icon Font" 的图标颜色默认即为文本颜色；为了在 SVG 图标中实现这一优点，我们为图标设置了 `fill: currentColor;` 样式，以使图标颜色与其父元素的文本颜色的保持一致。
