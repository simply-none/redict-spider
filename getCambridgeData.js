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

let prefixUrl = "jq";
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

  let dictBody = $("div.di-body .entry-body");

  if (!dictBody[0]) {
    console.log(path, "当前查找的单词无解释说明".red);
    return false;
  }

  const list = [];

  // 针对单词
  let cidiantiaomuList = dictBody.find(".pr.entry-body__el");

  if (cidiantiaomuList.length === 0) {
    // 针对短语
    cidiantiaomuList = dictBody.find(".entry-body__el");
  }

  let dict_title = ''

  cidiantiaomuList.each(function (index, element) {
    const posHeader = $(this).find(".pos-header");
    // 标题
   dict_title = posHeader.find(".di-title").text();
    // 类型
    const type = posHeader.find(".posgram");
    // 类型说明
    const typeTitle = type.find(".pos");
    // 发音
    const fayin = posHeader.find(".dpron-i");
    const fayinObj = [];
    fayin.each(function (index) {
      const ukus = $(this).find(".region");

      const source = $(this).find("audio source");

      const xiefa = $(this).find(".pron.dpron");

      const sourceDesc = [];
      source.each(function (index, element) {
        sourceDesc.push($(this).attr());
      });
      let ukusFlag = "not-uk-us";
      if (ukus.text().includes("uk")) {
        ukusFlag = "英";
      }
      if (ukus.text().includes("us")) {
        ukusFlag = "美";
      }
      fayinObj.push({
        // 音标源
        a: 'https://dictionary.cambridge.org' + sourceDesc[0]?.src || '',
        // 音标
        p: xiefa.text(),
        // 英 or 美
        t: ukusFlag,
      });
    });

    // -----------------pos body--------------------
    const posBody = $(this).find(".pos-body .pr.dsense");
    const dsense = [];
    let prances = []
    posBody.each(function () {
      const typeF = $(this).find(".hw.dsense_hw").text();
      const pos = $(this).find(".pos.dsense_pos").text();
      const posTip = $(this).find(".pos.dsense_pos").attr("title");
      const guideword = $(this).find(".guideword.dsense_gw").text();

      // dsense body
      let dsense_body_def_block_k = [];
      const dsense_body_def_block = $(this).find(
        ".sense-body.dsense_b>.def-block.ddef_block"
      );
      dsense_body_def_block.each(function () {
        const ddef_h = $(this).find(".ddef_h");
        const epp_xref = ddef_h.find(".epp-xref");
        const gram = ddef_h.find(".gram");
        const def = ddef_h.find(".def.ddef_d.db");

        const ddef_b = $(this).find(".def-body.ddef_b");
        const ddef_b_trans = ddef_b.children(".trans");

        const ddef_b_example = ddef_b.find(".examp");
        const example = [];
        ddef_b_example.each(function () {
          const eg = $(this).find(".eg");
          const egtrans = $(this).find(".trans");
          example.push({
            en: eg.text(),
            zh: egtrans.text(),
          });
        });

        dsense_body_def_block_k.push({
          // 英语等级，相当于难易程度，https://www.abaenglish.com/zh/levels/
          level: epp_xref.text(),
          // 二级词性分类，比如名词，有可数和不可数,https://dictionary.cambridge.org/zhs/help/codes.html
          pos_2: gram.text(),
          trans_en: def.text(),
          trans_cn: ddef_b_trans.text(),
          example,
        });
      });

      // pr phrase-block dphrase-block
      const phrase = [];
      const dsense_phrase_block = $(this).find(
        ".pr.phrase-block.dphrase-block"
      );
      dsense_phrase_block.each(function () {
        let phrase_head = $(this).find(".phrase-head.dphrase_h");
        let phrase_title = phrase_head.find(".phrase-title.dphrase-title");

        let phrase_body = $(this).find(".phrase-body.dphrase_b");
        // dsense body
        let dsense_body_def_block_kk = [];
        const dsense_body_def_block = phrase_body.find(".def-block.ddef_block");
        dsense_body_def_block.each(function () {
          const ddef_h = $(this).find(".ddef_h");
          const epp_xref = ddef_h.find(".epp-xref");
          const gram = ddef_h.find(".gram");
          const def = ddef_h.find(".def.ddef_d.db");

          const ddef_b = $(this).find(".def-body.ddef_b");
          const ddef_b_trans = ddef_b.children(".trans");

          const ddef_b_example = ddef_b.find(".examp");
          const example = [];
          ddef_b_example.each(function () {
            const eg = $(this).find(".eg");
            const egtrans = $(this).find(".trans");
            example.push({
              en: eg.text(),
              zh: egtrans.text(),
            });
          });

          dsense_body_def_block_kk.push({
            t: pos,
            en: phrase_title.text(),
            le: epp_xref.text(),
            gr: gram.text(),
            zhen: def.text(),
            zh: ddef_b_trans.text(),
            exm: example,
          });
        });

        phrase.push(...dsense_body_def_block_kk);
      });

      

      let dense = dsense_body_def_block_k.map(item => {
        
        const dense = {
          le: item.level,
          t: pos + item.pos_2,
          en: item.trans_en,
          zh: item.trans_cn,
          exm: item.example,

          n: typeF,
          // 词性
          // 帮助理解该单词意思
          g: delSpace(guideword),
        };
        return dense
      })

      prances.push(...phrase)

      dsense.push(...dense);
    });

    const data = {
      n: dict_title,
      t: delSpace(type.text()),
      p: dsense,
    };
    vocabulary.pd.push(data)
    vocabulary.ph.push(...prances)

    list.push(data);

  if (!vocabulary.n) {
    vocabulary.n = dict_title
  }


    if (fayinObj.length > 0 && vocabulary.p.length === 0) {
      vocabulary.p = fayinObj
    }
  });

  if (!dict_title) {
    console.log(path, "当前查找的单词无单词".red);
    return false
  }


  fs.writeFileSync(savePath, JSON.stringify(vocabulary), (err) => {
    console.log(err, Date.now().toString().red);
  });
}

function delSpace(str) {
  if (!str) {
    return "";
  }
  return str.replace(/^\s+|\s+$/g, "");
}


