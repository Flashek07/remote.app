var Service = require('node-linux').Service;

var svc = new Service({
  name: 'remoteapp',
  description: 'The nodejs gate site web server.',
  script: './home/pi/remote.app/bin/www',
  
});

svc.on('install',function(){
  svc.start();
});

svc.install();