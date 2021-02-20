# Contributing to Nami UI

在该项目中，使用 [monorepo](http://www.drmaciver.com/2016/10/why-you-should-use-a-single-repository-for-all-your-companys-projects/) 方式来管理组件，每个组件对应一个包，并发布在 `@nami-ui/*` 作用域下。

该项目使用 [yarn](https://yarnpkg.com/) 及 [lerna](https://github.com/lerna/lerna) 来维护这些包（之所以使用 yarn 而非 npm，是因为需要使用 yarn 提供的 [Workspaces](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) 特性）。

因此在开发该项目之前，请先确保已安装 yarn，并已[开启 workspaces 支持](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/#setting-up-workspaces)。

## Pacakge scripts

安装项目依赖：

```bash
yarn bootstrap
```

清理项目依赖：

```bash
yarn clean
```

启动本地文档服务：

```bash
yarn website
```

启动 storybook 服务：

```bash
yarn storybook
```

发布版本：

```bash
yarn release
```

发布文档：

```bash
yarn release:website
```