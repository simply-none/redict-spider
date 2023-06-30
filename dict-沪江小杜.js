const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}
var cihui = require('./单词分类/gre词汇(除初考外).json')

var cihui2 = require('./单词分类/初中高中四级词汇.json')
var cihui3 = require('./单词分类/考研六级托福SAT词汇.json')

cihui = cihui.concat(cihui2, cihui3)

cihui = [...new Set(cihui)]

var xindongfangcihui = require('./新东方测试.json')

var exists = require('./单词分类/已下载但未过滤的词汇汇总.json')

exists = exists.map(w => w.toLowerCase())

cihui = cihui.filter(w => !exists.includes(w.toLowerCase()))


let prefixUrl = 'hc'
let requestUrl = ''
let dwn = ''

if (prefixUrl === 'xdf') {
  xindongfangcihui = xindongfangcihui.map(ci => ci.name.toLowerCase())

  console.log(xindongfangcihui, xindongfangcihui.length)

  cihui = cihui.filter(w => !xindongfangcihui.includes(w.toLowerCase()))
}

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
    "cookie": "llang=enzhi; _pbjs_userid_consent_data=3524755945110770; _sharedid=aa3c30d4-efe5-4b3b-9d38-a3051d7b24cf; __gads=ID=1287f16a8d27799c:T=1687228433:RT=1687228433:S=ALNI_Mah1D8camy0Qc-WAojJf1TVXKSn7Q; __gpi=UID=00000c14cf6e84bc:T=1687228433:RT=1687228433:S=ALNI_Ma9-wzZgTj-b3XN0Zi3WrcOQP-pHQ; cto_bundle=yHoMr18lMkZiOFNSc0dhN21TWWpIMkZwT0VTJTJCbnZuQW9uVmo4V1pNbkZOJTJGdElYa3JQYSUyRkNlYjN3R0RtUHFVSGdJdzltUE82Y2p0ZnhoRkR6M3ZHa1BLR0l4MlRXMUg2cDB6RTVENXpHQzhvSUlWMWMxMGM4bklzb2pObEFwRElYQUpxMUo2RSUyQjRpVVl0dHZLaVB3ckFyRGlIWGxRJTNEJTNE; cto_bidid=mn1tg18xNmhObjZCc0dHUkZMczZncDBLTHlkYkVuYnFrWU5oTVpGb1ZxWVRZSWdEeDFIU05JUnNsN0pQWVIwYXp1MWgwd1Zqd3pMWkhKejBCa0FVaEVHU1lWJTJCSVZSeDBFUUslMkZFdDBUNWJtVjZ0YmQ3QTBsM05hQUtVSkh5WGx1a1pZTWo; FCNEC=%5B%5B%22AKsRol9d_qXOQ4gLqp5UDiUb-PLRfeg7PEdIfAa7SBG5UzJxNnybFMoCQFoDYFj0-V2qIjETgSVChL4KsljWP8vtoMADv4zviy8l0GcwA6jCQ-t5Ml6myLJEs8lNx5rluOFGPqC-Mr4Vdmet6j3WEdxQi9KMQ0a7OQ%3D%3D%22%5D%2Cnull%2C%5B%5D%5D; _ga=GA1.1.326739331.1687135003; _ga_WV46ZWEMKW=GS1.1.1687758932.9.0.1687758932.60.0.0",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Referrer-Policy": "no-referrer-when-downgrade"
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
          // proxy: 'http://127.0.0.1:7890',
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
