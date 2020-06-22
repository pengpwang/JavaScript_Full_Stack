## source

### 第一章 导读

UI = fn(x);
通过state映射DOM，屏蔽了DOM操作;

API设计纯粹，核心API就是setState，其他内容都是围绕着组件化来设计。

### 第二章 基础知识 React API 一览

#### 2.1 准备

源码地址及源码结构

源码结构：
React和React-dom的关系: React定义节点及表现行为；
Flow Type:

#### 2.2 JSX到JavaScript的转化

```jsx
<div id="div" key="key">test</div>
```
变成如下：
```js
React.createElement('div', { id: 'div', key: 'key' }, 'test');
// 节点类型 ； properties属性对象； children
```

```jsx
<div id="div" key="key">
  <span>1</span>
  <span>2</span>
</div>
```
变成如下：
```js
React.createElement(
  'div', 
  { id: 'div', key: 'key' }, 
  React.createElement('span', null, '1'),
  React.createElement('span', null, '2'),
);
// 节点类型 ； properties属性对象； children
```


```jsx
function Comp() {
  return <a>1</a>
}

<Comp id="div" key="key">
  <span>1</span>
  <span>2</span>
</Comp>
```
变成如下：
```js
function Comp() {
  return React.createElement('a', null, '1');
}

React.createElement(
  Comp,  // 变量
  { id: 'div', key: 'key' }, 
  React.createElement('span', null, '1'),
  React.createElement('span', null, '2'),
);
// 节点类型 (原生节点：字符串；自己声明的组件：class component 或者 funcitonal component； React原生的组件：Fragment、StrictMode、Suspense等 )；
// config (写在标签上的所有attrs) properties属性对象； 
// children 子标签或者文字
```
注意：React组件必须以大写开头，否则参数标签第一位会是字符串，大写的话是组件变量
这么做原因：a) 字面上区分的一个过程；b).方便babel这种转译工具将jsx转译成JavaScript

#### 2.3 react-element

#### 2.4 react-component

#### 2.5 react-ref

React引入Ref的目的；解决了哪些场景需求；
Ref的三种使用方式： 
a. string ref; 不被推荐，将废弃；
b. function 
c. createRef

```jsx
class RefDemo extends React.Component{
  constructor() {
    super()
    this.objRef = React.createRef();
    // { current: null }  在组件渲染完成后，会把组件对应的实例挂载到此对象的current属性上面
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.stringRef.textContent = 'string ref got';
      this.methodRef.textContent = 'method ref got';
      this.objRef.current.textContent = 'obj ref got'; 
    }, 1000);
  } 

  render() {
    return <>
      <p ref="stringRef"></p>
      <p ref={ele => this.methodRef = ele}></p>
      {/* ele参数 是 这个节点对应的实例；DOM节点对应的是DOM实例；React组件对应的是组件的实例 */}
      <p ref={this.objRef}></p>
    </>
  }
}

```

#### 2.6 forward-ref

解决什么问题：
functional Component是不能实例化的；ref是用来获取节点的实例的；forward-ref实现对ref的传递在functional Component

```jsx
import React from 'react';

const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
));

export default class Comp extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ref.current.value = 'ref got input';
  }

  render() {
    return <TargetComponent ref={this.ref} />
  }
}
```

#### 2.7 context

父组件通过props传递给子组件数据属性，给子组件使用；
父组件通过传递回调函数给子组件，可以让子组件在某些时候调用父组件的特性；

多层级组件，最外层和最内层数据传递；中间使用的组件可能是第三方的不是自己写的组件，另外一层层传递也不合理且没有意义；
解决的问题：跨越多层组件传递信息的功能

实现context的两种方式：
childContextType：【老的,将在react 17 大版本被废弃】==> 废弃原因：数据更新会导致其内所有组件更新，耗性能
createContext：【新的,react 16 以后提供的】

```jsx
import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext('default')

class Parent extends React.Component {
  state = {
    childContext: '123',
    newContext: '456',
  }

  getChildContext() {
    return { value: this.state.childContext, a: 'aaaaa' }
  }

  render() {
    return (
      <>
        <div>
          <label>childContext:</label>
          <input
            type="text"
            value={this.state.childContext}
            onChange={e => this.setState({ childContext: e.target.value })}
          />
        </div>
        <div>
          <label>newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={e => this.setState({ newContext: e.target.value })}
          />
        </div>
        <Provider value={this.state.newContext}>{this.props.children}</Provider>
      </>
    )
  }
}

class Parent2 extends React.Component {
  // { value: this.state.childContext, a: 'bbbbb' }
  getChildContext() {
    return { a: 'bbbbb' }
  }

  render() {
    return this.props.children
  }
}

function Child1(props, context) {
  console.log(context)
  return <Consumer>{value => <p>newContext: {value}</p>}</Consumer>
}

Child1.contextTypes = {
  value: PropTypes.string,
}

class Child2 extends React.Component {
  render() {
    return (
      <p>
        childContext: {this.context.value} {this.context.a}
      </p>
    )
  }
}

// Child2.contextType = Consumer

Child2.contextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
}

Parent.childContextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
}

Parent2.childContextTypes = {
  a: PropTypes.string,
}

export default () => (
  <Parent>
    <Parent2>
      <Child1 />
      <Child2 />
    </Parent2>
  </Parent>
)

```

