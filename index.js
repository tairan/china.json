const puppeteer = require("puppeteer");
const fs = require("fs");

// 国家统计局
const initUrl =
  "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2018/index.html";

// 国家民政部
const url2 =
  "http://www.mca.gov.cn/article/sj/xzqh/2019/2019/201912251506.html";


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url2);
  let areas = await page.evaluate(() => {
    const rows = document.querySelectorAll("table > tbody > tr");
    let data = [];
    rows.forEach(row => {
      var columns = row.querySelectorAll("td");
      var node = [];
      columns.forEach(col => {
        if (col.innerText != "") {
          node.push(col.innerText.trim());
        }
      });
      data.push(node);
    });
    return data;
  });

  var data = [];
  areas.forEach(row => {
    if (row[0] != null && row[1] != null) {
      data.push([row[0], row[1]]);
    }
  });

  data.shift(); // remote table head

  fs.writeFileSync("dist/mca.china.json", JSON.stringify(data));

  await browser.close();
})();
