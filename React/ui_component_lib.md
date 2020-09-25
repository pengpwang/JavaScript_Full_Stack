
## React+TypeScript高仿AntDesign开发企业级UI组件库

### 第二章

### 2.1 什么是TypeScript

1. 编程语言的类型
  - 动态类型语言 Dynamically Typed Language
    运行期间做数据类型检查  ==》 劣势  ==》 静态代码检查器（eslint）编码期间根据一定的规则提示一些有问题的地方
  - 静态类型语言 Statically Typed Language
    数据类型检查发生在编译阶段 ==》写程序时声明变量的数据类型 ==》ts成为关注类型的混合语言

2. TypeScript
  - JavaScript that scales (JavaScript的超集)
  - 静态类型风格的类型系统
  - 提供es6到es10，甚至esnext的语法支持   (与babel功能重合)
  - 兼容各种浏览器，各种系统，各种服务器，完全开源  (设置编译目标后)

### 2.2 为什么要使用TypeScript

1. 程序更容易理解
函数或方法接收参数及返回值的类型是是什么？有其他什么外部数据被引用？
- 动态语言的约束：需要手动调试等过程，打断点，问人
- TypeScript：代码本身回答了上述问题

2. 效率更高
- 在IDE和Complier的帮助下，可以在不同的代码块和定义中进行跳转
- 代码自动补全
- 丰富的接口提示

3. 更少的错误
- 编译期间能够发现大部分的错误
- 杜绝一些常见的错误

4. 非常好的包容性
- 完全兼容js
- 第三方库可以单独编写类型文件
- 流行项目都支持ts

缺点：
- 学习成本
- 短期内增加一些开发成本

### 2.3 安装和初试TypeScript

- 安装node
- 安装ts `npm install -g typescript`
- `tsc -v`

### 2.4 基础类型

1. js的数据类型：8种
  - 7种原始类型(值本身无法被改变)：`Boolean`, `Null`, `Undefined`, `Number`, `BigInt`, `String`, `Symbol`
  - `Object`

2. ts定义的5种基本类型：
```typescript
let isDone: boolean = false;

let age: number = 20;
let binaryNumber: number = 0b111;

let firstName: string = 'jack';
let message: string = `hello, this is ${firstName}, age is ${age}`;

let u: undefined = undefined;
let n: null = null;

let num: number = undefined; // undefined 和 null 类型是所有类型的子类型
let num1: number = null;
let nnn: undefined = null;
let nnnnn: null = undefined;
```

### 2.5 any类型和联合类型
为两种充满不确定性的类型；一种是大而全的any类型，一种是小而美的Union类型

1. any类型：允许被赋值为任意类型  ===> any类型上的属性及方法返回的也是any  ==>不推荐使用
使用场景：接入第三方系统，输入来自未知的api或用户输入，无法确定数据类型
```typescript
let notSure: any = 4;
notSure = 'sss';
notSure = true;

notSure.myName
notSure.say()
```

2. 联合类型

```typescript
let numberOrString: number | string = 234;
numberOrString = 'sss';
numberOrString = true;
```

### 2.6 Array 和 Tuple

1. Array
将同一种类型的数据聚合到一起
```typescript
let arrOfNumbers: number[] = [1,2];  // 定义一个数组里都是number类型
arrOfNumbers.push('1');   // 数组的方法也有同样的限制

// 类数组对象 ArrayLikeObject
function test(){
  console.log(arguments);
  arguments.length;
  arguments[1];
}
```

2. Tuple 元组
合并了不同类型的一种数组
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```typescript
let user: [string, number] = ['jack', 20];  // 对每一项进行限制
user = ['jack', 20, 20]; // 报错
```

### 2.7 interface 初探
用于定义对象的类型 (类似于规范和契约，有一点儿不同就会发出警告⚠️)
- 对对象的形状(shape)进行描述: 属性，方法
- 对类(class)进行抽象: 具体的功能要类自己去实现
- Duck Typing(鸭子类型): 关注的是对象如何被使用，而不是对象的类型本身

```typescript

interface IPerson {
  readonly id: number; // 只读
  name: string;
  age: number;
}

let person: IPerson = {
  id: 10,
  name: 'jack',
  age: 20
}; // 不能多不能少
```

### 2.8 函数和类型推断

1. 函数
- 函数是程序的重要组成部分
- js中函数是一等公民：函数和其他类型的对象都一样，可以作为参数，可以存为数组，可以被另外一个函数返回，可以被赋值给另外一个变量
- 函数由两部分构成：输入(通过传参)；输出(函数的返回结果) =》这两个用ts定义约束

```typescript
// 函数声明的写法
function add(x: number, y: number, z?: number): number {
  return x + y;
}

add(1,2);
add(1,2,3); // 报错  不能多， 需加入参
add(1,'d'); // 报错
// 可选参数需放到最后； 赋值默认值的话，会成为可选参数

// 函数表达式  => 函数类型 ts中凡是在冒号后面都是在声明变量类型，和代码逻辑没什么关系 =》 函数类型的写法
const add1: (x: number, y: number, z?: number) => number = add;
```

2. 类型推断  =》ts编译器提供的功能
```typescript
let s = 's';
s = 1; // 报错
```

### 2.9 类（Class）第一部分
- 类(class)：定义了一切事物的抽象特点
- 对象(Object)：类的实例
- 面向对象(oop)三大特性：封装、继承、多态

### 2.10 类（Class）第二部分






