#### 2.8 concurrent-mode

目标：让React的整体渲染过程，能够进行一个优先级的排比，且让整体的渲染过程是能够中断的，可以进行任务的调度；
React去区分一些优先级比较高或比较低的任务，在进行React更新的过程中，优先执行优先级高的任务，待浏览器执行完优先级比较高的任务后，有空余时间的时候再执行优先级较低的任务。

```jsx
import React, { ConcurrentMode } from 'react'
// 在更新操作中，flushSync 强制使用优先级最高的方式进行更新。
import { flushSync } from 'react-dom' 

// 被ConcurrentMode包裹的子树上，产生的更新都是低优先级的更新

import './index.css'
// @keyframes slide {
//   0% {
//     margin-left: 0;
//     /* transform: translateX(0); */
//   }

//   50% {
//     margin-left: 200px;
//     /* transform: translateX(200px); */
//   }

//   100% {
//     margin-left: 0;
//     /* transform: translateX(0); */
//   }
// }

// .wrapper {
//   width: 400px;
//   animation-duration: 3s;
//   animation-name: slide;
//   animation-iteration-count: infinite;
//   display: flex;
//   flex-wrap: wrap;
//   background: red;
// }

// .item {
//   width: 20px;
//   height: 20px;
//   line-height: 20px;
//   text-align: center;
//   border: 1px solid #aaa;
// }

class Parent extends React.Component {
  state = {
    async: true,
    num: 1,
    length: 2000,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateNum()
    }, 200)
  }

  componentWillUnmount() {
    // 别忘了清除interval
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  updateNum() {
    const newNum = this.state.num === 3 ? 0 : this.state.num + 1
    if (this.state.async) {
      this.setState({
        num: newNum,
      })
    } else {
      flushSync(() => {
        this.setState({
          num: newNum,
        })
      })
    }
  }

  render() {
    const children = []

    const { length, num, async } = this.state

    for (let i = 0; i < length; i++) {
      children.push(
        <div className="item" key={i}>
          {num}
        </div>,
      )
    }

    return (
      <div className="main">
        async:{' '}
        <input
          type="checkbox"
          checked={async}
          onChange={() => flushSync(() => this.setState({ async: !async }))}
        />
        <div className="wrapper">{children}</div>
      </div>
    )
  }
}

// class Child extends React.Component {
//   state = {
//     num: 1
//   }

//   render () {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

export default () => (
  <ConcurrentMode>
    <Parent />
  </ConcurrentMode>
)
```

#### 2.9 suspense-and-lazy

在一个Suspense组件的内部，等到内部的所有组件都resolved之后，Suspense组件才会将fallback去掉，然后显示Suspense组件内部的内容；任何一个处于pending状态的，Suspense组件还显示fallback

```jsx
import React, { Suspense, lazy } from 'react'

const LazyComp = lazy(() => import('./lazy.js'))

let data = ''
let promise = ''
function requestData() {
  if (data) return data
  if (promise) throw promise
  promise = new Promise(resolve => {
    setTimeout(() => {
      data = 'Data resolved'
      resolve()
    }, 2000)
  })
  throw promise
}

function SuspenseComp() {
  const data = requestData()

  return <p>{data}</p>
}

export default () => (
  <Suspense fallback="loading data">
    <SuspenseComp />
    <LazyComp />
  </Suspense>
)
```

#### 2.10 hooks

意义在于：拆分组件内部的逻辑，提取出来，以便给更多的组件去复用

#### 2.11 children

// TODO  

#### 2.12 others

memo
用意：给functional Component拥有类似pureComponent的功能；pureComponent提供了class Component组件在props没有变化的情况下，不重新渲染；functional Component没有生命周期，也没有继承这个说法，之前也没提供类似功能。

Fragment
1). Fragment组件本身是一个Symbol
2). React组件不能返回多个组件节点，只能返回一个节点
3). Fragment节点没有任何意义，也不会生成多余的div节点

StrictMode
1). StrictMode本身也是一个Symbol
2). StrictMode下的子树都要按照某种模式渲染，StrictMode会给下面子树提供一些过时的Api的提醒；影响范围仅限于子树

