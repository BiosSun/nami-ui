---
id: styles
title: Styles
subtitle: 样式
---

一组使用 SCSS 编写的基础样式工具库。

## 安装

```bash
yarn add @nami-ui/styles
```

## 使用

在你的 SASS 文件中，按如下方式引入它：

```scss
@use '@nami-ui/styles/index' as nami;
```

其中会提供一组 SASS 变量、函数及混入类。

### 混入

### general-variables()

打印主题风格无关的 CSS 变量（通常都是一些尺寸相关的变量）：

```scss
:root {
  @include nami.general-variables();
}
```

### light-variables()

打印 light 主题相关的 CSS 变量（配色变量）：

```scss
:root {
  @include nami.light-variables();
}
```

### dark-variables()

打印 dark 主题相关的 CSS 变量（配色变量）：

```scss
:root {
  @include nami.dark-variables();
}
```

### variables()

打印 general 及 light 两组 CSS 变量：

```scss
:root {
  @include nami.variables();
  // 等同于：
  // @include nami.general-variables();
  // @include nami.light-variables();
}
```

## 暗黑模式

Nami UI 通过 CSS 变量支持主题风格的切换，默认提供 light 及 dark 两种，除此之外你也可以自行定制其它的。

而对于暗黑模式，因为其实现方式有好几种，且各有优缺点，因此 Nami UI 无法直接提供对暗黑模式的支持，这需要你自己实现，并须在其中使用我们所提供的用于导出 CSS 变量的混入类。

比如通过 `prefers-color-scheme` 媒体查询来实现暗黑模式：

```scss
@use '@nami-ui/styles/index' as nami;

:root {
  @include nami.variables();
}

@media (prefers-color-scheme: dark) {
  :root {
    @include nami.light-variables();
  }
}
```
