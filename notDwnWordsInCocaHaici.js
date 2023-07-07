let b = require('./单词分类/haici-frequent-1000.json')
let c = require('./单词分类/haici-frequent-3000.json')
let d = require('./单词分类/haici-frequent-6000.json')
let e = require('./单词分类/haici-frequent-10000.json')
let f = require('./单词分类/haici-frequent-20000.json')
let a = require('./单词分类/coca前2w频率词汇.json')

let exist = require('./allwords')

let notwords = a.concat(b, c,d, e,f)

notwords = [...new Set(notwords)]

exist = exist.map(w => w.toLowerCase())

notwords = notwords.filter(w => !exist.includes(w.toLowerCase()))
console.log(notwords.length)

module.exports = notwords