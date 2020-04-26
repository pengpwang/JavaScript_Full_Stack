
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
解决组件加载问题
(1). 背景
暂时没有使用的资源 ==》 延迟加载

(2). 途径
- webpack Code Splitting  代码拆分
- import 模块代码动态导入

```js
 import('./details.js').then()
```
Lazy封装的是组件的导入行为，而不是组件本身，导入意味着网络请求

```js
import React, { lazy, Suspense } from 'react';
const About =  lazy(() => import(/* webpackChunkName: "about"  */'./About'));

class Leaf extends React.Component {
  render() {
    return <Suspense fallback={ <div>loading</div> }>
        <About></About>
      </Suspense>
  }
}
```

// TODO
捕获组件渲染错误的组件
ErrorBoundary

业务场景中三个配合使用

#### 3.4 React中memo的使用
解决运行时的效率问题
PureComponent和memo


### 第四章 React颠覆性新特性Hooks

#### 4.1 React Hooks的概念和意义

(1). Hooks为大于React 16.8 版本引入
(2). 什么是Hooks
Hooks允许我们在函数组件中，用特定的预定义函数来标记状态和组件生命周期，使得所有组件都可以用函数来编写。
(3). 类组件的不足
  1). 组件之间状态逻辑复用难
    - 缺少复用机制
    - 渲染属性和高阶组件导致层级冗余
  2). 类组件趋向复杂难以维护
    - 生命周期函数混杂不相干逻辑
    - 相干逻辑分散在不同生命周期
  3). this指向困扰
    - 内联函数过度创建新句柄
    - 类成员函数不能保证this
(4). Hooks优势
  1). 优化类组件的三大问题
    - 函数组件无this问题  【Hooks需要函数式组件环境，所有逻辑都在函数内部，没有实例化的概念，也就没有了this指向的问题】
    - 自定义Hook方便复用状态逻辑 【Hooks指在函数组件内部调用的特殊函数，也可自定义Hooks函数，自定义的Hooks内部也可使用useState等Hooks，这样可将可复用的状态和逻辑提取出来，让复用变得优雅简洁】
    - 副作用的关注点分离 【以往的副作用都是写在各种生命周期函数中的，弊端很多。每一个副作用都写在一个useEffect之中，每一个useEffect只处理一种副作用，这样逻辑清晰很多】
备注：
副作用：不是发生在数据向视图的转换环节之中的操作。例如：发起网络请求，访问原生DOM元素，写本地持久化缓存，绑定解绑事件等等


#### 4.2 使用 State Hooks  【useState】
React约定：所有Hooks函数(包括自定义的Hooks函数)都应该以`use`开头
