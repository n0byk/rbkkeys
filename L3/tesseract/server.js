const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: (m) => console.log(m),
});
const fs = require("fs");
const express = require("express");
const app = express();

let dirs_in_work = [];
let current_dir = "";
let counter = 0;

let interval = setInterval(check_dir, 1000);
async function startTs() {
  await worker.load();
  await worker.loadLanguage("rus");
  await worker.initialize("rus");
  await worker.setParameters({});
  console.log("rdy");
}
startTs();
function check_dir() {
  let dirs = fs.readdirSync("../data/snapshots/");
  dirs.forEach((_) => {
    if (dirs_in_work.indexOf(_) == -1) {
      dirs_in_work.push(_);
    }
  });
  if (!current_dir && dirs_in_work[counter]) {
    let files = fs.readdirSync(
      "../data/snapshots/" + dirs_in_work[counter] + "/"
    );
    if (files.length) {
      console.log(
        "files = ",
        files,
        "'../data/snapshots/' + current_dir + '/' = ",
        "../data/snapshots/" + current_dir + "/"
      );
      current_dir = dirs_in_work[counter];
      recognize(current_dir, [2, 10]);
    }
  }
  console.log("await files");
}

async function recognize(current_dir, arr) {
  console.log("current_dir = ", current_dir);
  let str = "";
  let name = current_dir.split(".")[0];
  for (let key of arr) {
    console.log("START NEW TESSERACT");

    const {
      data: { text },
    } = await worker.recognize(
      "../data/snapshots/" + current_dir + "/" + name + "_" + key + ".png"
    );
    str += text;
    //  await worker.terminate();
  }

  let res = JSON.stringify({ txt: str }, 2);
  createDir("../data/texts/" + current_dir + "/");
  fs.writeFileSync(
    "../data/texts/" + current_dir + "/" + current_dir.split(".")[0] + ".json",
    res
  );
  current_dir = "";
  counter++;
  console.log("result = ", str);
}

function createDir(name) {
  let dir = name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
