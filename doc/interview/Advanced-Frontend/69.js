// 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 
// 思路：对每一个字符: a.判断大小写; b.大写转小写，小写转大写


// 1. 数组切分+判断大小写

function processString(s) {
  let arr = s.split('');
  let new_arr = arr.map(function(v) {
    return v === v.toUpperCase() ? v.toLowerCase() : v.toUpperCase();
  });
  return new_arr.join('');
}

console.log(processString('aBcDEFGhjk')); // AbCdefgHJK

// 2. 字符串遍历

function swapString(s){
  let new_str = '';
  for(let i = 0; i < s.length; i++){
    let v = s[i];
    if(v === v.toUpperCase()){
      new_str += v.toLowerCase();
    }else {
      new_str += v.toUpperCase();
    }
  }

  return new_str;
}

console.log(swapString('aBcDEFGhjk')); // AbCdefgHJK

// 3. 结合正则

function regString(s) {
  return s.replace(/[a-zA-Z]/g, function(v) {
    if(/[a-z]/.test(v)){
      return v.toUpperCase();
    }else if(/[A-Z]/.test(v)) {
      return v.toLowerCase();
    }else {
      return v;
    }
  })
}

console.log(regString('aBcDEFGhjk@#@#')); // AbCdefgHJK

// 4. 结合字符编码

const reverseStr = (str) => {
  let tmpAry = str.split('')
  let resultAry = []
  let a = 'a'.charCodeAt()
  let A = 'A'.charCodeAt()
  tmpAry.map((val) => {
    // debugger
    if (val <= 'Z' && val >= 'A') {
      resultAry.push(String.fromCharCode(val.charCodeAt() + (a - A)))
    } else if (val <= 'z' && val >= 'a') {
      resultAry.push(String.fromCharCode(val.charCodeAt() - (a - A)))
    } else {
      resultAry.push(val)
    }
  })
  return resultAry.join('')
}

console.log(reverseStr('aBCDefgh!@##%^$^*!@#$%'))

