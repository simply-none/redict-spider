const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}

var cihui = require('./新东方测试 copy')


// 词性：part of speech
// var POS = 
// 名词(none)、 动词(verb)、 形容词(adjective)、 副词(adverb)、 冠词(article)、 代词(pronoun)、 数词(numeral)、介词(preposition)、 连词(conjunction)、 感叹词(interjection)

require('colors')

const startTime = Date.now()

function delSpace (str) {
  return str.replace(/^\s+|\s+$/g,"")
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


const c = new Crawler({
  headers: {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "__jsluid_s=1542f9154b8f634c285b7d1ecaf9e32c; KUID=s18bj11686837725166; _ga=GA1.2.230887278.1686837726; __jsluid_h=873ba27ec76ae117eea0e1f8d758eb3e; Hm_lvt_a78730c23915ac97dab8434b52be3e7d=1686837799; gr_user_id=9de994ea-8f20-4e21-82e5-f485ea10ef4f; _gid=GA1.2.742312332.1687452916; _csrf=93cfde206d5fac331ae65d417abc54428e215a82a1cec221c808f404c23026cba%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22sfIu4ZxWfQasdlXgfZbLue-MVj4Pr0KP%22%3B%7D; php-webapp-dict=5f4d489271c5f4830d1ec39a7b846449; log.session=134fd7adae2e98509eddfa358057e80e; Hm_lvt_5023f5fc98cfb5712c364bb50b12e50e=1686837725,1687452916,1687484799,1687503248; wwwad=true; Hm_lpvt_5023f5fc98cfb5712c364bb50b12e50e=1687516850; prelogid=2d50c51c19f832160d955a6fa3148b70; koo.line=un; _gat=1; _ga_8RBHSP5JM6=GS1.2.1687516852.4.0.1687516852.60.0.0",
    "Referer": "https://www.koolearn.com/dict/wd_156384.html",
    "Referrer-Policy": "no-referrer-when-downgrade"
  },
  retries: 1,
  rateLimit: 2000,
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

let count = 0

const test = {
  not: 0,
  local: 0,
  req: 0
}

let dictfile = []

let rawDataDir = './koolearn.com/html'; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理
if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];

    rawDataq.push(fileName.split('.')[0])
  }

  rawDataq = rawDataq.map(w => decodeURIComponent(w).toLowerCase())

  cihui.cihui = cihui.cihui.filter(word => !rawDataq.includes(word.name.toLowerCase()))

  let cihui_len = cihui.cihui.length

  cihui.cihui.forEach((cihui, index) => {

    if (rawDataq.includes(cihui.name)) {
      console.log('当前词汇一缓存'.green)
      return false
    }

    let url = encodeURI(cihui.url)

    c.queue([{
      proxy: 'http://127.0.0.1:7890',
      uri: url,
      // uri: 'http://localhost:3000/koolearn.com/html/get up.html',
      // uri: encodeURI('https://www.koolearn.com/enzh/' + 'against'),
      jQuery: true,
      preRequest: (options, done) => {
        var coutC = count
        if (coutC && coutC % 35 === 0) {
          (async function () {
            console.log('正在休眠...'.bgRed);
            endsleep = false
            await sleep(1000 * 10 * 1);
            endsleep = true
            console.log('休眠结束...'.bgRed);
            done()
          })();
        } else {
          done()
        }
      },
      callback: (error, res, done) => {
        test.req++
        // console.log(JSON.stringify(test).bgBlue)
        console.log('\n')
        console.log('------------------请求开始---------------------'.bgGreen, cihui.name.red, index.toString().green, cihui_len.toString().red)
        // console.log(res.request.uri.href, '当前请求的url')
        if (error) {
          console.log(error);
        } else {

          // console.log(Object.keys(res.request), '测试', res.request.response)

          let $ = res.$;

          fs.writeFileSync('./koolearn.com/html/' +  encodeURIComponent(cihui.name) + '.html', res.body || '')

          count++

          console.log("数据写入成功！-----html源码", cihui.name.red, count.toString().yellow);

        }
        done();
      }
    }]);
  })
} else {
  console.log('not found');
}
