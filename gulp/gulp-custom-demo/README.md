# 在Gulp中遇到的问题

## 1、`less`、`scss` 引入`css`

实际上并没有把文件内容引入进来，而是编辑成了

```css
@import url("css文件");
```

很显然，这不是我们需要的。

在`less`这里，我找到了一个解决方法，通过关键字的方式，指示`less`如何引入文件，如下:

```css
@import (inline) "normalize.css";
@import (less) "reset-css";
```

而在`scss`这边，暂时还没有找到合适的方法，只能先把文件内容拷贝到`.scss`文件中