cloneElement
1). clone创建一个新的React Element

createFactory
1). 是对creatElement的封装

以上总结：
React本身只是创建节点类型，告诉我们每个节点是什么类型，及props, key, ref这些东西，并没有任何操作与逻辑在里面；
React-dom涉及到了如何去操作，如何去更新，如何显示


### 第三章 React中的更新

主要讲解React创建更新中的主要两种方式ReactDOM.render和setState，他们具体做了什么。

React中创建更新的三种方式：
1). ReactDOM.render || hydrate 
把整个应用第一次渲染到页面上，展现出应用样子的过程 --- 初次渲染
2). setState
后续更新应用
3). forceUpdate

#### 3.1 react-dom-render
ReactDOM.render
渲染步骤：
创建ReactRoot 【包含React整个应用的最顶点的一个对象】；
创建FiberRoot和RootFiber；
创建更新；

#### 3.2 react-fiber-root

什么是FiberRoot？
整个应用的起点；
包含应用挂载的目标节点；
记录着整个应用更新过程中的各种信息；

```js
type BaseFiberRootProperties = {|
  // root节点，render方法接收的第二个参数
  containerInfo: any,
  // 只有在持久更新中会用到，也就是不支持增量更新的平台，react-dom不会用到
  pendingChildren: any,
  // 当前应用对应的Fiber对象，是Root Fiber
  current: Fiber,

  // 一下的优先级是用来区分
  // 1) 没有提交(committed)的任务
  // 2) 没有提交的挂起任务
  // 3) 没有提交的可能被挂起的任务
  // 我们选择不追踪每个单独的阻塞登记，为了兼顾性能
  // The earliest and latest priority levels that are suspended from committing.
  // 最老和新的在提交的时候被挂起的任务
  earliestSuspendedTime: ExpirationTime,
  latestSuspendedTime: ExpirationTime,
  // The earliest and latest priority levels that are not known to be suspended.
  // 最老和最新的不确定是否会挂起的优先级（所有任务进来一开始都是这个状态）
  earliestPendingTime: ExpirationTime,
  latestPendingTime: ExpirationTime,
  // The latest priority level that was pinged by a resolved promise and can
  // be retried.
  // 最新的通过一个promise被reslove并且可以重新尝试的优先级
  latestPingedTime: ExpirationTime,

  // 如果有错误被抛出并且没有更多的更新存在，我们尝试在处理错误前同步重新从头渲染
  // 在`renderRoot`出现无法处理的错误时会被设置为`true`
  didError: boolean,

  // 正在等待提交的任务的`expirationTime`
  pendingCommitExpirationTime: ExpirationTime,
  // 已经完成的任务的FiberRoot对象，如果你只有一个Root，那他永远只可能是这个Root对应的Fiber，或者是null
  // 在commit阶段只会处理这个值对应的任务
  finishedWork: Fiber | null,
  // 在任务被挂起的时候通过setTimeout设置的返回内容，用来下一次如果有新的任务挂起时清理还没触发的timeout
  timeoutHandle: TimeoutHandle | NoTimeout,
  // 顶层context对象，只有主动调用`renderSubtreeIntoContainer`时才会有用
  context: Object | null,
  pendingContext: Object | null,
  // 用来确定第一次渲染的时候是否需要融合
  +hydrate: boolean,
  // 当前root上剩余的过期时间
  // TODO: 提到renderer里面区处理
  nextExpirationTimeToWorkOn: ExpirationTime,
  // 当前更新对应的过期时间
  expirationTime: ExpirationTime,
  // List of top-level batches. This list indicates whether a commit should be
  // deferred. Also contains completion callbacks.
  // TODO: Lift this into the renderer
  // 顶层批次（批处理任务？）这个变量指明一个commit是否应该被推迟
  // 同时包括完成之后的回调
  // 貌似用在测试的时候？
  firstBatch: Batch | null,
  // root之间关联的链表结构
  nextScheduledRoot: FiberRoot | null,
|};
```

#### 3.3 react-fiber

React 16以后，fiber是整个应用的核心

什么是Fiber?
1). 每一个ReactElement对应一个Fiber对象
2). 记录节点的各种状态; 如：class Component 的state和props是记录在Fiber对象上的，在Fiber更新之后，才会更新到class Component的this.state和this.props里面。并非class Component自己调理的过程，这些过程都是通过Fiber上面操作的，只是更新节点之后，才会把这个属性放到this上面。这也给React实现hooks挺供了方便，hooks用在functional Component里面的，functional Component没有this，本身记录stage和props不是在class Component 对象上面，而是在Fiber上面。所以functional component更新之后，有能力可以拿到更新之后的state。
3). 串联整个应用形成树结构

