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
// 节点类型 ； property属性对象； children
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
// 节点类型 ； property属性对象； children
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
// config (写在标签上的所有attrs) property属性对象； 
// children 子标签或者文字
```
注意：React组件必须以大写开头，否则参数标签第一位会是字符串，大写的话是组件变量
这么做原因：a) 字面上区分的一个过程；b).方便babel这种转译工具将jsx转译成JavaScript

#### 2.3 react-element

#### 2.4 react-component

