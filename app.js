'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let indexRouter = require('./routes/indexRouter');
let keywordRouter = require('./routes/keywordRouter');

let PORT = process.env.PORT || 9091;

app.use(bodyParser.json());

app.use('/sl', indexRouter);
app.use('/', keywordRouter);

app.listen(PORT, (req, res) => {
    console.log('app listening on port %d', 9091);
});
