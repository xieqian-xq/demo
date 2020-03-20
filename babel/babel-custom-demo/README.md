# babel，一个js编译器

## 一、`@babel/preset-env` 配置

### `targets`

选择需要编译的目标浏览器

### `modules`

启用将 `ES6模块语法` 转换为其他模块类型的功能。

可选配置有 `"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`，默认为`"auto"`。

### `useBuiltIns`

此选项配置如何 `@babel/preset-env` 处理 `polyfill`

### `corejs`

指定特定的 `corejs` 版本

## 二、`@babel/preset-env` 和 `@babel/polyfill` (`core-js`) 的区别

`@babel/preset-env` 是 `babel` 提供的一个预设插件。

当某个语法不受浏览器支持时，就会引入相应的语句。

如：当浏览器不支持 `Promise` 语法时，该预设会为引入如下代码：

```js
import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
```

显而易见，预设插件只提供引入对应的语句，不提供具体的兼容实现代码，即`polyfill`。

而`@babel/polyfill` (`core-js`) 就是一个提供`polyfill`的包。
