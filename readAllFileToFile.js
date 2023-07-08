let cheerio = require("cheerio");
let fs = require("fs");
require("colors");

/**
 *
 * [xxx]：代表xxx可选
 *
 * 选择文档元素：$(selector, [context], [root])，在root范围内搜索context，其中selector和context是字符串、dom元素、dom数组、cheerio对象，root是html字符串
 *
 * 以下均是调用上述方法后的属性/方法：
 *
 * 获取元素属性：.attr/prop(属性名)，匹配选择的集合中第一个元素的属性值
 *
 * 获取数据属性data-xxx：.data(不传：得到对象、传入特定的xxx：得到结果值)
 *
 * 获取表单元素的值：.val()，无参
 *
 * 元素是否有某个class：.hasClass(类名字符串)
 *
 * 判断是否含有某个元素：.is(selector、element、selection、function(index))，返回bool
 *
 * 查找内部元素：.find(selector, selection, node)，返回元素集合
 *
 * 获取下一个兄弟节点：.next([selector])，.nextAll([selector])
 * 获取上一个元素节点：.prev(), prevAll()
 * 获取所有兄弟节点：.siblings([selector])
 *
 * 选择第一个元素：.first()、last()、eq(index)、get([index])
 *
 * 获取子元素：.children([selector])
 * 获取子元素，包括文本和注释：.contents()
 *
 * 返回拥有某子元素的父级元素：has(selector, element)
 *
 * 过滤元素：.filter(selector、selection、element、function(index))
 * 过滤元素：.not(同上)
 *
 * 迭代元素：.each(function(index, element) {})，注意这里不能是箭头函数，打破迭代返回false即可（后面内容就不会迭代了）
 *
 * 返回新的迭代元素：.map(function (index, element) { return xxx })
 *
 * 结束当前链的最新过滤操作：.end()
 *
 * 获取第一个选中元素的html字符串：.html()
 * 获取文本：.text()
 *
 * 将dom设置为数组：.toArray()
 *
 * 检查B元素是否是A元素的后代：.contains(A, B)
 *
 * .nextUntil([selector], [filter])：获取本身到指定节点之间的节点（不包括头尾）
 *
 * 加载html：.load(html)
 */

let prefixUrl = "xdf";
let requestUrl = "";
let dwn = "";

switch (prefixUrl) {
  case "lw":
    requestUrl = "https://www.ldoceonline.com/dictionary/";
    dwn = "ldoceonline.com";
    break;
  case "hj":
    requestUrl = "https://dict.hjenglish.com/w/";
    dwn = "hjenglish.com";
    break;
  case "by":
    requestUrl = "https://www.bing.com/dict/search?q=";
    dwn = "bing.com";
    break;
  case "yd":
    requestUrl = "https://youdao.com/w/";
    dwn = "youdao.com";
    break;
  case "hc":
    requestUrl = "http://dict.cn/";
    dwn = "dict.cn";
    break;
  case "wr":
    requestUrl = "https://www.wordreference.com/enzh/";
    dwn = "wordreference.com";
    break;
  case "jq":
    requestUrl = "https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/";
    dwn = "dictionary.cambridge.org";
    break;
  case "xdf":
    requestUrl = "https://www.koolearn.com/dict/search/index?keywords=";
    dwn = "koolearn.com";
    break;
  case "cls":
    requestUrl =
      "https://www.collinsdictionary.com/zh/dictionary/english-chinese/";
    dwn = "collinsdictionary.com";
    break;
}

// dwn = 'test-test'

/**
 * 
 * --------------------------源json数据文件所在文件夹------------------
 * 
 */
let rawDataDir = "./dict-html/" + dwn + "/data/"; // 源文件所在文件夹
// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataDir)) {
  fs.mkdirSync(rawDataDir, { recursive: true });
}
let jsonData = {}


let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
console.log(files.length)
for (let i = 0; i < files.length; i++) {
  let fileName = files[i];

  fileName = decodeURIComponent(fileName);
  flleStr = decodeURIComponent(fileName).split(".json")[0];
  
  cacheData(
    (rawDataDir + encodeURIComponent(fileName))
  );
}

fs.writeFileSync((`./提取${dwn}总数据.json`), JSON.stringify(jsonData), (err) => {
  console.log(err, Date.now().toString().bgRed);
});


/**
 *
 * @param {string} path
 * @param {string} savePath
 */
function cacheData(path, savePath) {
  let data = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  data = JSON.parse(data)
  

  jsonData[data.n] = data
}

function delSpace(str) {
  if (!str) {
    return "";
  }
  return str.replace(/^\s+|\s+$/g, "");
}
