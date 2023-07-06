const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是字符串数组
var cihui = require('./新东方测试new.json')

let exists = require('./allwords')

console.log(exists.length, 'ces')

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
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    "cookie": "__jsluid_s=3b151ea47832df6d672c5d6ef1e85adb; KUID=f9ufqg1687744936417; _ga=GA1.2.978356362.1687744937; _csrf=19664b91032ab197be23570ac3630244da2d2ff6699b669a9df26ff7ce83bdd0a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22SJ39hd8T_glVCFTBAy44atcGbVpDJ9DF%22%3B%7D; php-webapp-dict=63df0281ff3858097dbd2665fdaecb90; log.session=f140b56f9f3de3b9bd40e9d46149ddeb; koo.line=un; Hm_lvt_5023f5fc98cfb5712c364bb50b12e50e=1687744936,1688021791,1688608384; Hm_lpvt_5023f5fc98cfb5712c364bb50b12e50e=1688608384; k12-ui-www-pc=afa2fe87d75ece2f14fefa3a1d97aa09; prelogid=4a6f0c6666ad02b126d7e8df9dae6783; _gid=GA1.2.1680551020.1688608385; _gat=1; _ga_8RBHSP5JM6=GS1.2.1688608386.5.0.1688608386.60.0.0; wwwad=true",
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

if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir, { recursive: true });
}

// 2. 读取源文件夹下的所有文件，批量处理
if (fs.existsSync(rawDataDir)) {
  let files = fs.readdirSync(rawDataDir);
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];

    rawDataq.push(fileName.split('.')[0])
  }

  rawDataq = rawDataq.map(w => decodeURIComponent(w).toLowerCase())
  exists = exists.map(w => decodeURIComponent(w).toLowerCase())

  cihui = cihui.filter(word => !rawDataq.includes(word.name.toLowerCase()))
  cihui = cihui.filter(word => !exists.includes(word.name.toLowerCase()))

  let cihui_len = cihui.length

  console.log(cihui_len)
  // return false

  cihui.forEach((cihui, index) => {

    if (rawDataq.includes(cihui.name)) {
      console.log('当前词汇一缓存'.green)
      return false
    }

    let url = encodeURI(cihui.url)

    c.queue([{
      // proxy: 'http://127.0.0.1:7890',
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
            await sleep(1000 * 5 * 1);
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
        console.log('\n')
        console.log('------------------start---------------------'.bgGreen, cihui.name.red, index.toString().green, cihui_len.toString().red)
        if (error) {
          console.log(error);
        } else {

          let $ = res.$;

          fs.writeFileSync('./koolearn.com/html/' +  encodeURIComponent(cihui.name) + '.html', res.body || '')

          count++

          console.log("success source!", cihui.name.red, count.toString().yellow);

        }
        done();
      }
    }]);
  })
} else {
  console.log('not found');
}
