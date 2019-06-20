
require('./main.css');

const { a, show, Log } = require('./mod1');

console.log(a);
show();

function appendHtml() {
  window.document.getElementById('app').innerHTML = 'H'
}

const logger = new Log('DEBUG');

appendHtml();
logger.info('mounted ok ~');
console.log(
  Object.assign({}, { a: 1 }, { b: 2 })
);