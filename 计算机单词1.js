let rawDataDir = './json/'; // 源文件所在文件夹
var fs = require('fs')
let rawDataq = []
let json = {}
// 2. 读取源文件夹下的所有文件，批量处理
if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];

    rawDataq.push(fileName.split('.')[0])
  }

  rawDataq.forEach((name, i) => {
    const a = fs.readFileSync('./json/' + files[i], { encoding: 'utf8', })
    json[files[i].split('.json')[0]] = JSON.parse(a)

    if (i === files.length - 1) {
      fs.writeFileSync('./current.json', JSON.stringify(json))
    }
  })
}

  