var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return Person;
}());
function greeter(person) {
    return "Hello " + person.firstName + " " + person.lastName;
}
console.log(new Person('jack', 'jones'), greeter(new Person('jack', 'jones')));
