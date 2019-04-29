const { add, subtract, multiply, divide } = require('./mod/math');
const { expect } = require('chai');

describe('Math', () => {
  it('#add', () => {
    expect(add(1, 2)).to.equal(3);
  });

  it('#subtract', () => {
    expect(subtract(2, 1)).to.equal(1);
  });

  it('#multiply', () => {
    expect(multiply(8, 4)).to.equal(32);
  });

  it('#divide', () => {
    expect(divide(8, 4)).to.equal(2);
  });
});

// 异步测试 TODO


// npm test