
// 1.设置循环变量的部分是父作用域，循环体内部是一个单独的子作用域
for(let i = 0; i < 3; i++){
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc


