const Crawler = require("crawler");
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}
var cihui = require("./单词分类/vuejs-doc-words.json");

var exist = require("./allwords");
exist = exist.map((w) => w.toLowerCase());

cihui = cihui.filter((w) => !exist.includes(w.toLowerCase()));

cihui = [...new Set(cihui)];

console.log(cihui.length);
// return false;

let prefixUrl = "hj";
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

if (requestUrl === "") {
  console.log("暂停...".bgRed);
  return false;
}

require("colors");

function delSpace(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let count = 0;

const test = {
  not: 0,
  local: 0,
  req: 0,
};

const c = new Crawler({
  headers: {
    cookie: `HJ_UID=1575512c-1a27-8ad1-0179-ab9db0bf4294; TRACKSITEMAP=3; _REF=; _SREF_3=; acw_tc=76b20f6216886273550305613e04e0b23b48fcb36f843323ebed49d9899e9a; HJ_CST=0; HJ_SID=z7l5b0-00a8-4c15-a5f8-38bd54b13faf; HJ_SSID_3=z7l5b0-a89a-43d2-8f31-1240315cfe41; HJ_CSST_3=1; _SREG_3=direct%7C%7Cdirect%7Cdirect; _REG=direct%7C%7Cdirect%7Cdirect`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Referrer-Policy": "no-referrer-when-downgrade",
  },
  // http2: true,

  retries: 1,
  rateLimit: 2000,
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
    }
    done();
  },
});

c.on("drain", () => {
  console.log("\n\n-----------------------------------".red);
  console.log("------------------任务调用完成---------".red);
  console.log("-----------------------------------\n\n".red);
});

let rawDataq = [];

let rawDataDir = "./" + dwn + "/html"; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir, { recursive: true });
}

if (fs.existsSync(rawDataDir)) {
  // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i];

    fileName = decodeURIComponent(fileName);

    rawDataq.push(fileName.split(".html")[0]);
  }

  rawDataq = rawDataq.map((w) => w.toLowerCase());

  cihui = cihui.filter((w) => !rawDataq.includes(w.toLowerCase()));

  let lengthd = cihui.length;

  console.log(lengthd, "len");
  // return true

  cihui.forEach((cihui, index) => {
    /**
     * 查词url：
     *
     * 1. 朗文：'https://www.ldoceonline.com/dictionary/' + cihui
     * 2. 沪江：'https://dict.hjenglish.com/w/' + cihui
     * 3. 必应：'https://www.bing.com/dict/search?q=' + cihui
     * 4. 有道：'https://youdao.com/w/' + cihui
     * 5. 新东方：'https://www.koolearn.com/dict/search/index?keywords=' + cihui，仅获取单词url，还需二次获取
     * 6. 海词：'http://dict.cn/' + cihui
     * 7. 科林斯：'https://www.collinsdictionary.com/zh/dictionary/english-chinese/' + cihui，需postman，该爬虫爬不到
     * 8. wordreference：'https://www.wordreference.com/enzh/' + cihui
     * 9. 剑桥：'https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/' + cihui
     */

    let url = encodeURI(requestUrl + cihui);

    if (rawDataq.find((ci) => ci === cihui)) {
      url = encodeURI(
        "http://localhost:3000/" + dwn + "/html/" + cihui + ".html"
      );
      console.log("该单词以完成本地存储，将自动跳过", cihui);
      return true;
    }

    ;(function () {
      c.queue([
        {
          preRequest: (options, done) => {
            var coutC = count;
            if ((coutC && coutC % 35 === 0) || coutC === 3000) {
              (async function () {
                console.log("正在休眠...".bgRed);
                let sleepTime = prefixUrl === "hj" ? 1000 * 60 * 3 : 1000 * 3;
                await sleep(sleepTime);
                console.log("休眠结束...".bgRed);
                done();
              })();
            } else {
              done();
            }
          },
          // proxy: 'http://127.0.0.1:7890',
          uri: url,
          // uri: 'http://localhost:3000/dict.hjenglish.com/html/get up.html',
          // uri: encodeURIComponent('https://www.dict.hjenglish.com/enzh/' + 'against'),
          jQuery: true,
          callback: (error, res, done) => {
            test.req++;
            // console.log(res.request.uri.href, '当前请求的url')
            if (error) {
              console.log(error);
            } else {
              let $ = res.$;

              if (!$) {
                console.log(`是否出错了，程序暂停了${new Date()}`.red);
              }

              fs.writeFileSync(
                "./" + dwn + "/html/" + encodeURIComponent(cihui) + ".html",
                res.body || ""
              );

              count++;

              console.log(`start ${cihui} ratio: ${count}/${lengthd}`.red);
            }
            done();
          },
        },
      ]);
    })();
  });
} else {
  console.log("not found");
}
