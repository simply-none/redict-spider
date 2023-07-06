/**
 * 读取所有文件，生成内容
 */
let fs = require('fs')

// 获取到的文件路径集合
let allMdPath = require('./logs.json')

let content = ''

allMdPath.forEach((path, index) => {
  let data = fs.readFileSync('./' + path, { encoding: 'utf-8' })
  content = content + '' + data
  
  if (index === allMdPath.length - 1) {

    fs.writeFileSync('./resultorg.json', JSON.stringify(content))

    content = content.toLowerCase()

    content = content.replace(/```(\s|\S|\n)+?```/g, " ")
    content = content.replace(/\((\s|\S|\n)+?\)/g, " ")
    content = content.replace(/\<(\s|\S|\n)+?\>/g, " ")

  content  = content.split(' ')

  content = content.filter(word => {
    return (word.length > 2) && !/[0-9_\/\\\{\}\:\*\!\'\.\?\>\<\#\@\%\"\`\’\”\;\$\^\&\+\=\(\)\,]/.test(word)
  })

  content = content.filter(w => !w.includes('-'))
  content = content.filter(w => !/\W/.test(w))
  content = content.filter(w => !/s$/.test(w))

  content = [...new Set(content)]

  content.sort((a, b) => {
    if (a > b) {
      return 1
    }
    return -1
  })

  console.log(content.length)

  fs.writeFileSync(`./result${Date.now()}.json`, JSON.stringify(content))
  }
})
