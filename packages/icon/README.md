---
id: icon
title: Icon
subtitle: 图标
---

Icon 组件提供一组 SVG 格式的图标。

```jsx reactView
import { Check } from '@nami-ui/icon'

export default () => <Check />
```

所有图标如下所示：

```jsx reactView
import {
  Up,
  Down,
  Left,
  Right,
  Check,
  CircleFilled,
  GitHub,
} from '@nami-ui/icon'

export default () => {
  return (
    <IconBoxList
      icons={{
        Up,
        Down,
        Left,
        Right,
        Check,
        CircleFilled,
        GitHub,
      }}
    />
  )
}
```

## "SVG Icon" vs "Icon Font"

Icon 组件之所以选择提供 SVG 格式的图标，而非 "Icon Font"，
是因为我们认为「图标应当是一种图形，而非文字」。_（有关详细的区别，请参阅[这篇文章](https://css-tricks.com/icon-fonts-vs-svg/)）_

当然，"Icon Font" 也是有很多优点的，比如 "Icon Font" 的图标颜色默认即为文本颜色；为了在 SVG 图标中实现这一优点，我们为图标设置了 `fill: currentColor;` 样式，以使图标颜色与其父元素的文本颜色的保持一致。
