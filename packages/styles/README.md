# @nami-ui/styles

一组 Nami 组件通用的 **CSS 变量** 及 **SASS 辅助工具**。

## CSS 变量

在你的 SASS 文件中，按如下方式引入它：

```scss
@import '@nami-ui/styles/variables.scss';
```

这会在 `:root` 上定义一组 CSS 变量。

## SASS 辅助工具

在你的 SASS 文件中，按如下方式引入它：

```scss
@use '@nami-ui/styles/index' as *; // or nami
```

其中会提供一组 SASS 变量、函数及混入类。

### 函数

#### let(\$name)

使用 Nami 的 CSS 变量：

```scss
.box {
    height: let(box-base-min-height);
}
```

```css
.box {
    height: var(--nami-box-base-min-height, 34px);
}
```
