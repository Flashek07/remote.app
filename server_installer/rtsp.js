var Stream = require('node-rtsp-stream');
var WebSocket = require('ws');
var nconf = require('nconf');
nconf.file({
    file: 'config.json'
})
var url = nconf.get('streamUrl');
var server_name = nconf.get('name');
var port = nconf.get('wsPort');
var ffmpegSettings = nconf.get('ffmpegOptions');


function reStream() {
    console.log("stream")
    var runStream = new Stream({
        name: server_name,
        streamUrl: url,
        wsPort: port,
        ffmpegOptions: ffmpegSettings
    })

    runStream.wsServer.on('error', function () {
        runStream.mpeg1Muxer.stream.kill();
        console.log("restart stream...")
    });


}

function kamikaze() {
    console.log("kill me")
    throw new Error("restart!");
}

setInterval(kamikaze,3600000);

reStream();