
// 一、基本用法
// a. Set是一种数据结构
// b. 类似数组，但成员唯一 [内部如何保证唯一？Set内部判断两个值是否不同，使用“Same-value-zero equality”算法，类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身]
// c. 生成Set数据结构用 new Set(), [Set本身是一个构造函数]
// d. new Set(具有 iterable 接口的数据结构) 包括数组，类数组，字符串

let set = new Set([1]);
set.add(NaN)
  .add(NaN)
  .add({})
  .add({})
console.log(set.size); // 4


// 二、Set实例的属性和方法
// 1. 属性： 
//  a. Set.prototype.constructor  构造函数，为Set函数
//  b. Set.prototype.size 实例成员总数

// 2. 方法：操作方法，遍历方法
//  a. Set.prototype.add(value) 添加某个值，返回Set结构本身
//  b. Set.prototype.delete(value) 删除某个值
//  c. Set.prototype.has(value)  该值是否为Set成员
//  d. Set.prototype.clear() 清空

console.log(set.has(1));  // true
set.delete(1);
console.log(set.has(1));  // false
set.clear();
console.log(set.size);  // 0

// 遍历方法: [Set的遍历顺序就是插入顺序!!!]
//  a. Set.prototype.keys()
//  b. Set.prototype.values()
//  c. Set.prototype.entries()
// 以上，keys方法和values方法的行为完全一致
console.log(
  Set.prototype[Symbol.iterator] === Set.prototype.values
) // true  因此可直接用for...of遍历

for(let v of new Set([1,2,3])){
  console.log(v);
}

//  d. Set.prototype.forEach()  // 与数组一样
new Set([1,2,3]).forEach((v, k, s) => { // 键值，键名，集合本身
  console.log(v, k, s);  // v总等于k
});



// 三、应用：
// 1. 去重: 数组去重，字符串去重
console.log([...new Set([1,2,3,1,2,3])]);  // [1,2,3]
console.log([...new Set('abcabc')].join('')); // 'abc'

// 2. 取并集，交集，差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]); // Set { 1, 2, 3, 4 }

// 交集
let intersect = new Set([...a].filter(v => b.has(v)));  // Set { 2, 3 }

// 差集
let difference = new Set([...a].filter(v => !b.has(v))); // Set { 1 }
console.log(difference);

// 3. Set方法不多，可转成数组用数组的方法处理后，再转成Set结构
let set3 = new Set([1,2,3]);
set3 = new Set(Array.from(set3, val => val * 2));



// 四、WeakSet
// a. 成员只能是对象
// b. 对象都是弱引用：
// WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
// c. 不可遍历; 没有size属性









