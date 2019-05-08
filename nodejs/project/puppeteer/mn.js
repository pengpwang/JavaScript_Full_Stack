const puppeteer = require('puppeteer');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const dir = path.join(__dirname, 'public');


// urlToImage
const urlToImage = promisify((url, directory, callback) => {
    const mod = /^https:/.test(url) ? https : http;
    const ext = path.extname(url);
    const file = path.join(directory, `${Date.now()}${ext}`)
    mod.get(url, (res) => {
        res.pipe(fs.createWriteStream(file))
            .on('finish', () => {
                callback();
                console.log(file);
            })
    })
});

// base64ToImage
const base64ToImage = async (base64Str, directory) => {
    // data:image/jpeg;base64,//dasd

    const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);

    try {
        const ext = matches[1].split('/')[1]
            .replace('jpeg', 'jpg');
        const file = path.join(directory, `${Date.now()}.${ext}`);
        await writeFile(file, matches[2], 'base64');
        console.log(file);
    } catch (e) {
        console.log('非法 base64 字符串');
    }
};


const srcToImg = async (src, directory) => {
    if(/\.(jpg|png|gif)/.test(src)){
        await urlToImage(src, directory);     
    }else{
        await base64ToImage(src, directory);
    }
}


(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://image.baidu.com');
    console.log('go to https://image.baidu.com');

    await page.setViewport({
        width: 1920,
        height: 1080
    });
    console.log('reset viewport');

    await page.focus('#kw');
    await page.keyboard.sendCharacter('狗');
    await page.click('span.s_search');
    console.log('go to search list');

    page.on('load', async () => {
        console.log('page loading done, start fetch...');

        const srcs = await page.evaluate(() => {
            const images = document.querySelectorAll('img.main_img');
            console.log(1, images);
            return Array.prototype.map.call(images, img => img.src);
        });

        srcs.forEach(async src => {
           await srcToImg(src, dir);
        });

        await browser.close();

    });
})();
