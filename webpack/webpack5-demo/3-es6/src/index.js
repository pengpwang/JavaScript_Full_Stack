// import _ from 'lodash';
// import { show } from './another-module';

// show();

// console.log('index');
// console.log(_.join(['index', 'module', 'loaded!'], ' '));


// import('lodash').then(({ default: _ }) => {
//   console.log(_.join(['index', 'module', 'loaded!'], ' '));
// }).catch(() => {
//   console.log(111);
// })

async function show() {
  const { default: _ } = await import('lodash');

  console.log(_.join(['index', 'module', 'loaded!'], ' '));
}

console.log(1);
show();
console.log(2);