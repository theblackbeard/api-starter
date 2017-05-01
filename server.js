'use strict';
const
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    series = require('./routes/series'),
    app = express();

    //view
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(express.static(__dirname + '/client'));
    app.use(express.static(__dirname + '/client/src'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use('/', index);
    app.use('/api/v1/', series);

    app.listen(3000, ()=>{
        console.log("Server stated on port 3000");
    });
