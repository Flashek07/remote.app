var Stream = require('node-rtsp-stream');
var express = require('express');
var router = express.Router();
var WebSocket = require('ws');

function reStream() {
    console.log("stream")
    var runStream = new Stream({
        name: 'brama',
        streamUrl: 'rtsp://172.16.1.251:554/user=admin_password=master1_channel=1_stream=1.sdp?real_stream',
        wsPort: 9999,
        ffmpegOptions: {
            '-stats': '',
            '-r': 20,
            '-loglevel': 'quiet',
            '-hide_banner': '',
            '-s': '427:240',
            '-b': '50000',
            '-fflags': 'nobuffer',
        }
    })
    runStream.wsServer.on("close", function () {
        runStream.mpeg1Muxer.stream.kill();
        console.log("kill stream...")
    });
    
    runStream.wsServer.on('error', function () {
        runStream.mpeg1Muxer.stream.kill();
        console.log("restart stream...")
    });

  

}

module.exports = {
    reStream
}