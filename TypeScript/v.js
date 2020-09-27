var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.switchRadio = function () { };
    Car.prototype.checkBatteryStatus = function () { };
    return Car;
}());
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up);
console.log("Red" /* Red */);
