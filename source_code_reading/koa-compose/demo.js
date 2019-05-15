// 纯函数  给定输入，就会有固定的输出
// 函数式编程



// 递归
function tail(i) {
    if(i > 3) return;
    console.log('>>>>', i);
    tail(i+1);
    console.log('<<<<', i);
}

// tail(0);

// 尾递归
function tailUp(i) {
    if(i > 3) return i;
    console.log('>>>>', i);
    return tailUp(i+1);
}

tailUp(0);