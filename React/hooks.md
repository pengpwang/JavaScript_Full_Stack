
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
用来替代类组件state成员及setState方法的新的状态解决方案

- useState在函数组件内必须按照固定的顺序和数量被调用 【使用eslint-plugin-react-hooks检查并报错编写不合规范的hooks】
- useState可以传入一个默认值作为默认状态
- useState可以传入一个函数来延迟初始化，提高效率

#### 4.3 使用 Effect Hooks

(1). 副作用 【组件渲染过程之外的行为】
- 绑定事件
- 网络请求
- 访问DOM

(2). 副作用时机
- Mount之后
- Update之后
- Unmount之前
以上时机之前分别对应 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`,现在使用useEffect覆盖几乎所有的情况

(3). useEffect
- 标准上在组件每次渲染(`render`)之后调用
- useEffect可以自定义调用或不调用
- useEffect的第二个参数是一个可选的数组【使useEffect切入到正确的状态和环节上，并且能优化性能，节省不必要的计算损耗】，只有在数组中的每一项都不变的情况下，useEffect才不会执行
- 第一次渲染之后useEffect一定会被执行，并且没有初始值，但下一次什么时候再执行，取决于数组每一项的对比【有两个特例：a). 不传数组，则每次渲染后都执行useEffect; b). 传入空数组, useEffect只在第一次渲染之后执行一次】
Hooks组件相对于类组件在编写副作用上的优越性：a). 提高了代码复用； b). 优化了关注点分离

#### 4.4 使用Context Hooks

- context能够允许数据跨越组件层级直接传递
- 不要滥用context，他会破坏组件的独立性
- 在函数组件中，不止能获取一个context, 从语法上看，对context的数量获取没有限制

(1). consumer版本
```js
const CountContext = createContext();

...

function Leaf() {
  return <CountContext.Consumer>
    { count => <h1>{ count }</h1> }
  </CountContext.Consumer>
}
```


(2). contextType版本
```js
const CountContext = createContext();

...

class Bar extends React.Component {
  static contextType = CountContext;

  render() {
    const count = this.context;
    return <div>
      <h1>{ count }</h1>
    </div>
  }
}
```

(3). useContext版本
```js
const CountContext = createContext();

...

function Counter() {
  const count = useContext(CountContext);
  return <h1>{ count }</h1>
}
```

#### 4.5 使用Memo/Callback Hooks

(1). memo
- 用来优化组件的重渲染行为，当传入组件的值都不变的情况下，不会触发组件的重渲染，否则会触发组件重渲染
- 类似于类组件下的PureComponent

(2). useMemo和memo
- memo函数针对一个组件的渲染是否重复执行
- useMemo定义一段函数逻辑是否重复执行
- 本质上都依赖相同的算法，来判断依赖是否改变，继而决定是否触发特定逻辑
- 两者不会导致业务逻辑的变化，仅仅用来做性能优化

(3). useMemo
- useMemo函数第一个参数为所要执行的逻辑函数，第二个参数为这个逻辑所依赖的输入变量组成的数组
- 不传第二个参数，useMemo的逻辑每次都运行 【useMemo则无意义了】
- 传入空数组，则只会运行一次
- 运行策略和useEffect一样的，但调用时机不一样。useMemo是在渲染期间完成，useEffect在渲染之后完成
- useMemo需要返回值

(4). useCallback
- useCallback是useMemo的一种变体
- 使用useCallback不能阻止创建新的函数，但这个函数不一定会被返回，很可能创建的函数被抛弃不用了。
- useCallback解决的是传入子组件的函数参数过多变化，导致子组件过多渲染的问题

#### 4.6 使用Ref Hooks

(1). Ref 更新迭代
- 在React的更新迭代中，类组件关于Ref分别推荐使用了 String Ref, Callback Ref, CreateRef
- 在函数组件中使用useRef

(2). useRef
- 获取子组件或者DOM节点的句柄
- 渲染周期之间共享数据的存储

#### 4.7 自定义Hooks
用于复用状态逻辑

- 自定义Hooks函数要以use开头
- 自定义Hooks和函数组件的区别在于输入输出的区别,除了输入输出你无法判断这个是一个自定义的Hooks函数，还是一个函数组件

#### 4.8 Hooks使用法则
规定Hooks函数调用位置
- 只在顶层调用Hooks函数 【不能在循环语句，条件语句，嵌套函数中调用Hooks函数】
- 只在函数组件和自定义Hooks中调用Hooks函数

#### 4.9 Hooks常见问题

(1). 对传统React编程的影响
- 生命周期函数如何映射到Hooks?
- 类实例成员变量如何映射到Hooks?

