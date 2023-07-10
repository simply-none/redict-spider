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
 * ----------------------------- 读取的html源文件目录------------------------------
 * 
 */
let rawDataDir = "../dict-html/" + dwn + "/html/"; // 源文件所在文件夹
/**
 * 
 * -------------------------------存储的数据目录
 * 
 */
let rawDataJsonDir = './dict-html/' + dwn + '/data/'



// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataJsonDir)) {
  fs.mkdirSync(rawDataJsonDir, { recursive: true });
}

let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
console.log(files.length)
for (let i = 0; i < files.length; i++) {
  let fileName = files[i];

  fileName = decodeURIComponent(fileName);
  flleStr = decodeURIComponent(fileName).split(".html")[0];
  if (fs.existsSync(rawDataJsonDir + flleStr + ".json")) {
    continue
  }

  cacheData(
    (rawDataDir + encodeURIComponent(fileName)),
    (rawDataJsonDir + encodeURIComponent(flleStr) + ".json")
  );
}

/**
 *
 * @param {string} path
 * @param {string} savePath
 */
function cacheData(path, savePath) {
  let data = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  let vocabulary = {
    // 名称
    n: "",
    /**
     * P: {
     *   t: 'us',
     *   p: '音标',
     *   a: '发音'
     * }
     */
    p: [],
    /**
     * 简要释义
     */
    ps: [],
    /**
     * 详细释义
     */
    pd: [],
    // 变形
    t: [],
    // 词组短语
    ph: [],
    // 搭配
    col: [],
    // 同近义词
    sy: [],
    // 其他
    oth: [],
  };
  let $ = cheerio.load(data);

  let title = $(".content-wrap > div.left-content > div.word-title");

  if (title.length === 0) {
    console.log(path, "当前查找的单词无解释说明".bgRed);
    return false;
  }

  vocabulary.n = delSpace(title.text());

  // 获取内容体
  let contentBox = $("div.content-wrap > div.left-content > .content-box");

  contentBox.map(function (index, element) {
    let contentTitle = $(this).find(".details-title");

    if (contentTitle.length === 0) {
      return false;
    }

    // 获取音标
    let contentDetail = $(this).find(".details-content .word-spell-box");
    contentDetail.map(function (index, element) {
      let wordSpell = $(this).find(".word-spell");
      wordSpell = wordSpell.text().split(" ");

      // 类型：uk，us
      let wordSpellType = wordSpell[0];
      // 音标
      let wordSpellPhonetic = wordSpell.slice(1).join(" ");

      let wordSpellAudio = $(this).find(".word-spell-audio");
      // 读音
      wordSpellAudio = wordSpellAudio.data("url");

      vocabulary.p.push({
        t: wordSpellType,
        p: wordSpellPhonetic,
        a: wordSpellAudio,
      });
    });

    // 含义
    let vocabularyDesc = $(this).find(".details-title .title-text");
    if (vocabularyDesc !== 0) {
      // console.log(vocabularyDesc.text().bgRed)
    }
    if (vocabularyDesc.text() === "是什么意思") {
      // 解释
      let paraphrase = [];
      let descContentDetail = $(this).find(
        ".details-content .details-content-title-box"
      );

      // 简要含义
      let simpleDescContentDetail = descContentDetail.children().first();
      let simpleDescContentDetailItem = simpleDescContentDetail.children();
      simpleDescContentDetailItem.map(function (index, element) {
        let type = $(this).find(".prop").text();
        
        let desc = $(this)
          .find("p span")
          .map(function (index, element) {
            return $(this).text().replace(/；$/, "");
          })
          .get();
          if (!type) {
            desc = delSpace($(this).text() || '').split('；')
          }
        paraphrase.push({
          // 类型
          t: type,
          // 解释paraphrase
          p: desc,
        });
      });
      vocabulary.ps = paraphrase;

      // 变形、双语解释
      let otherDescContentDetail = descContentDetail.children(
        ".details-content-title"
      );

      otherDescContentDetail.map(function (index, element) {
        if ($(this).text().includes("变形")) {
          let nextElement = $(this).next();
          // 该单词的其他形态：过去式、过去分词等
          let transform = nextElement
            .find("p span")
            .map(function (index, element) {
              let item = $(this).text().split("：");
              return {
                // 中文描述
                t: item[0],
                // 单词
                v: item[1],
              };
            })
            .get();
          // console.log(transform)
          vocabulary.t = transform;
        }

        if ($(this).text().includes("双语释义")) {
          let nextElement = $(this).next();
          // 该单词的双语释义（详细）
          let transform = nextElement
            .children("span")
            .map(function (index, element) {
              // 类型
              let type = $(this).text();
              // 释义
              let paraphrase = $(this)
                .next("ol")
                .children("li")
                .map(function (index, element) {
                  let contents = $(this)
                    .contents()
                    .map(function (index, element) {
                      return delSpace($(this).text());
                    })
                    .get();
                    contents = contents.filter(v => v)
                  return {
                    en: contents[1],
                    zh: contents[0],
                  };
                })
                .get();
              return {
                t: delSpace(type),
                p: paraphrase
              };
            })
            .get();
          vocabulary.pd = transform;
        }
      });
    }
    if (vocabularyDesc.text() === "学习怎么用") {
      // 词汇、词组
      let descContentDetail = $(this).find(
        ".details-content .details-content-title-box"
      );

      // 变形、双语解释
      let otherDescContentDetail = descContentDetail.children(
        ".details-content-title"
      );

      otherDescContentDetail.map(function (index, element) {
        if ($(this).text().includes("词汇搭配")) {
          let nextElement = $(this).next();
          // 该单词的双语释义（详细）
          let transform = nextElement
            .children("div")
            .map(function (index, element) {
              // 类型
              let phrase = [];
              let type = $(this).text();
              let subtype = $(this)
                .nextUntil("div")
                .filter("b")
                .map(function (index, element) {
                  let ul = $(this).next("ul");

                  let phraseZh = $(this).text();
                  let phraseZhArr = ul
                    .children("li")
                    .map(function (index, element) {
                      return delSpace($(this).text());
                    })
                    .get();
                  return {
                    t: delSpace(type),
                    st: delSpace(phraseZh),
                    stl: phraseZhArr,
                  };
                })
                .get();
              if (subtype.length === 0) {
                subtype = $(this)
                .nextAll(".wordGroup")
                .map(function (index, element) {
                  let contents = $(this).text() || ''
                  return {
                    t: delSpace(type),
                    st: '',
                    stl: contents.split('JOU'),
                  };
                })
                .get();
              }
              return {
                t: delSpace(type),
                subtype,
              };
            })
            .get();

          vocabulary.col = transform;
        }

        if ($(this).text().includes("词组短语")) {
          let nextElement = $(this).next();
          // 该单词的双语释义（详细）
          let enzhDesc = [];
          let transform = nextElement
            .children("p")
            .map(function (index, element) {
              let contents = $(this)
                .contents()
                .map(function (index, element) {
                  return delSpace($(this).text());
                })
                .get();
                contents = contents.filter(v => v)
              return {
                en: contents[0],
                zh: contents[1],
              };
            })
            .get();
          vocabulary.ph = transform;
        }

        if ($(this).text().includes("同近义词辨析")) {
          let nextElement = $(this).next();
          let title = nextElement.find(".wt-container .title").text();
          let desc = nextElement.find(".collapse-content>p").text();
          let wordgroup = nextElement
            .find(".collapse-content .wordGroup p")
            .map(function () {
              let contents = $(this)
                .contents()
                .map(function (index, element) {
                  return delSpace($(this).text());
                })
                .get();
                contents = contents.filter(v => v)
              return {
                en: delSpace(contents[0]),
                zh: delSpace(contents[1]),
              };
            })
            .get();

          vocabulary.sy = {
            v: delSpace(title).split(", "),
            d: delSpace(desc),
            wordgroup,
          };
        }
      });
    }
  });

  // 获取右侧内容体
  let rightBox = $(".right-content .retrieve-title")
    .map(function () {
      let title = $(this).text();
      let vocabulary = $(this)
        .next()
        .find(".word")
        .map(function () {
          return {
            v: delSpace($(this).text()),
            u: "https://www.koolearn.com" + $(this).prop("href"),
          };
        })
        .get();
      return {
        title: delSpace(title),
        vocabulary,
      };
    })
    .get();
  rightBox = rightBox.filter((oth) =>
    ["同义词", "反义词", "同根词"].includes(oth.title)
  );
  vocabulary.oth = rightBox;

  // console.log(vocabulary, Date.now().toString().bgRed);

  fs.writeFileSync(savePath, JSON.stringify(vocabulary), (err) => {
    console.log(err, Date.now().toString().bgRed);
  });
}

function delSpace(str) {
  if (!str) {
    return "";
  }
  return str.replace(/^\s+|\s+$/g, "");
}
