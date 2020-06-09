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

