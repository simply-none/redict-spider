let a1 = require('./单词分类/gre词汇(除初考外).json')
let a2 = require('./单词分类/google10000频率词汇.json')
let a3 = require('./单词分类/初中高中四级词汇.json')
let a4 = require('./单词分类/已下载但未过滤的词汇汇总.json')
let a5 = require('./单词分类/牛津5000.json')
let a6 = require('./单词分类/考研六级托福SAT词汇.json')
let a7 = require('./单词分类/自己记录的单词(欧陆).json')
let a8 = require('./单词分类/vuejs-doc-words.json')

let exists = a1.concat(a2, a3, a4, a5, a6, a7, a8)

exists = [...new Set(exists)]

module.exports = exists