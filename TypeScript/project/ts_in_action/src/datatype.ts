
let u: undefined = undefined;

// let n: number = undefined;

let arr: Array<number | string> = [1,2,3, 's'];

let tuple: [number, string] = [1, 's'];
tuple.push(1);
// console.log(tuple[2]);
console.log(tuple);

void 0;

let noReturn = () => {};

let error = () => {
  throw new Error('op')
};

let endless = () => {
  while(true) {}
};

let s: symbol = Symbol();
s = Symbol();

enum Role {
  Reporter = 10,
  Development,
  Maintainer
}

console.log(Role);

// enum E {
//   A,
//   B = Math.random(),
//   C = '123'.length
// }

// console.log(E);


const enum Year {
  Jan,
  Mon,
  Juin
}
const yy = [ Year.Jan, Year.Mon, Year.Juin ];
console.log(yy);

enum E {
  a,
  b
}

enum F {
  a,
  b
}

const e: E = 3;
const f: F = 3;

// e === f;

const e1: E.a = 3;
const f1: F.a = 3;

// e1 === f1;