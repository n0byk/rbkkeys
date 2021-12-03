const fs = require("fs");
const natural = require("natural");
const stemmer = natural.PorterStemmerRu;
/*let stemmed = stemmer.tokenizeAndStem(",\n‚ ; Т ` у\n; й * - /Ы ) 4\nЙЙ ! т\nЙ \" Щ й д„\\пцшц || і\nч л ь у\n` Ма | >\nй ‚:@/; ° ‚ :..Г›::;; ай—\n:Ё‹ц' щ__._{ “ | Ё\n„ и _.\"\" Ё\nН\nПрокуратура проводит проверку по\nпоступившим обращениям жителей Басманного\nрайона о нарушении общественного порядка на\nул. Машкова. ;\n")
let res = stemmed.filter(word => word.length > 2);
console.log('res=', res);*/

function createDir(name) {
  let dir = name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

let dirs_in_work = [];
let current_dir = "";
let counter = 0;
let interval = setInterval((_) => {
  let dirs = fs.readdirSync("../data/texts/");
  dirs.forEach((_) => {
    if (dirs_in_work.indexOf(_) == -1) {
      dirs_in_work.push(_);
    }
  });
  if (!current_dir && dirs_in_work[counter]) {
    current_dir = dirs_in_work[counter];
    stem(current_dir);
  }
  console.log("await files");
}, 1000);

function stem(name) {
  let nm = name.split(".")[counter];
  let obj = JSON.parse(
    fs.readFileSync("../data/texts/" + name + "/" + nm + ".json")
  );
  let stemmed = stemmer.tokenizeAndStem(obj.txt);
  let res = stemmed.filter((word) => word.length > 2);
  saveFile(res.filter(unique));
  current_dir = "";
  counter++;
  console.log("res = ", res);
}

function saveFile(str) {
  let res = JSON.stringify({ txt: str }, 2);
  let file_name = current_dir.split(".")[0];
  let dir = "../data/stemmed_texts/" + file_name;
  console.log("dir = ", dir, "file_name=", file_name);
  createDir(dir + "/");
  fs.writeFileSync(dir + "/snapshots_" + file_name + ".json", res);
}
function unique(value, index, self) {
  return self.indexOf(value) === index;
}
