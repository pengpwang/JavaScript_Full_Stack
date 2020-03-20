
class Person {
  firstName: string;
  lastName: string;
  fullName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + ' ' + lastName;
  }
}

interface IPerson {
  firstName: string;
  lastName: string;
}

function greeter (person: IPerson) {
  return `Hello ${person.firstName} ${person.lastName}`;
}

console.log(
  new Person('jack', 'jones'),
  greeter(new Person('jack', 'jones'))
);