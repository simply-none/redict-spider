const Crawler = require("crawler");
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}
var cihui = require("./notDwnWordsInCocaHaici");

var exist = require("./allwords");
exist = exist.map((w) => w.toLowerCase());

cihui = cihui.filter((w) => !exist.includes(w.toLowerCase()));

cihui = [...new Set(cihui)];

console.log(cihui.length);
// return false;

let prefixUrl = "jq";
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

let startTime = Date.now()

const c = new Crawler({
  headers: {
    cookie: `preferredDictionaries="english-chinese-simplified,english,british-grammar,english-spanish,spanish-english"; _ga=GA1.3.1313493786.1687675151; amp-access=amp-D4I4I-2LslUN7jN2KsHGnw; _pbjs_userid_consent_data=3524755945110770; _sharedID=45a7e498-81d9-4547-9366-2b0b0eca2738; _lr_env_src_ats=false; pbjs-unifiedid=%7B%22TDID%22%3A%220b03f864-ad8e-42e5-a513-645318ca5ddd%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222023-05-25T06%3A39%3A17%22%7D; _hjSessionUser_2790984=eyJpZCI6ImUzNTZhZTdkLTE4MDItNTg3ZS05YzFkLTA4OWY1Yzk0ZjFhMiIsImNyZWF0ZWQiOjE2ODc2NzUxNTMyMTMsImV4aXN0aW5nIjp0cnVlfQ==; cto_bidid=e71-o19CbkxSJTJCUlRJVjNIMGViJTJGaGFpcUhmN2owRnBGcFd5Z0FodVRZcVlEejBwQnlNVzZiQnluN0VQbEh2JTJGVnFYWDFjYk1kNENjYm5JWXpEZUxGSXZSVTlPMk9vQ2FoOGYlMkIxUHJGYVElMkJ6JTJGSHJZZyUzRA; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Jul+06+2023+14%3A51%3A15+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202303.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A0&AwaitingReconsent=false; iawpvccs=1; iawsc1m=5; iawpvc=7; iawpvtc1m=7; _sp_id.7ecc=b8973dad-0ddb-47bc-99c8-6a33de37ac30.1687675152.4.1688626333.1687912696.33760827-563e-4e16-91e1-2580a3617ca7.7546fce3-77ae-4e3d-8068-e84ec85d9af8.570264a5-c137-44c7-9525-d8a73f78eef5.1688626270811.3; cto_bundle=0pknzV9BYkclMkJsTjVDSGhmM3MxVlBYOHp0S1d1ZjdteFFrbDBBaSUyQlhpa2lTbVI5MkZIQ3pDbHQ1ZndLYmtzR3dEOSUyQlFUeHAyZzlVZXM0MVhaJTJGRXYxbnUwdng1Rmx5NTlSUHREelVqRDRIRiUyRml0V0xEUTdiWENDTDhRSWlocWI4ZmVjeWY3eUxzM0tNQmFLZTdLYUlKMXFOVGFBJTNEJTNE; _ga_L9GCR21SZ7=GS1.3.1688626270.5.0.1688626378.60.0.0`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Referrer-Policy": "no-referrer-when-downgrade",
  },
  // http2: true,

  retries: 1,
  rateLimit: 2700,
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
              let endTime = Date.now()
              let cha = ((endTime - startTime) / 1000 / 60).toFixed(2)
              console.log(`${cihui}, r: ${count}/${lengthd}, t: ${cha}min`.red);
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
