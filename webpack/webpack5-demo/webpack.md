### webpack高级实战精华

#### 一、课程简介

##### 1-1. 课程背景
1. webpack是如何诞生的
  作者 Tobias Koppers (github: @sokra )，创作背景，代码分割的导入
2. 为什么需要构建
  - 开发分工的变化
  前后端分离，前端复杂度增加，视图层，逻辑层，数据层等
  - 框架的变化
  js库 ==> MVC ==> MV*
  - 语言的变化
  HTML发展历史；css发展历史（css预处理语言less,sass,stylus，工具）；前端脚本语言的发展
  - 环境的变化
  浏览器；服务端；移动端（React Native);同构
  - 社区的变化
  GitHub；npm
  - 工具的变化
  构建工具的变化：APACHE Ant;Make;Grunt;Gulp;Fis;Webpack;Rollup

  *总结：*
    - 开发复杂化
    - 框架去中心化；各种零散的包
    - 语言编译化
    - 开发模块化
3. 为什么在构建过程中选择webpack作为主要工具
  - 三大框架的脚手架都使用了webpack
  - 代码分割
  - 天生的模块化

##### 1-2. 课程导学

#### 二、学习准备

##### 1-1. 模块化
1. js的模块化
 - 命名空间
 库名.类别名.方法名
 - commonjs
 - AMD/CMD/UMD
 ```js
//  UMD
(function(root, factory){
  if(typeof define === 'function' && define.amd){
    // AMD
    define([], factory);
  }elseif(typeof exports === 'object'){
    // commonjs
    module.exports = factory();
  }else{
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function(){
  // ....
  return {};
}))
 ```
 - ES6 Module

 webpack内置支持：AMD(Requirejs),ES6 Module （推荐）;Commonjs
2. css的模块化（css的设计模式）
css设计模式：
- OOCSS
面向对象的CSS: 结构和设计的分离；内容和容器的分离
- SMACSS
可扩展和模块化结构：
- Atomic CSS
- MCSS
- AMCSS 
- BEM
Block 块; (header, container, menu, checkbox, input)
Element 元素; (menu item, list item, checkbox caption, head title)
Modifier 修饰符; (disabled, checked, fixed, size big, color yellow, highlighted)
- CSS Modules



