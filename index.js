const puppeteer = require('puppeteer');

const initUrl = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/index.html";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(initUrl);
    await page.screenshot({path: "dist//screenhost.png"});

    await browser.close();
})();