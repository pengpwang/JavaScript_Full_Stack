const a = 1;

const show = () => {
  console.log(a);
}

class Log {
  constructor(prefix) {
    this.prefix = prefix;
  }

  info(msg) {
    console.log(`[${this.prefix}] ${msg}`)
  }
}

module.exports = {
  a,
  show,
  Log
};