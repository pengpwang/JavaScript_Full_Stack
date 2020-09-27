
let isDone: boolean = true;
let str: string = 'sting';

let age: number = 20;
let binaryNumber: number = 0b111;

let firstName: string = 'jack';
let message: string = `hello, this is ${firstName}, age is ${age}`;

let u: undefined = undefined;
let n: null = null;

let num: number = undefined; 
let nnn: undefined = null;
let nnnnn: null = undefined;


let notSure: any = 4;
notSure = 'sss';
notSure = true;

notSure.myName = 3;
notSure.say();

let numberOrString: number | string = 234;
numberOrString = 'sss';
// numberOrString = true;

let arrOfNumbers: number[] = [1,2]; 
// arrOfNumbers.push('1');


function test(){
  console.log(arguments);
  arguments.length;
  arguments[1];
  // arguments.push
}

let user: [string, number] = ['jack', 20];


interface IPerson {
  readonly id: number;
  name: string;
  age: number;
}

let person: IPerson = {
  id: 10,
  name: 'jack',
  age: 20
};

// person.id = 11;

function add(x: number = 2, y: number, z?: number): number {
  return x + y;
}

add(1,2);
// add(1,2,3);
// add(1,'d');

// 函数表达式
const add1 = function (x: number, y: number, z?: number): number {
  return x + y;
}

const add2: (x: number, y: number, z?: number) => number = add1;

class Animal {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  protected run() {
    console.log(`${this.name} is running`);
  }

}

const Dog = new Animal('JJ');
Dog.run();