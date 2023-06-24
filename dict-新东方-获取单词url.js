const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是{cihui: []}
var cihui = require('./勿删-单词文件表wordreferencecom')

var exists = require('./新东方测试 copy')


// 词性：part of speech
// var POS = 
// 名词(none)、 动词(verb)、 形容词(adjective)、 副词(adverb)、 冠词(article)、 代词(pronoun)、 数词(numeral)、介词(preposition)、 连词(conjunction)、 感叹词(interjection)

require('colors')

const startTime = Date.now()

function delSpace (str) {
  return str.replace(/^\s+|\s+$/g,"")
}

const c = new Crawler({
  headers: {
    'Cookie': '__jsluid_s=1542f9154b8f634c285b7d1ecaf9e32c; KUID=s18bj11686837725166; _ga=GA1.2.230887278.1686837726; __jsluid_h=873ba27ec76ae117eea0e1f8d758eb3e; Hm_lvt_a78730c23915ac97dab8434b52be3e7d=1686837799; gr_user_id=9de994ea-8f20-4e21-82e5-f485ea10ef4f; _gid=GA1.2.742312332.1687452916; _csrf=172d6b033c26c3880a92c1813393eccb64ef98780e6f8a9fa4256971387edec5a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%2254iobxQkiyC3YWbRYhG-rOf1tiYxiYKt%22%3B%7D; php-webapp-dict=63df0281ff3858097dbd2665fdaecb90; log.session=ae157bf172e504baa71c475ad55a7d14; Hm_lvt_5023f5fc98cfb5712c364bb50b12e50e=1686837725,1687452916,1687484799; wwwad=true; k12-ui-www-pc=a32ee7c930a9cd4d68440c291beb1c41; Hm_lpvt_5023f5fc98cfb5712c364bb50b12e50e=1687484845; koo.line=un; prelogid=6a901b402a96f56a44363755a98b0c15; _ga_8RBHSP5JM6=GS1.2.1687484800.2.1.1687484846.14.0.0',
    // ':Authority': 'www.koolearn.com'
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


const rawDataq = []

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

  let already = exists.exist.map(word => word.name)

  let lengthd = cihui.cihui.length - already.length

  

  cihui.cihui.forEach((cihui, index) => {

    if (already.includes(cihui)) {
      console.log(`已存在 + ${cihui}`.red)
      return false
    }


    let url = encodeURI('https://www.koolearn.com/dict/search/index?keywords=' + cihui)

    c.queue([{
      proxy: 'http://127.0.0.1:7890',
      uri: url,
      // uri: 'http://localhost:3000/koolearn.com/html/get up.html',
      // uri: encodeURI('https://www.koolearn.com/enzh/' + 'against'),
      jQuery: true,
      callback: (error, res, done) => {
        test.req++
        // console.log(JSON.stringify(test).bgBlue)
        console.log('\n')
        console.log('------------------请求开始---------------------'.bgGreen, cihui.red, index.toString().green, lengthd.toString().yellow)
        // console.log(res.request.uri.href, '当前请求的url')
        if (error) {
          console.log(error);
        } else {

          // console.log(Object.keys(res.request), '测试', res.request.response)

          const dictkk = ({
            name: cihui,
            url: res.request.uri.href
          })

          fs.appendFileSync('./新东方测试.json', JSON.stringify(dictkk) + ',')

        }
        done();
      }
    }]);
  })
} else {
  console.log('not found');
}
