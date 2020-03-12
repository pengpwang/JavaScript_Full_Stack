

function* g() {}

g.prototype.hello = function() {
  console.log('hi~');
}

let obj = g();
console.log(
  obj instanceof g
);
obj.hello();





// 应用：
// 1. 取出嵌套数组的所有成员
const tree = [ 'a', ['b', 'c'], ['d', 'e'], [ 'f', ['g', ['h', 'i']] ] ];

function* iterTree(tree){
  if(Array.isArray(tree)){
    for(let i = 0; i < tree.length; i++){
      yield* iterTree(tree[i]);
    }
  }else{
    yield tree;
  }
}

console.log([...iterTree(tree)]);