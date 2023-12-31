const Crawler = require('crawler');
var fs = require("fs");

// 词源：需要进行查询的单词文件，格式是字符串数组
var cihui = require('./notDwn2.json')

// var exist = require('./allwords')

// var urlq = require('./提取url.json')

// urlq = urlq.map(u => u.name.toLowerCase())

// cihui = cihui.filter(w => !exist.includes(w.toLowerCase()))

// cihui = cihui.filter(w => !urlq.includes(w.toLowerCase()))

require('colors')

const startTime = Date.now()

function delSpace (str) {
  return str.replace(/^\s+|\s+$/g,"")
}

const c = new Crawler({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    "cookie": "__jsluid_s=3b151ea47832df6d672c5d6ef1e85adb; KUID=f9ufqg1687744936417; _ga=GA1.2.978356362.1687744937; _csrf=04c32d14dac3f3c8c825ba759393d5059fd907f7f3d93d6c893d38c2649141caa%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22-drvyEI6ZCMP3D1HKe0ETNdF558zPWbl%22%3B%7D; php-webapp-dict=63df0281ff3858097dbd2665fdaecb90; log.session=01f75d7cc125d5102eb6739392f9c4c1; koo.line=un; prelogid=8ba8bdf7f5b92845c03e1cc059d492a3; _gid=GA1.2.1197940991.1688700210; _gat=1; _ga_8RBHSP5JM6=GS1.2.1688700211.6.0.1688700211.60.0.0; Hm_lvt_5023f5fc98cfb5712c364bb50b12e50e=1687744936,1688021791,1688608384,1688700213; Hm_lpvt_5023f5fc98cfb5712c364bb50b12e50e=1688700213; wwwad=true",
  },
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


const rawDataq = []

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
if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];

    rawDataq.push(fileName.split('.')[0])
  }

  let lengthd = cihui.length

  cihui.forEach((cihui, index) => {

    let url = encodeURI('https://www.koolearn.com/dict/search/index?keywords=' + cihui)

    c.queue([{
      // proxy: 'http://127.0.0.1:7890',
      uri: url,
      // uri: 'http://localhost:3000/koolearn.com/html/get up.html',
      // uri: encodeURI('https://www.koolearn.com/enzh/' + 'against'),
      jQuery: true,
      callback: (error, res, done) => {
        test.req++
        // console.log(res.request.uri.href, '当前请求的url')
        if (error) {
          console.log(error);
        } else {
          const dictkk = ({
            name: cihui,
            url: res.request.uri.href
          })

          fs.appendFileSync('./新东方测试url.json', JSON.stringify(dictkk) + ',')
          count++
          console.log(`start ${cihui} ratio: ${count}/${lengthd}`.red);

        }
        done();
      }
    }]);
  })
} else {
  console.log('not found');
}
