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

let prefixUrl = "by";
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
let rawDataDir = "./" + dwn + "/html/"; // 源文件所在文件夹
/**
 *
 * -------------------------------存储的数据目录
 *
 */
let rawDataJsonDir = "./dict-html/" + dwn + "/data/";

// 2. 读取源文件夹下的所有文件，批量处理

if (!fs.existsSync(rawDataJsonDir)) {
  fs.mkdirSync(rawDataJsonDir, { recursive: true });
}

let files = fs.readdirSync(rawDataDir); // fs.readdirSync(path) 方法将返回该路径下所有文件名的数组。
console.log(files.length);
for (let i = 0; i < files.length; i++) {
  let fileName = files[i];

  fileName = decodeURIComponent(fileName);
  flleStr = decodeURIComponent(fileName).split(".html")[0];
  if (fs.existsSync(rawDataJsonDir + flleStr + ".json")) {
    // continue
  }

  cacheData(
    rawDataDir + encodeURIComponent(fileName),
    rawDataJsonDir + encodeURIComponent(flleStr) + ".json"
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

  let title = $("#headword");

  if (title.length === 0) {
    console.log(path, "当前查找的单词无解释说明".bgRed);
    return false;
  }

  vocabulary.n = delSpace(title.text());

  // 获取内容体
  let contentBox = $(
    "body > div.contentPadding > div > div > div.lf_area > div.qdef"
  );

  contentBox.map(function (index, element) {
    // 获取音标
    let contentDetail = $(this).find("div.hd_area div.hd_tf_lh .hd_tf");
    contentDetail.map(function (index, element) {
      let wordSpell = $(this).prev(".b_primtxt").text();

      // 类型：uk，us
      let wordSpellType = wordSpell[0];
      // 音标
      let wordSpellPhonetic = delSpace(wordSpell.substring(1));

      let wordSpellAudio = $(this).find(".bigaud");
      wordSpellAudio = wordSpellAudio.attr("onclick");
      wordSpellAudio = wordSpellAudio.match("http(.*)?.mp3");
      if (wordSpellAudio) {
        wordSpellAudio = wordSpellAudio[0];
      } else {
        wordSpellAudio = "";
      }

      vocabulary.p.push({
        t: wordSpellType,
        p: wordSpellPhonetic,
        a: wordSpellAudio,
      });
    });

    if (1) {
      // 解释
      let paraphrase = [];
      let descContentDetail = $(this).find(".hd_area").next("ul");

      // 简要含义
      let simpleDescContentDetailItem = descContentDetail.children("li");
      simpleDescContentDetailItem.map(function (index, element) {
        let type = $(this).find(".pos").text() || "无";

        let desc = $(this).find(".def").text().split("；");

        paraphrase.push({
          // 类型
          t: type,
          // 解释paraphrase
          p: desc,
        });
      });
      vocabulary.ps = paraphrase;

      // 变形、双语解释
      let otherDescContentDetail = $(this).find(".hd_div1");

      otherDescContentDetail.map(function (index, element) {
        let nextElement = $(this).find(".b_primtxt");
        // 该单词的其他形态：过去式、过去分词等
        let transform = nextElement
          .map(function (index, element) {
            let item = $(this).text().split("：");
            let dic = $(this).next("a").text();
            let link = "https://cn.bing.com" + $(this).next("a").attr("href");
            return {
              // 中文描述
              t: item[0],
              // 单词
              v: dic,
              l: link,
            };
          })
          .get();
        vocabulary.t = transform;
      });

      let otherDescContentDetail2 = $(this).find("#defid");
      otherDescContentDetail2.map(function (index, element) {
        // 网络
        let quanwei00 = $(this).find("#webid");
        let nextElement00 = quanwei00.find(".def_row .df_hm_w1 .p1-1.b_regtxt");
        let transform00 = nextElement00
          .map(function () {
            return $(this).text();
          })
          .get();

        // 简要
        let quanwei0 = $(this).find("#crossid");
        let nextElement0 = quanwei0.find(".def_row.df_div1");
        let transform0 = nextElement0
          .map(function () {
            let cixing = $(this).find("td:nth-child(1) .pos.pos1");
            let ciyi = $(this)
              .find("td:nth-child(2) .de_li1.de_li3")
              .map(function () {
                let ci = $(this).find(".b_regtxt").text().split(/;|,/);
                return ci;
              })
              .get();
            ciyi = [...new Set(ciyi)];

            return {
              t: delSpace(cixing.text()),
              p: ciyi || [],
            };
          })
          .get();

        let newjianyaoshiyi = transform0.concat(vocabulary.ps);
        newjianyaoshiyi = newjianyaoshiyi.reduce(
          (prev, cur) => {
            if (prev[cur.t]) {
              prev[cur.t].push(...cur.p);
            } else {
              prev[cur.t] = cur.p || [];
            }
            return prev;
          },
          {
            网络: transform00,
          }
        );
        newjianyaoshiyi = Object.entries(newjianyaoshiyi).map((item) => {
          return {
            t: item[0],
            p: item[1],
          };
        });

        vocabulary.ps = newjianyaoshiyi;

        // 权威
        let quanwei = $(this).find("#authid");
        let nextElement = quanwei.find(".each_seg");
        // 该单词的双语释义（详细）
        let transform = nextElement
          .map(function (index, element) {
            // 类型
            let type = $(this)
              .find("div.li_pos > div.pos_lin > div.pos")
              .text();
            // 释义
            let paraphrase = $(this)
              .find("div.li_pos > div.de_seg > div.se_lis")
              .map(function (index, element) {
                let exm = $(this)
                  .next(".li_exs")
                  .find(".def_row")
                  .map(function (index, element) {
                    let en = $(this).find(".val_ex").text();
                    let zh = $(this).find(".bil_ex").text();
                    return {
                      en,
                      zh,
                    };
                  })
                  .get();

                let zh = $(this).find(
                  "table  tbody  tr  td div.def_pa .b_primtxt"
                );
                let en = $(this).find(
                  "table  tbody  tr  td div.def_pa .b_regtxt"
                );
                return {
                  en: delSpace(en.text()),
                  zh: delSpace(zh.text()),
                  exm: exm || [],
                };
              })
              .get();
            return {
              t: delSpace(type),
              p: paraphrase,
            };
          })
          .get();
        vocabulary.pd = transform;

        // 该单词的短语习语
        let transform2 = nextElement
          .map(function (index, element) {
            // 释义
            let paraphrase = $(this)
              .find("div.li_id  .idm_seg  div.idm_s")
              .map(function (index, element) {
                let en = $(this).find(".ids");
                let nextdesc = $(this).next(".li_ids_co");
                let zh = nextdesc.find("div.idmdef_li .b_primtxt");
                let zhen = nextdesc.find("div.idmdef_li .b_regtxt");

                let exm = nextdesc
                  .find("div.li_exs .def_row")
                  .map(function (index, element) {
                    let en = $(this).find(".val_ex").text();
                    let zh = $(this).find(".bil_ex").text();
                    return {
                      en,
                      zh,
                    };
                  })
                  .get();
                return {
                  en: delSpace(en.text()),
                  zh: delSpace(zh.text()),
                  zhen: delSpace(zhen.text()),
                  exm: exm || [],
                };
              })
              .get();
            return {
              p: paraphrase,
            };
          })
          .get();
        transform2 = transform2.map((item) => item.p).flat();
        vocabulary.ph = transform2;
      });
    }
    if (1) {
      // 词汇、词组
      let descContentDetail = $(this).find(
        ".details-content .details-content-title-box"
      );

      // 变形、双语解释
      let otherDescContentDetail = descContentDetail.children(
        ".details-content-title"
      );

      // 词汇搭配
      let cihuidapie = $(this)
        .find("#colid  .df_div2")
        .map(function () {
          let type = $(this).find(".de_title2");
          let stl = $(this)
            .find(".col_fl a")
            .map(function () {
              let n = $(this).text();
              let url = $(this).attr("href");
              return {
                en: n,
                l: "https://cn.bing.com" + url,
              };
            })
            .get();
          return {
            t: "搭配",
            subtype: [
              {
                t: "搭配",
                st: type.text(),
                stl,
              },
            ],
          };
        })
        .get();

      vocabulary.col = cihuidapie;

      // 同义词反义词vocabulary.oth = rightBox;
      let tongyici = $(this)
        .find("#synoid .df_div2")
        .map(function () {
          let type = $(this).find(".de_title1");
          let stl = $(this)
            .find(".col_fl a")
            .map(function () {
              let n = $(this).text();
              let url = $(this).attr("href");
              return {
                v: n,
                u: "https://cn.bing.com" + url,
                type: type.text(),
              };
            })
            .get();
          return stl;
        })
        .get();

      let fanyici = $(this)
        .find("#antoid .df_div2")
        .map(function () {
          let type = $(this).find(".de_title1");
          let stl = $(this)
            .find(".col_fl a")
            .map(function () {
              let n = $(this).text();
              let url = $(this).attr("href");
              return {
                v: n,
                u: "https://cn.bing.com" + url,
                type: type.text(),
              };
            })
            .get();
          return stl;
        })
        .get();

      vocabulary.oth = [
        {
          title: "同义词",
          vocabulary: tongyici,
        },
        {
          title: "反义词",
          vocabulary: fanyici,
        },
      ];
    }
  });

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
