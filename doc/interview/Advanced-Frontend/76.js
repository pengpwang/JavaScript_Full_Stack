// 第 76 题：输出以下代码运行结果
// ******考点：对象的键名转换：*****
// a.对象的键名只能是字符串和 Symbol 类型。
// b.其他类型的键名会被转换成字符串类型。
// c.对象转字符串默认会调用 toString 方法

// 1. example 1
;(function() {
  var a={}, b='123', c=123;
  a[b]='b';
  a[c]='c';
  console.log(a[b]);  // c
})();

// 2. example 2
;(function(){
  var a={}, b=Symbol('123'), c=Symbol('123');
  a[b]='b';
  a[c]='c';
  console.log(a[b]);  // b
})();

// 3. example 3
;(function() {
  var a={}, b={key:'123'}, c={key:'456'};
  a[b]='b';
  a[c]='c';  // 对象类型会调用 toString 方法转换成字符串 [object Object]。
  console.log(a[b]);  // c
})();



