
const A = 1;
const funcA = (x) => {
  console.log(x);
  return x*2;
}

class CompA {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  calc() {
    return this.x + this.y;
  }
}

export {
  A,
  funcA,
  CompA
}