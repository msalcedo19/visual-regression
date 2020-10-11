var express = require('express');
var router = express.Router();
const cypress = require('cypress');
const resemble = require('resemblejs');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('start');
    cypress
        .run({
            spec: './cypress/integration/visual_regression.spec.js',
        })
        .then((_) => {
            // console.log(JSON.stringify(results))
            // res.end(JSON.stringify(results))
        })
        .catch((err) => {
            console.error(err)
        });
});

router.get('/diff', function(req, res, next) {

    // console.log(JSON.stringify(results))
    // res.end(JSON.stringify(results))
    var diff = resemble('./public/images/img1.png')
        .compareTo('./public/images/img2.png')
        .ignoreColors()
        .onComplete(function(data) {
            fs.writeFile('./public/images/img3.png', data.getBuffer(), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            res.send(JSON.stringify(data));
            /*
        {
          misMatchPercentage : 100, // %
          isSameDimensions: true, // or false
          dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
          getImageDataUrl: function(){}
        }
        */
        });
});

module.exports = router;
