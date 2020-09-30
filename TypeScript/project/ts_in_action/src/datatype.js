var u = undefined;
// let n: number = undefined;
var arr = [1, 2, 3, 's'];
var tuple = [1, 's'];
tuple.push(1);
// console.log(tuple[2]);
console.log(tuple);
void 0;
var noReturn = function () { };
var error = function () {
    throw new Error('op');
};
var endless = function () {
    while (true) { }
};
var s = Symbol();
s = Symbol();
var Role;
(function (Role) {
    Role[Role["Reporter"] = 10] = "Reporter";
    Role[Role["Development"] = 11] = "Development";
    Role[Role["Maintainer"] = 12] = "Maintainer";
})(Role || (Role = {}));
console.log(Role);
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = Math.random()] = "B";
    E[E["C"] = '123'.length] = "C";
})(E || (E = {}));
console.log(E);
var yy = [0 /* Jan */, 1 /* Mon */, 2 /* Juin */];
console.log(yy);
