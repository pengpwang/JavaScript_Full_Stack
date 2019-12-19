
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
// 参考：debug模块
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
   console(`JavaScript Run Env is Brower`);
} else {
  console(`JavaScript Run Env is Nodejs`);
}