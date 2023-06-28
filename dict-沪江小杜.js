const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}
var cihui = require('./单词分类/gre词汇(除初考外).json')

var cihui2 = require('./单词分类/初中高中四级词汇.json')
var cihui3 = require('./单词分类/考研六级托福SAT词汇.json')

cihui = cihui.concat(cihui2, cihui3)

cihui = [...new Set(cihui)]

var exists = require('./单词分类/已下载但未过滤的词汇汇总.json')

exists = exists.map(w => w.toLowerCase())

cihui = cihui.filter(w => !exists.includes(w.toLowerCase()))


let prefixUrl = 'lw'
let requestUrl = ''
let dwn = ''

switch (prefixUrl) {
  case 'lw':
    requestUrl = 'https://www.ldoceonline.com/dictionary/'
    dwn = 'ldoceonline.com'
    break
    case 'hj':
      requestUrl = 'https://dict.hjenglish.com/w/'
    dwn = 'hjenglish.com'
    break
    case 'by':
      requestUrl = 'https://www.bing.com/dict/search?q='
    dwn = 'bing.com'
    break
    case 'yd':
      requestUrl = 'https://youdao.com/w/'
    dwn = 'youdao.com'
    break
    case 'hc':
      requestUrl = 'http://dict.cn/'
    dwn = 'dict.cn'
    break
    case 'wr':
      requestUrl = 'https://www.wordreference.com/enzh/'
    dwn = 'wordreference.com'
    break
    case 'jq':
      requestUrl = 'https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/'
    dwn = 'dictionary.cambridge.org'
    break
    case 'xdf':
      requestUrl = 'https://www.koolearn.com/dict/search/index?keywords='
    dwn = 'koolearn.com'
    break
    case 'cls':
      requestUrl = 'https://www.collinsdictionary.com/zh/dictionary/english-chinese/'
    dwn = 'collinsdictionary.com'
    break
}

if (requestUrl === '') {
  console.log('暂停...'.bgRed)
  return false
}

// if (Date.now()) {
//   console.log('切换url时，请改请求头...'.bgRed)
//   return false
// }

// 词性：part of speech
// var POS = 
// 名词(none)、 动词(verb)、 形容词(adjective)、 副词(adverb)、 冠词(article)、 代词(pronoun)、 数词(numeral)、介词(preposition)、 连词(conjunction)、 感叹词(interjection)

require('colors')

function delSpace(str) {
  return str.replace(/^\s+|\s+$/g, "")
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let count = 0

let endsleep = true

const test = {
  not: 0,
  local: 0,
  req: 0
}

const c = new Crawler({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    "cookie": "iawpvccs=1; iawsc1m=1; iawpvc=1; iawpvtc1m=1; _pbjs_userid_consent_data=3524755945110770; _sharedID=7fa963c7-55fc-4dde-8605-9b5a9692feb2; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Jun+28+2023+11%3A37%3A43+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202303.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.ldoceonline.com%2Fdictionary%2Ftype&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A0; _ga=GA1.3.662402859.1687923464; _gid=GA1.3.1427758519.1687923464; _gat=1; _ga_XTSM3GZLX5=GS1.1.1687923464.1.0.1687923464.0.0.0; _ga=GA1.1.662402859.1687923464; __qca=P0-203542745-1687923462402; _lr_retry_request=true; _lr_env_src_ats=false; pbjs-unifiedid=%7B%22TDID%22%3A%220b03f864-ad8e-42e5-a513-645318ca5ddd%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222023-05-28T03%3A37%3A47%22%7D; cto_bundle=uvqUEV9NcmFIUUlTUUl4b2JBbkx2aWppZSUyRmRZRXhRSHJHcm1jSzc2NSUyRmJJdkFLYm42dVh4enRmb2VBSUt4bGNsbHJxVEl1WG1PJTJCQU9oQXAxSnFPJTJGRlhITDQ4QXgyeVRtUDI0SUpUMHptWiUyRnBVaVhybkZsTTlGRVpXZm0lMkJGbGNoVjB3MEhGRSUyQkZpVGZLampzY05RdURQdGdMZyUzRCUzRA; cto_bidid=UT7eoV9tRjM0MEZSanpvN2hvWDFNSnpBcHVZM2I3aDc2dzNvYTZvbHlOa2JmR0xvT3JiWWNjSnYzOWc2MUN1RGhaYUJlN3lzRkRDcFREMTRGRm9tR3ZiSkZNS3kzR2xvNEtLV2xTeDdoR08xVU1OcFZnRFZFakhhMVhwSU1Vb090UGolMkJJ",
  },
  // http2: true,

  retries: 1,
  rateLimit: 3000,
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$;
      // console.log($('title').text());
    }
    done();
  }
});

c.on('drain', () => {
  // For example, release a connection to database.
  console.log('\n\n\-----------------------------------'.red)
  console.log('------------------任务调用完成---------'.red)
  console.log('-----------------------------------\n\n'.red)
});

let rawDataq = []

let rawDataDir = './' + dwn + '/html'; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir,  {recursive: true})
}

if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i];

    fileName = decodeURIComponent(fileName)

    rawDataq.push(fileName.split('.html')[0])
  }

  rawDataq = rawDataq.map(w => w.toLowerCase())

  cihui = cihui.filter(w => !rawDataq.includes(w.toLowerCase()))

  let lengthd = cihui.length

  console.log(lengthd, 'len')
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


    let url = encodeURI(requestUrl + cihui)


    if (rawDataq.find(ci => ci === cihui)) {
      url = encodeURI('http://localhost:3000/' + dwn +  '/html/' + cihui + '.html')

      console.log('\n')
      console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
      test.local++
      console.log(JSON.stringify(test).bgBlue)
      console.log('该单词以完成本地存储，将自动跳过', cihui)

      return true

    }

      ;(function () {

        var endsleepC = endsleep
        c.queue([{
          preRequest: (options, done) => {
            var coutC = count
            if (coutC && coutC % 35 === 0) {
              (async function () {
                console.log('正在休眠...'.bgRed);
                endsleep = false
                let sleepTime = prefixUrl === 'hj' ? 1000 * 60 * 3 : 1000 * 6
                await sleep(sleepTime);
                endsleep = true
                console.log('休眠结束...'.bgRed);
                done()
              })();
            } else {
              done()
            }
          },
          proxy: 'http://127.0.0.1:7890',
          uri: url,
          // uri: 'http://localhost:3000/dict.hjenglish.com/html/get up.html',
          // uri: encodeURIComponent('https://www.dict.hjenglish.com/enzh/' + 'against'),
          jQuery: true,
          callback: (error, res, done) => {
            test.req++
            console.log('\n')
            console.log('------------------请求开始---------------------'.bgGreen, cihui.red, index.toString().green, lengthd.toString().yellow)
            // console.log(res.request.uri.href, '当前请求的url')
            if (error) {
              console.log(error);
            } else {

              if (prefixUrl === 'xdf') {
                const dictkk = ({
                  name: cihui,
                  url: res.request.uri.href
                })
                fs.appendFileSync(`新东方dicturl.txt`, JSON.stringify(dictkk) + ',')
              } else {
                let $ = res.$;

                if (!$) {
                  console.log(`是否出错了，爬虫暂停了${new Date()}`.red)
                }

                fs.writeFileSync(('./' + dwn + '/html/' + encodeURIComponent(cihui) + '.html'), res.body || '')

                count++

                console.log("数据写入成功！-----html源码", cihui.red, count.toString().yellow, lengthd.toString().bgYellow);
              }
            }
            done();
          }
        }])
      })();
  })
} else {
  console.log('not found');
}
