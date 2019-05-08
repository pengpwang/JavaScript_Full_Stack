const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({
        path: `./public/${Date.now()}.png`
    });
    await browser.close();
})();