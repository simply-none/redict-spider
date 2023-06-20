var fs = require("fs");

fs.readFile('./google-10000-english-no-swears.txt', {
  encoding: 'utf-8'
}, (err, data) => {
  let words = data.split(/\r\n/)
  words = words.filter(v => v)
  fs.writeFile('./google-10000-english-no-swears.json', JSON.stringify(words), () => {})
})