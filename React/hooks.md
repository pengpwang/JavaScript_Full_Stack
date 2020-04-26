
## React劲爆新特性Hooks 重构旅游电商网站火车票PWA

### 第一章

#### 1.1 前置知识

- 工具类
- 语法类
- 概念类
- 效率类
- 原则类

1.1 工具类

- nodejs
- npm
- webpack
- eslint
- prettier

1.2 语法类

- ECMAScript 2015+
- JSX
- CSS flex

1.3 概念类

- SPA/MPA
- PWA 【渐进式网络应用】

1.4 效率类

- iconfont
- snippets

1.5 原则类

- 职责分离
模块解耦，优化可维护性


 ### 第二章

 #### 2.1 使用create-react-app创建项目

 ```
 which npx
 /usr/local/bin/npx
 ```
npx 可以下载全局命令行，然后在执行完成后移除全局命令行 =>不会暂用没有必要的硬盘空间

```
npx create-react-app myProjectName
```

// TODO
[npx](http://www.ruanyifeng.com/blog/2019/02/npx.html)

#### 2.2 react-scripts及其工作原理

2.2.1 react-scripts内部代码工作原理
// TODO 【源代码解析】

2.2.2 安装Chrome扩展 React Developer Tools 开发调试工具

#### 2.3 用eject解构编译脚本

eject不可逆【简洁性与灵活性此消彼长】


### 第三章 React最新特性简介

React新特性
- Context 
- ContextType
- lazy
- Suspense
- memo

#### 3.1 Context实现跨层级的组件数据传递

(1). Context定义
Context提供了一种方式，能够让数据在组件树中传递而不必一级一级手动传递

(2). 结构
a). Context实例对象
b). 派生出两个组件 <Provider> 和 <Consumer>
c). <Provider> 为Context的生产者
d). <Consumer> 为Context的消费者

(3). API
createContext(defaultValue?) 创建Context实例对象

#### 3.2 React中contextType的使用
// TODO 待补充

#### 3.3 React中Lazy和Suspense的使用

(1). 背景

