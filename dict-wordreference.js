const Crawler = require('crawler');
var fs = require("fs");


// 词源
var cihui = require('./cihui')

// 词性：part of speech
// var POS = 
// 名词(none)、 动词(verb)、 形容词(adjective)、 副词(adverb)、 冠词(article)、 代词(pronoun)、 数词(numeral)、介词(preposition)、 连词(conjunction)、 感叹词(interjection)

require('colors')

let notFoundCihui = require('./没有查到的词汇总wordreference.json')

let notFoundCihuiF = []

let redirectCihui = []

Object.keys(notFoundCihui).forEach(arr => {
  if (arr === 'redirect') {
    redirectCihui = notFoundCihui[arr]
    return false
  }
  notFoundCihuiF.push(...[] || JSON.parse(JSON.stringify(notFoundCihui[arr])))
})

const startTime = Date.now()

function delSpace (str) {
  return str.replace(/^\s+|\s+$/g,"")
}

const c = new Crawler({
  rateLimit: 10,
  headers: {
    'Cookie': '_gid=GA1.2.1269905276.1687082416; xf_csrf=RMZOxR--W8CiQdKd; xf_language_id=10; xf_language_set=1; llang=enzhi; _ga=GA1.1.33121290.1686406213; _ga_WV46ZWEMKW=GS1.1.1687088903.3.1.1687090020.59.0.0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    // ':Authority': 'www.wordreference.com'
  },
  rateLimit: 300,
  maxConnections: 20,
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

let rawDataDir = './wordreference.com/html'; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理
if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];

    rawDataq.push(fileName.split('.')[0])
  }

  cihui.cihui.forEach((cihui, index) => {

    if (notFoundCihuiF.includes(cihui)) {
      console.log('\n')
      console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
      console.log('该单词位于未查到的词的文件中', cihui)
      test.not++
      // console.log(JSON.stringify(test).bgBlue)
      // return true
    }

    let url = encodeURI('https://www.wordreference.com/enzh/' + cihui)


    if (rawDataq.find(ci => ci === cihui)) {
      url = encodeURI('http://localhost:3000/wordreference.com/html/' + cihui + '.html')

      console.log('\n')
      console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
      test.local++
      // console.log(JSON.stringify(test).bgBlue)
      console.log('该单词以完成本地存储，将自动跳过', cihui)

      // return true

    }
    c.queue([{
      uri: url,
      // uri: 'http://localhost:3000/wordreference.com/html/get up.html',
      // uri: encodeURI('https://www.wordreference.com/enzh/' + 'against'),
      jQuery: true,
      callback: (error, res, done) => {
        test.req++
        console.log(JSON.stringify(test).bgBlue)
        console.log('\n')
        console.log('------------------请求开始---------------------'.bgGreen, cihui.red, index.toString().green)
        console.log(res.request.uri.href, '当前请求的url')
        if (error) {
          console.log(error);
        } else {
          let $ = res.$;

          console.log('源码大小', res.body.length, 'bytes');

          const $type = typeof $

          if ($type !== 'function') {

            $ = function () {
              return []
            }

          }

          let dictBody = $('#articleWRD')

          let dictHead = $('#articleHead')

          // 公共词汇

          let cihuiCommon = {

          }

          if (dictHead) {
            let dictheadname = dictHead.find('.headerWord')

            cihuiCommon.name = dictheadname.text()

            let fayin = dictHead.find('#listen_widget script')

            let fayinstr = []

            try {
              fayinstr = eval(fayin.text() + ';audioFiles;')
            } catch {
              fayinstr = []
            }

            // 发音相关
            let pronunciation = {}


            let fayinuk = fayinstr.find(s => s.includes('uk')) || ''
            let fayinus = fayinstr.find(s => s.includes('us')) || ''

            if (fayinuk) {
              pronunciation.uk = {
                source: [
                  {
                    type: 'audio/mpeg',
                    src: fayinuk
                  }
                ],
                class: 'uk'
              }
            }

            if (fayinus) {
              pronunciation.us = {
                source: [
                  {
                    type: 'audio/mpeg',
                    src: fayinus
                  }
                ],
                class: 'us'
              }
            }

            let phonetic = dictHead.find('#pronunciation_widget')

            let phoneticuk = phonetic.find('.pronWR.tooltip.pronWidget')
            let phoneticuks = phonetic.find('.pronRH.tooltip.pronWidget')

            let phoneticukword = []
            let phoneticukwordus = []

            phoneticuk.each(function () {

              let ukinthis = $(this).text()
              let ukinthisinn = $(this).find('span').text()

              let kk = ukinthis.split(ukinthisinn)[1]

              phoneticukword.push(kk)

            })

            phoneticuks.each(function () {

              let ukinthis = $(this).text()
              let ukinthisinn = $(this).find('span').text()

              let kk = ukinthis.split(ukinthisinn)[1]

              phoneticukwordus.push(kk)

            })

            pronunciation.uk && (pronunciation.uk.phonetic = phoneticukword.join(', '))
            pronunciation.us && (pronunciation.us.phonetic = phoneticukwordus.join(', '))

            cihuiCommon.pronunciation = pronunciation

            // 至此，dsense之前的内容完成

          }


          if (!dictBody) {

            let status = '当前词汇未查到'

            let appendStatus = {
              cihui,
              status
            }
            fs.appendFile('./没有查到的词wrodreference' + '.txt', JSON.stringify(appendStatus) + ',\n', function (err) {
              if (err) throw err;
              console.log('当前词汇未查到', cihui);
            });
          } else {

            // 具体查询

            let fenleicihui = dictBody.find('.WRD')

            let bigdata = []

            fenleicihui.each(function (index) {
              let id = $(this).attr('id') || ''

              // 解释，词组，短语等
              let pinjietrl = []


              let listcihuia = []

              let lastOddeven = ''

              // 单词获取

              let getsingalcihui = {}

              let jflawe = $(this).children()

              jflawe.each(function (index) {

                  let trl = $(this)

                  let idenzh = trl.attr('class')

                  if (!lastOddeven && ['odd', 'even'].includes(idenzh)) {
                    lastOddeven = idenzh
                  }

                  if (lastOddeven !== idenzh) {
                    getsingalcihui.trans_examp = getsingalcihui.trans_examp || {}
                    getsingalcihui.trans_examp.example = getsingalcihui.trans_examp.example || [{}]
                    getsingalcihui.trans_examp.trans_cn = pinjietrl.filter(l => delSpace(l)).join(', ')
                    getsingalcihui.trans_examp = [getsingalcihui.trans_examp]
                    listcihuia.push(getsingalcihui)
                    getsingalcihui = {}
                    pinjietrl = []
                    lastOddeven = idenzh
                    let FrWrd = $(this).find('.FrWrd')

                    let FrWrdname = FrWrd.find('strong')
                    let FrWrdprep = FrWrd.find('.POS2')


                    // 获取没有class的元素--------------------
                    let guidjlaf = $(this).find('td:not([class])')

                    let FrWrdfanyi = $(this).find(".zhgroup:nth-child(1)")


                    let FrWrdfanyi1 = FrWrdfanyi.find('>span')

                    let FrWrdfanyitext = FrWrdfanyi.text()

                    FrWrdfanyi1.each(function () {

                      let thisText = $(this).text()

                      FrWrdfanyitext = FrWrdfanyitext.replace(thisText, '')
                    })

                    FrWrdfanyitext = delSpace(FrWrdfanyitext)

                    pinjietrl.push(FrWrdfanyitext)

                    getsingalcihui.name = FrWrdname.text()
                    getsingalcihui.pos = FrWrdprep.text()
                    getsingalcihui.guideword = guidjlaf.text()

                  } else if (lastOddeven === idenzh) {
                    let FrWrdfanyi = $(this).find(".zhgroup:nth-child(1)")


                    // 获取子元素节点---------------------
                    let FrWrdfanyi1 = FrWrdfanyi.find('>span')

                    let FrWrdfanyitext = FrWrdfanyi.text()
                    
                    FrWrdfanyi1.each(function () {

                      let thisText = $(this).text()
                      FrWrdfanyitext = FrWrdfanyitext.replace(thisText, '')
                    })

                    FrWrdfanyitext = delSpace(FrWrdfanyitext)

                    pinjietrl.push(FrWrdfanyitext)

                    let fanyitore = $(this).find('.FrEx')
                    let fanyitoex = $(this).find('.ToEx')

                    getsingalcihui.trans_examp = getsingalcihui.trans_examp || {}
                    getsingalcihui.trans_examp.example = getsingalcihui.trans_examp.example || [{}]

                    let lenexample = getsingalcihui.trans_examp.example.length

                    let lastexample = getsingalcihui.trans_examp.example[lenexample - 1] || {}

                    !lastexample.eg && (lastexample.eg = fanyitore.text() || '')
                    !lastexample.egtrans && (lastexample.egtrans = fanyitoex.text() || '')

                    getsingalcihui.trans_examp.example[lenexample - 1] = lastexample

                    let nextthis = $(this).next()

                    // 最后一个元素，没有兄弟节点，则存值
                    if (!nextthis || !nextthis[0] || !nextthis[0].name) {
                      getsingalcihui.trans_examp.trans_cn = pinjietrl.filter(l => l).filter(l => delSpace(l)).join(', ')
                      getsingalcihui.trans_examp = [getsingalcihui.trans_examp]
                      listcihuia.push(getsingalcihui)
                    }
                  }
              })


              bigdata.push({
                ...cihuiCommon,
                dsense: listcihuia.filter(l => l.name)
              })

            })

            // 测试用 写入文件操作
            // fs.writeFileSync('./测试wored.test.json' + (cihui || 'default_test_cihui') + '.json', JSON.stringify(bigdata), function (err) {
            //   if (err) {
            //     return console.error(err);
            //   }
            //   console.log("数据写入成功！-----html源码", new Date());
            // });

            if (!bigdata.length) {

              let status = '当前词汇未查到'

              let appendStatus = {
                cihui,
                status
              }

              fs.appendFile('./没有查到的词wrodreference' + '.txt', JSON.stringify(appendStatus) + ',\n', function (err) {
                if (err) throw err;
                console.log('当前词汇未查到', cihui);
              });
              
            }

            fs.writeFile('./wordreference.com/json/' + (cihui || 'default_test_cihui') + '.json', JSON.stringify(bigdata), function (err) {
              if (err) {
                return console.error(err);
              }

              let endTimeS = Date.now()

              const timeM = Math.floor(((endTimeS - startTime) / 1000) / 60) ? Math.floor(((endTimeS - startTime) / 1000) / 60) + ' 分 ' : ''
              const timeS = Math.floor((endTimeS - startTime) / 1000 % 60) ? Math.floor((endTimeS - startTime) / 1000 % 60) + ' 秒 ' : ''
              const timeMS = ((endTimeS - startTime) % 1000) + ' 毫秒'

              const endTime = '已运行' + timeM + timeS + timeMS
              console.log("数据写入成功！-----词汇数据-----", endTime.red, (count++).toString().green);
            });


            !url.includes('localhost') && fs.writeFile('./wordreference.com/html/' + (cihui || 'default_test_cihui') + '.html', res.body, function (err) {
              if (err) {
                return console.error(err);
              }
              console.log("数据写入成功！-----html源码", new Date());
            });
          }
        }
        done();
      }
    }]);
  })
} else {
  console.log('not found');
}
