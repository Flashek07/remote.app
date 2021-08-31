var Service = require('node-windows').Service;

var svc = new Service({
  name:'rtsp_to_mpeg_restream',
  description: 'The nodejs restream from rtsp to mpeg by Fl@shek.',
  script: 'C:\\rtsp\\rtsp.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

svc.on('install',function(){
  svc.start();
});

svc.install();