/**
 * 该文件用于nodejs爬虫无法爬取的网站，可用postman进行爬取
 */

/**
    第一步：postman：创建collection，创建需要爬取的api：比如：http://www.example.com/{{query}}，query表示变量

    第二步：给该请求添加测试Tests：
    pm.sendRequest({
        // 发送给本地服务接收爬取的数据
        url: 'http://localhost:5643/write',
        method: 'POST',
        
        header: {
            'Content-Type': 'application/json',
            'X-Foo': 'bar'
        },
        body: {
            mode: 'raw',
            // raw: { data: pm.response.text(),fileName: pm.request }
            raw: JSON.stringify({data: pm.response.text(), fileName: pm.request})
        }
    }, (err, res) => {
        if (err) {
            console.log('错误')
        }
        // console.log(res.json(), res.text());
    });

    第三步：点击该collection，点击右上角的Run按钮

    第四步：将变量query做成csv文件，第一行是变量名query，下面的行都是变量值，导入该文件，设置延迟时间delay，postman会依次请求

    第五步：开启本地服务，使用expressjs，端口号需和上面保持一致（5643），下面是用例

 */
    let fs = require('fs')
let jsontocsc = require('json-2-csv')

let json2csvCallback = function (err, csv) {
    console.log('测试', csv.length)
    if (err) throw err;
    console.log('测试')

    // 对于需要爬取postman爬取数据的网站，转成csv
    fs.writeFile('./voc.csv', csv, 'utf8', function(err) {
    if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
        console.log('It\'s saved!');
    }
    });
};

var cihui = require('./单词分类/gre词汇(除初考外).json')
var cihui2 = require('./单词分类/初中高中四级词汇.json')
var cihui3 = require('./单词分类/考研六级托福SAT词汇.json')
var exists = require('./单词分类/已下载但未过滤的词汇汇总.json')


let all_word_in_file = cihui.concat(cihui2, cihui3, exists)

all_word_in_file = [...new Set(all_word_in_file)]


// exists = exists.map(w => w.toLowerCase())

let rawDataDir = './' + 'vocabulary.com' + '/html'; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理
let rawDataq = []
if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir,  {recursive: true})
}

if (fs.existsSync(rawDataDir)) { // fs.existsSync(path)以同步的方法检测目录是否存在，返回boolean
  let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i];

    fileName = decodeURIComponent(fileName)

    rawDataq.push(fileName.split('.html')[0])
  }

  rawDataq = rawDataq.map(w => w.toLowerCase())

  all_word_in_file = all_word_in_file.filter(w => !rawDataq.includes(w.toLowerCase()))
}

// all_word_in_file = all_word_in_file.filter(w => !exists.includes(w.toLowerCase()))

all_word_in_file = all_word_in_file.map(word => {
    return {
      query: word
    }
  })

console.log(all_word_in_file.length, 'end')

jsontocsc.json2csv(all_word_in_file, json2csvCallback, {
    // prependHeader: false      // removes the generated header of "value1,value2,value3,value4" (in case you don't want it)
  }).then(res => {
    json2csvCallback('', res)
  })


require('colors')
var express = require('express'),
    app = express(),
    shell = require('shelljs'),

    // Modify the folder path in which responses need to be stored
    folderPath = './Responses/',
    defaultFileExtension = 'json', // Change the default file extension
    bodyParser = require('body-parser'),
    DEFAULT_MODE = 'writeFile',
    path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

// Change the limits according to your response size
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

let count = 0

app.post('/write', (req, res) => {
    const { data,fileName } = req.body
    // console.log(req)
    console.log(fileName.url)
    const fileNamePath = fileName.url.path[1]
    count++
    console.log(fileNamePath, count.toString().red)

    fs.writeFileSync('./vocabulary.com/html/'+fileNamePath+'.html', data, 'utf8');
    res.send('Success');
});

app.listen(5643, () => {
    console.log('ResponsesToFile App is listening now! Send them requests my way!');
    console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});
