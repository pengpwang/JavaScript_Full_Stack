
// interface Radio {
//   switchRadio(): void;
// }

// interface Battery {
//   checkBatteryStatus(): void;
// }

// class Car implements Radio, Battery{
//   switchRadio() {}

//   checkBatteryStatus() {}
// }

// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right
// }

// console.log(Direction.Up);
// // console.log(Direction[0]); // 反向映射

// const enum Color {
//   Red = 'Red',
//   Yellow = 'Yellow',
//   Blue = 'Blue'
// }

// console.log(Color.Red);

// function echo<T>(arg: T): T {
//   return arg;
// }

// const result = echo(122);

// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [ tuple[1], tuple[0] ];
// }

// const r1 = swap([123, 'string']);

// interface IWithLength {
//   length: number;
// }

// function echoWithLength<T extends IWithLength>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

// echoWithLength('str')
// echoWithLength([1,3])
// echoWithLength({ length: 1, w: 2 })

// class Queue<T> {
//   private data = [];

//   push(item: T) {
//     return this.data.push(item);
//   }

//   pop(): T {
//    return this.data.shift()
//   }
// }
// const q1 = new Queue<number>();
// q1.push(1);
// console.log(q1.pop().toFixed(2));


// interface KeyPair<T, U> {
//   key: T;
//   value: U;
// }
// let kp1: KeyPair<number, string> = { key: 1, value: 'str' };
// let kp2: KeyPair<string, number> = { key: 's', value: 2 };

// interface IPlus<T> {
//   (a: T, b: T): T;
// }
// function plus(a: number, b: number): number {
//   return a + b;
// }
// function connect(a: string, b: string): string {
//   return a + b;
// }
// const p1: IPlus<number> = plus;
// const p2: IPlus<string> = connect;


// type IPlusType = (x: number, y: number) => number;
// function sum(x: number, y: number): number {
//   return x + y;
// }
// const sum2: IPlusType = sum;

type NameResolver = () => string;
type NameOrResolver = string | NameResolver;
function getName(v: NameOrResolver): string {
  if(typeof v === 'string'){
    return v;
  }else{
    return v()
  }
}