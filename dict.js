const Crawler = require('crawler');
var fs = require("fs");


// 词源
var cihui = require('./cihui')

// 词性：part of speech
// var POS = 
// 名词(none)、 动词(verb)、 形容词(adjective)、 副词(adverb)、 冠词(article)、 代词(pronoun)、 数词(numeral)、介词(preposition)、 连词(conjunction)、 感叹词(interjection)

require('colors')

let notFoundCihui = require('./没有查到的词汇总.json')

let notFoundCihuiF = []

let redirectCihui = []

Object.keys(notFoundCihui).forEach(arr => {
  if (arr === 'redirect') {
    redirectCihui = notFoundCihui[arr]
    return false
  }
  notFoundCihuiF.push(...JSON.parse(JSON.stringify(notFoundCihui[arr])))
})

const startTime = Date.now()

const c = new Crawler({
  rateLimit: 200,
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


const rawDataq = []

let count = 0

const test = {
  not: 0,
  local: 0,
  req: 0
}

let rawDataDir = './z_origin_data_html'; // 源文件所在文件夹
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
      console.log(JSON.stringify(test).bgBlue)
      return true
    }

    let url = encodeURI('https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/' + cihui)

    let reci = redirectCihui.find(ci => ci.cihui === cihui)

    if (rawDataq.find(ci => ci === cihui)) {
      url = encodeURI('http://localhost:3000/dictionary.cambridge.org/' + cihui + '.html')

      console.log('\n')
      console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
      test.local++
      console.log(JSON.stringify(test).bgBlue)
      console.log('该单词以完成本地存储，将自动跳过', cihui)

      return true

    } else if (reci) {
      url === encodeURI('http://localhost:3000/dictionary.cambridge.org/' + reci.redirect + '.html')

      console.log('\n')
      console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
      test.local++
      console.log(JSON.stringify(test).bgBlue)
      console.log('重定向词汇', cihui)


    }
    c.queue([{
      uri: url,
      jQuery: true,
      callback: (error, res, done) => {
        test.req++
        console.log(JSON.stringify(test).bgBlue)
        console.log('\n')
        console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
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

          let dictBody = $('div.di-body .entry-body')


          if (!dictBody[0]) {

            let status = '当前词汇未查到'

            let appendStatus = {
              cihui,
              status
            }

            fs.appendFile('./没有查到的词' + '.txt', JSON.stringify(appendStatus) + ',\n', function (err) {
              if (err) throw err;
              console.log('当前词汇未查到', cihui);
            });
          } else {

            const list = []

            // 针对单词
            let cidiantiaomuList = dictBody.find(".pr.entry-body__el")

            if (cidiantiaomuList.length === 0) {
              // 针对短语
              cidiantiaomuList = dictBody.find(".entry-body__el")
            }

            cidiantiaomuList.each(function (index, element) {
              const posHeader = $(this).find('.pos-header')
              // 标题
              const dict_title = posHeader.find('.di-title').text()
              // 类型
              const type = posHeader.find('.posgram')
              // 类型说明
              const typeTitle = type.find('.pos')
              // 发音
              const fayin = posHeader.find('.dpron-i')
              const fayinObj = {}
              fayin.each(function (index) {
                const ukus = $(this).find('.region')

                const source = $(this).find('audio source')

                const xiefa = $(this).find('.pron.dpron')

                const sourceDesc = []
                source.each(function (index, element) {
                  sourceDesc.push($(this).attr())
                })
                let ukusFlag = 'not-uk-us'
                if (ukus.text().includes('uk')) {
                  ukusFlag = 'uk'
                }
                if (ukus.text().includes('us')) {
                  ukusFlag = 'us'
                }
                fayinObj[ukusFlag] = {
                  // 音标源
                  source: sourceDesc,
                  // 音标
                  phonetic: xiefa.text(),
                  // 英 or 美
                  class: ukusFlag
                }
              })

              // -----------------pos body--------------------
              const posBody = $(this).find('.pos-body .pr.dsense')
              const dsense = []
              posBody.each(function () {
                const typeF = $(this).find('.hw.dsense_hw').text()
                const pos = $(this).find('.pos.dsense_pos').text()
                const posTip = $(this).find('.pos.dsense_pos').attr('title')
                const guideword = $(this).find('.guideword.dsense_gw').text()

                // dsense body
                let dsense_body_def_block_k = []
                const dsense_body_def_block = $(this).find('.sense-body.dsense_b>.def-block.ddef_block')
                dsense_body_def_block.each(function () {
                  const ddef_h = $(this).find('.ddef_h')
                  const epp_xref = ddef_h.find('.epp-xref')
                  const gram = ddef_h.find('.gram')
                  const def = ddef_h.find('.def.ddef_d.db')

                  const ddef_b = $(this).find('.def-body.ddef_b')
                  const ddef_b_trans = ddef_b.children(".trans")

                  const ddef_b_example = ddef_b.find('.examp')
                  const example = []
                  ddef_b_example.each(function () {
                    const eg = $(this).find('.eg')
                    const egtrans = $(this).find('.trans')
                    example.push({
                      eg: eg.text(),
                      egtrans: egtrans.text()
                    })
                  })

                  dsense_body_def_block_k.push({
                    // 英语等级，相当于难易程度，https://www.abaenglish.com/zh/levels/
                    level: epp_xref.text(),
                    // 二级词性分类，比如名词，有可数和不可数,https://dictionary.cambridge.org/zhs/help/codes.html
                    pos_2: gram.text(),
                    trans_en: def.text(),
                    trans_cn: ddef_b_trans.text(),
                    example
                  })
                })

                // pr phrase-block dphrase-block 
                const phrase = []
                const dsense_phrase_block = $(this).find('.pr.phrase-block.dphrase-block')
                dsense_phrase_block.each(function () {
                  let phrase_head = $(this).find('.phrase-head.dphrase_h')
                  let phrase_title = phrase_head.find('.phrase-title.dphrase-title')

                  let phrase_body = $(this).find('.phrase-body.dphrase_b')
                  // dsense body
                  let dsense_body_def_block_kk = []
                  const dsense_body_def_block = phrase_body.find('.def-block.ddef_block')
                  dsense_body_def_block.each(function () {
                    const ddef_h = $(this).find('.ddef_h')
                    const epp_xref = ddef_h.find('.epp-xref')
                    const gram = ddef_h.find('.gram')
                    const def = ddef_h.find('.def.ddef_d.db')

                    const ddef_b = $(this).find('.def-body.ddef_b')
                    const ddef_b_trans = ddef_b.children(".trans")

                    const ddef_b_example = ddef_b.find('.examp')
                    const example = []
                    ddef_b_example.each(function () {
                      const eg = $(this).find('.eg')
                      const egtrans = $(this).find('.trans')
                      example.push({
                        eg: eg.text(),
                        egtrans: egtrans.text()
                      })
                    })

                    dsense_body_def_block_kk.push({
                      def_info: {
                        epp_xref: epp_xref.text(),
                        gram: gram.text()
                      },
                      def: def.text(),
                      ddef_b_trans: ddef_b_trans.text(),
                      example
                    })
                  })

                  phrase.push({
                    phrase_title: phrase_title.text(),
                    dsense_body_def_block_kk
                  })

                })

                const dense = {
                  name: typeF,
                  // 词性
                  pos,
                  // 解释词性pos的作用
                  posTip,
                  // 帮助理解该单词意思
                  guideword,
                  // 翻译和例句
                  trans_examp: dsense_body_def_block_k,
                  // 短语
                  phrase
                }

                dsense.push(dense)

              })

              const data = {
                name: dict_title,
                pos: type.text(),
                posTip: typeTitle.attr('title'),
                pronunciation: fayinObj,
                dsense
              }

              let status = dict_title ? dict_title : '单词标题为空'

              let appendStatus = {
                cihui,
                status
              }

              if (status === '单词标题为空') {
                fs.appendFile('./没有查到的词' + '.txt', JSON.stringify(appendStatus) + ',\n', function (err) {
                  if (err) throw err;
                  console.log('当前词汇未查到', cihui);
                });
              }
              

              list.push(data)
            })

            // console.log(list[0].title)
            
            if (list[0].title !== cihui && list[0].title) {

              var fileNameEnd = list[0].title


              let status = '重定向单词，原单词未查到'

              let appendStatus = {
                cihui,
                status,
                redirect: fileNameEnd
              }

              fs.appendFile('./没有查到的词' + '.txt', JSON.stringify(appendStatus) + ',\n', function (err) {
                if (err) throw err;
                console.log('当前词汇未查到', cihui);
              });

              fs.writeFileSync('./dictionary.cambridge.org/json/' + (fileNameEnd || 'default_test_cihui') + '.json', JSON.stringify(list), function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("数据写入成功！-----词汇数据，非源单词，跳转单词");
              });
              !url.includes('localhost') && fs.writeFileSync('./dictionary.cambridge.org/html/' + (fileNameEnd || 'default_test_cihui') + '.html', res.body, function (err) {
                if (err) {
                  return console.error(err);
                }
                console.log("数据写入成功！-----html源码，非源单词，跳转单词", new Date());
              });
            }

            fs.writeFileSync('./dictionary.cambridge.org/json/' + (cihui || 'default_test_cihui') + '.json', JSON.stringify(list), function (err) {
              if (err) {
                return console.error(err);
              }

              const time = ((Date.now() - startTime) / 1000 > 60) ? (Math.floor(((Date.now() - startTime) / 1000) / 60) + 'm' +  ((Date.now() - startTime) / 1000) % 60 + 's') : ((Date.now() - startTime) / 1000)

              const endTime = '已运行' + time + 's'
              console.log("数据写入成功！-----词汇数据-----", endTime.red, (count++).toString().green);
            });


            !url.includes('localhost') && fs.writeFileSync('./dictionary.cambridge.org/html/' + (cihui || 'default_test_cihui') + '.html', res.body, function (err) {
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
