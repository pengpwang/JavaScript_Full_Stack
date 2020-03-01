
// 一、含义与基本用法
// a. Map 数据结构, 类似对象，键值对的集合（Hash结构）
// b. Object 是“字符串—值”的对应，Map 是“值-值”的对应【各种类型的值都可以做键】
// c. new Map(任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构)


// 二、实例属性及方法
// 1. size属性，成员总数
// 2. Map.prototype.set(key, value)  返回当前Map对象，可以链式写法
// 3. Map.prototype.get(key)  若无，返回undefined
// 4. Map.prototype.has(key)
// 5. Map.prototype.delete(key)
// 6. Map.prototype.clear()  清除所有

 
// 遍历(Map 的遍历顺序就是插入顺序) [三个遍历器生成函数和一个遍历方法]
// 1. Map.prototype.keys()
// 2. Map.prototype.values()
// 3. Map.prototype.entries()
// 4. Map.prototype.forEach()

const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
// 等同于使用map.entries()
for(let [k, v] of map){
  console.log(k, v);
}

// Map 结构的默认遍历器接口（Symbol.iterator属性），是entries方法
console.log(
  map[Symbol.iterator] === map.entries
);  // true


// 三、与其他数据结构互转
// 1. 数组
console.log(
  [...map.keys()],
  [...map.values()],
  [...map.entries()],
  [...map]
);

console.log(
  new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
  ])
);

// 2. 对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

// 对象转map
console.log(
  new Map(Object.entries({
    a: 1,
    b: 2
  }))
); // Map { 'a' => 1, 'b' => 2 }

// 3. Map 转为 JSON
// a. Map的键都是字符串  ==> 对象 JSON
// b. Map的键有非字符串  ==> 数组 JSON
console.log(
  JSON.stringify([...map])
); // [["F","no"],["T","yes"]]


// 四、WeakMap
// 1、 与Map的区别
//  a. 键名为对象（且不是null）
//  b. WeakMap的键名所指向的对象，不计入垃圾回收机制
// 2. 语法
//  a. 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性
//  b. 无法清空,不支持clear方法
//  c. 只有四个方法可用：get()、set()、has()、delete()

