const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const extractAudio = require('ffmpeg-extract-audio');
const axios = require('axios');
const fs = require('fs');
ffmpeg.setFfmpegPath(ffmpegPath);

takeScreens('2.mp4');


async function takeScreens(name)
{
	let proc = new ffmpeg('./video/' + name);
	let s = proc.takeScreenshots(
		{
		  count: 1,
		  timemarks: create_timemarks(),
		  filename: name.split('.')[0] + '.png'
		}, 
		'../data/snapshots/2.mp4',
		function(err, filenames) 
		{
			console.log('done');
		},
	)
}
extract_audio();
function createDir(name)
{
	let dir = '../data/snapshots/' + name;

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}
async function extract_audio()
{
	console.log("extract_audio");
	await extractAudio({
	  input: './video/2.mp4',
	  output: '../data/audio/2.wav'
	})
	console.log("end_audio");
	//send_req('./video/2.mp4', 3002)
}
 
function create_timemarks()
{
	let res = [];
	for(let i = 0; i < 10; i++)
	{
		res.push( String(i))
	}
	//console.log('res = ', res);
	return res;
}

function send_req(txt, port)
{
	console.log('send_req = ', send_req);
	axios({
	  method: 'post',
	  url: "http://localhost:" + port,
	  body: { file: txt },
	})
	.then((res) => 
	{
		console.log('res.data = ', res.data);
	})
	.catch((error) => 
	{
	  console.error("SENDED MES ERROR =", error);
	});
}