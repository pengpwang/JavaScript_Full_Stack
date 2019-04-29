// 1. a.b.c.d 和 a['b']['c']['d']，哪个性能更高？

const Benchmark = require('benchmark');

let a = {
  b: {
    c: {
      d: 123
    }
  }
};

const suite = new Benchmark.Suite;
suite.add('.obj', function() {
  a.b.c.d === 123;
})
.add('String[]', function() {
  a['b']['c']['d'] === 123;
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({'async': true});
