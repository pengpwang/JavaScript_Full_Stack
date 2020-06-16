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

在一个Suspense组件的内部

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