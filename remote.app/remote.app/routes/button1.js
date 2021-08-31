var express = require('express');
var router = express.Router();
var asyncHandler = require('express-async-handler');
var Gpio = require("onoff").Gpio;
var nconf = require('nconf');
var fs = require('fs');
nconf.file({
    file: 'json/lock.json'
});

/* Use button1 and POST home page. */
router.post('/', asyncHandler(async (req, res, next) => {
    const mechanism = function () {
        const button1Lock = nconf.get('button1Lock');
        const button2Lock = nconf.get('button2Lock');
        if (button2Lock == 'false' && button1Lock == 'false') {

            console.log("button1 click");
            const button1 = new Gpio(23, 'out');
            const blinkInterval = setInterval(blinkButton1, 2000);


            function blinkButton1() {
                if (button1.readSync() === 1) {
                    button1.writeSync(0);
                } else {
                    button1.writeSync(1);
                }
            }

            function endBlink() {
                clearInterval(blinkInterval);
                button1.writeSync(1);
                Timer();
            }
            
            setTimeout(endBlink, 1000);

            function Timer() {
                console.log("timer");
                nconf.set('button1Lock', 'true')
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
                nconf.set('button1Lock', 'false')
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