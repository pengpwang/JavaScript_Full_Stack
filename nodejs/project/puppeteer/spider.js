const puppteer = require('puppeteer');
const path = require('path');
const http = require('http');
const fs = require('fs');
const { promisify } = require('util');
// const iPhoneX = puppteer.devices['iPhone X'];
const directory = path.join(__dirname, './public');

const urlToImage = promisify((url, dir, callback) => {
  const ext = path.extname(url);
  const file = path.join(dir, `${Date.now()}-${Math.random()}${ext}`);
  http.get(url, (res) => {
    res.pipe(fs.createWriteStream(file))
      .on('finish', () => {
        callback();
        console.log(file);
      });
  });
});

(async () => {
  const browser = await puppteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.emulate(iPhoneX);
  await page.goto('http://www.win4000.com/mt/wangzherongyao.html');
  console.log(`go to http://www.win4000.com/mt/wangzherongyao.html`);

  const srcs = await page.evaluate(() => {
    const images = document.querySelectorAll('.tab_box li img');
    return Array.prototype.map.call(images, img => img.src);
  });

  console.log('srcs', srcs);

  for(let v of srcs){
    await urlToImage(v, directory);
  }

  await browser.close();

})();