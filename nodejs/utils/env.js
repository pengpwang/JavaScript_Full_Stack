
// console.log(process.env);

// DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node env.js
exports.inspectOpts = Object.keys(process.env).filter((key) => {
  return /^debug_/i.test(key);
}).reduce((obj, key) => {
  const prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, (_, k) => {
      console.log(_, k);
      return k.toUpperCase();
    });

  let val = process.env[key];
  if(/^(yes|on|enabled|true)$/i.test(val)){
    val = true;
  }else if(/^(no|off|disabled|false)$/i.test(val)){
    val = false;
  }else if(val === 'null') {
    val = null;
  }else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;

}, {});



console.log(
  exports.inspectOpts
);