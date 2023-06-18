var fs = require("fs");
const colors = require('colors')
const cidianOrigin = require('./词典')
let notFoundCihui = require('./没有查到的词汇总.json')

let notFoundCihuiF = []

Object.keys(notFoundCihui).forEach(arr => {
  notFoundCihuiF.push(...JSON.parse(JSON.stringify(notFoundCihui[arr])))
})

const e = {
  "uuid": "351f3ea5-c780-11ed-80e7-005056863753",
  "word": "get up",
  "exp": "起床，站起来，打扮，装扮,"
}

cidianOrigin.data = cidianOrigin.data.map((cihuiW, index) => {
  cihui = cihuiW.word
  if (index > 0) {
    return false
  }
  if (notFoundCihuiF.includes(cihui)) {
    console.log('\n')
    console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
    console.log('该单词位于未查到的词的文件中', cihui)
    return true
  }

  let cihuiFilePath = './z_cihui_data/' + cihui + '.json'

  if (!fs.existsSync(cihuiFilePath)) {
    console.log('\n')
    console.log('------------------请求开始---------------------', cihui.red, index.toString().green)
    console.log('本地文件不存在', cihui)
    return true
  }

  let cihuiData = require(cihuiFilePath)

  cihuiData.forEach(ci => {
    console.log(ci)
    const ciarr = []
    const ciobj = {
      
    }
  })
})