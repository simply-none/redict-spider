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

require('colors')
const express = require('express'),
    app = express(),
    fs = require('fs'),
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
    // console.log(res, res)
    const fileNamePath = fileName.url.path[1]
    count++
    console.log(fileNamePath, count.toString().red)

    fs.writeFileSync('./dict.hjenglish.com/html/'+fileNamePath+'.html', data, 'utf8');
    res.send('Success');
});

app.listen(5643, () => {
    console.log('ResponsesToFile App is listening now! Send them requests my way!');
    console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});
