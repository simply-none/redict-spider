// Add import of CheerioCrawler
let crawlee = require("crawlee");
let {
  RequestQueue,
  RequestList,
  CheerioCrawler,
  PlaywrightCrawler,
  ProxyConfiguration,
} = crawlee;
let fs = require("fs");
require("colors");

var cihui = require("./单词分类/gre词汇(除初考外).json");

var cihui2 = require("./单词分类/初中高中四级词汇.json");
var cihui3 = require("./单词分类/考研六级托福SAT词汇.json");

var exists = require("./单词分类/已下载但未过滤的词汇汇总.json");

cihui = cihui.concat(cihui2, cihui3, exists);

cihui = [...new Set(cihui)];

cihui = cihui.map((ci) => ci.toLowerCase());

console.log(cihui.length);

let prefixUrl = "voc";
let requestUrl = "";
let dwn = "";

switch (prefixUrl) {
  case "lw":
    requestUrl = "https://www.ldoceonline.com/dictionary/";
    dwn = "ldoceonline.com";
    break;
  case "hj":
    requestUrl = "https://dict.hjenglish.com/w/";
    dwn = "hjenglish.com";
    break;
  case "by":
    requestUrl = "https://www.bing.com/dict/search?q=";
    dwn = "bing.com";
    break;
  case "yd":
    requestUrl = "https://youdao.com/w/";
    dwn = "youdao.com";
    break;
  case "hc":
    requestUrl = "http://dict.cn/";
    dwn = "dict.cn";
    break;
  case "wr":
    requestUrl = "https://www.wordreference.com/enzh/";
    dwn = "wordreference.com";
    break;
  case "jq":
    requestUrl = "https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/";
    dwn = "dictionary.cambridge.org";
    break;
  case "xdf":
    requestUrl = "https://www.koolearn.com/dict/search/index?keywords=";
    dwn = "koolearn.com";
    break;
  case "cls":
    requestUrl =
      "https://www.collinsdictionary.com/zh/dictionary/english-chinese/";
    dwn = "collinsdictionary.com";
    break;
  case "mzl":
    requestUrl = "https://www.merriam-webster.com/dictionary/";
    dwn = "merriam-webster.com";
    break;
  case "voc":
    requestUrl = "https://www.vocabulary.com/dictionary/";
    dwn = "vocabulary.com";
    break;
}


console.log(cihui.length, "len");

let rawDataq = [];

let rawDataDir = "./" + dwn + "/html"; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir, { recursive: true });
}

let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。

console.log(files.length, '已完成数量')
for (let i = 0; i < files.length; i++) {
  let fileName = files[i];

  fileName = decodeURIComponent(fileName);

  rawDataq.push(fileName.split(".html")[0]);
}

rawDataq = rawDataq.map((w) => w.toLowerCase());

cihui = cihui.filter((w) => {
  if (rawDataq.includes(w.toLowerCase())) {
    console.log('输出')
  }
  return !rawDataq.includes(w.toLowerCase())
});

let lengthd = cihui.length;

console.log(lengthd, "len");

cihui = cihui.map((ci) => requestUrl + ci);

init();
async function init() {
  const sources = cihui

  const proxyConfiguration = new ProxyConfiguration({
    proxyUrls: ["http://127.0.0.1:7890"],
  });

  // Open the request list with the initial sources array
  const requestList = await RequestList.open("my-list", sources);
  const requestQueue = await RequestQueue.open();

  // Create the crawler and add the queue with our URL
  // and a request handler to process the page.
  const crawler = new PlaywrightCrawler({
    proxyConfiguration,
    maxConcurrency: 3,
    maxRequestsPerMinute: 30,
    requestList,
    requestQueue,
    // The `$` argument is the Cheerio object
    // which contains parsed HTML of the website.
    async requestHandler(res) {
      const actorText = await res.page.content();
      // Extract <title> text with Cheerio.
      // See Cheerio documentation for API docs.

      let name = res.request.url.split('https://www.vocabulary.com/dictionary/')

      name = name[1] || 'a_error_error'

      console.log(`start ${name}`.bgRed);

      fs.writeFileSync(
        "./" + dwn + "/html/" + encodeURIComponent(name) + ".html",
        actorText || ""
      );
    },
  });

  // Start the crawler and wait for it to finish
  await crawler.run();
}
