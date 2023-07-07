// Add import of CheerioCrawler
let crawlee = require("crawlee");
let {
  log,
  LoggerJson,
  RequestQueue,
  RequestList,
  CheerioCrawler,
  PlaywrightCrawler,
  ProxyConfiguration,
} = crawlee;
let fs = require("fs");
require("colors");

var cihui = require('./单词分类/vuejs-doc-words.json')

var exist = require('./allwords')

let prefixUrl = "voc";
let requestUrl = "";
let dwn = "";

let startTime = Date.now()

if (prefixUrl === 'cls') {
  exist = exist.map((w) => w.toLowerCase());
  cihui = cihui.filter((w) => !exist.includes(w.toLowerCase()));
}

if (prefixUrl === 'voc') {
  cihui = cihui.concat(exist)
}

cihui = [...new Set(cihui)]

cihui.sort(function(a, b) {
  if (a > b) {
    return 1
  }
  return -1
})

cihui = cihui.filter(w => delSpace(w))

console.log(cihui.length)

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
  return !rawDataq.includes(w.toLowerCase())
});

let lengthd = cihui.length;
let count = 0

console.log(lengthd, "len");

// return false

cihui = cihui.map((ci) => requestUrl + ci);

init();
async function init() {
  const sources = cihui

  const proxyConfiguration = new ProxyConfiguration({
    proxyUrls: ["http://127.0.0.1:7890"],
  });

  log.setOptions({
    level: log.LEVELS.ERROR,
    logger: new LoggerJson(),
  });

  // Open the request list with the initial sources array
  const requestList = await RequestList.open("my-list", sources);
  const requestQueue = await RequestQueue.open();

  // Create the crawler and add the queue with our URL
  // and a request handler to process the page.
  const crawler = new PlaywrightCrawler({
    // proxyConfiguration,
    maxRequestsPerCrawl: 3000,
    maxConcurrency: 1,
    maxRequestsPerMinute: 60,
    requestList,
    requestQueue,
    // The `$` argument is the Cheerio object
    // which contains parsed HTML of the website.
    async requestHandler(res) {
      const actorText = await res.page.content();
      // Extract <title> text with Cheerio.
      // See Cheerio documentation for API docs.

      let name = res.request.url.split('https://www.vocabulary.com/dictionary/')

      if (prefixUrl === 'cls') {
        name = res.request.url.split('https://www.collinsdictionary.com/zh/dictionary/english-chinese/')
      }

      name = name[1] || 'a_error_error'

      fs.writeFileSync(
        "./" + dwn + "/html/" + encodeURIComponent(name) + ".html",
        actorText || ""
      );
      count++
      let endTime = Date.now()
      let cha = ((endTime - startTime) / 1000 / 60).toFixed(2)
      console.log(`${name}, r: ${count}/${lengthd}, t: ${cha}min`.red);
    },
  });

  // Start the crawler and wait for it to finish
  await crawler.run();
}

function delSpace(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
