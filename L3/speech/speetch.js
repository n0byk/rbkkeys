const STT = require("stt");
const Fs = require("fs");
const Sox = require("sox-stream");
const MemoryStream = require("memory-stream");
const Duplex = require("stream").Duplex;
const Wav = require("node-wav");

const modelPath = "./models/model.tflite";
const model = new STT.Model(modelPath);
const desiredSampleRate = model.sampleRate();
const scorerPath = "./models/wiki-ru-6gram.scorer";
model.enableExternalScorer(scorerPath);

const dirs_in_work = [];
let current_dir = "";

setInterval(check_dir, 1000);

function check_dir() {
  let files = Fs.readdirSync("../data/audio/");
  files.forEach((_) => {
    if (dirs_in_work.indexOf(_) == -1) {
      dirs_in_work.push(_);
    }
  });
  if (!current_dir && dirs_in_work[0]) {
    console.log("object :>> ", "../data/audio/" + dirs_in_work[0]);
    const buffer = Fs.readFileSync("../data/audio/" + dirs_in_work[0]);
    const result = Wav.decode(buffer);

    if (result.sampleRate < desiredSampleRate) {
      resp.message = `Warning: original sample rate (' ${result.sampleRate} ') is lower than ' + ${desiredSampleRate} + 'Hz. Up-sampling might produce erratic speech recognition.`;
    }

    let audioStream = new MemoryStream();
    bufferToStream(buffer)
      .pipe(
        Sox({
          global: {
            "no-dither": true,
          },
          output: {
            bits: 16,
            rate: desiredSampleRate,
            channels: 1,
            encoding: "signed-integer",
            endian: "little",
            compression: 0.0,
            type: "raw",
          },
        })
      )
      .pipe(audioStream);

    audioStream.on("finish", async () => {
      let audioBuffer = audioStream.toBuffer();

      const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
      console.log("audio length", audioLength);

      const result = model.stt(audioBuffer);

      console.log("result:", { result });
      let res = JSON.stringify({ txt: result }, 2);
      Fs.writeFileSync("../data/audio_texts/" + dirs_in_work[0] + ".json", res);
      Fs.unlinkSync("../data/audio/" + dirs_in_work[0]);
      dirs_in_work.length = 0;
    });
    audioStream.on("error", async () => {
      console.log("1333 :>> ", 1333);
    });
    console.log("new file" + dirs_in_work[0]);
  }

  console.log("await file");
}

function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
