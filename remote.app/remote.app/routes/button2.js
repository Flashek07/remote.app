var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var Gpio = require("onoff").Gpio;
var nconf = require('nconf');
var fs = require('fs');
nconf.file({
    file: 'json/lock.json'
});

/* Use button2 and POST home page. */
router.post('/', asyncHandler(async (req, res, next) => {
    const mechanism = function () {
        const button1Lock = nconf.get('button1Lock');
        const button2Lock = nconf.get('button2Lock');
        if (button2Lock == 'false' && button1Lock == 'false') {

            console.log("button2 click");
            const button2 = new Gpio(24, 'out');
            const blinkInterval = setInterval(blinkButton2, 2000);


            function blinkButton2() {
                if (button2.readSync() === 1) {
                    button2.writeSync(0);
                } else {
                    button2.writeSync(1);
                }
            }

            function endBlink() {
                clearInterval(blinkInterval);
                button2.writeSync(1);
                Timer();
            }
            
            setTimeout(endBlink, 1000);

            function Timer() {
                console.log("timer");
                nconf.set('button2Lock', 'true')
                nconf.save(function (err){
                    fs.readFile('json/lock.json', function (err, data){
                        console.dir(JSON.parse(data.toString()))
                        setTimeout(Unlock, 3000)
                    });
                });
            }

            res.redirect('/');

            function Unlock() {
                console.log("timer");
                nconf.set('button2Lock', 'false')
                nconf.save(function (err){
                    fs.readFile('json/lock.json', function (err, data){
                        console.dir(JSON.parse(data.toString()))
                    });
                });
            }

        } else {
            res.redirect('/');
        }
    }
    setTimeout(mechanism, 1000);

}));

module.exports = router;