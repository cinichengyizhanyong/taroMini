## 概述

小程序京东框架基础模板

## 使用

生成新项目

```
git clone git@git.jz.cn:jz-frontend/taro-project-template.git <YOU_DIR>
cd <YOU_DIR>
git remote rename origin old-origin
git remote add origin <YOU_GIT_LAB_ADDRESS>
git push -u origin --all
```

## 特性

1. [多模板支持](https://github.com/NervJS/taro/pull/2507)
1. 集成常用组件
1. 全局store支持
1. api远程请求封装
1. form组件输入支持
1. 集成会员验证(code/头像/电话)
1. 生成模板文件


## 生成模板文件

`npm run tep DIR PAGE`

1. 生成page组件
    ```
    npm run tpl test demo
    # 生成: src/page/test/demo/demo{jsx, scss}
    ```
1. 生成widget组件
    ```
    npm run tpl test demo widget
    # 生成: src/page/test/demo/widget/demo{jsx, scss}
    ```

