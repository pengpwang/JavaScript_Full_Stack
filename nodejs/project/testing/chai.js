const { add, subtract, multiply, divide, addErr } = require('./mod/math');
const { expect, assert } = require('chai');
const should = require('chai').should();

expect(add(1, 1)).to.equal(2);
expect(subtract(1, 1)).to.equal(0);
expect(multiply(2, 3)).to.equal(6);
expect(divide(8, 4)).to.equal(2);
// expect(addErr(1, 1)).to.equal(2);


const foo = 'bar';
const beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string');
assert.typeOf(foo, 'string', 'foo is a string');
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');


expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);


foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);



