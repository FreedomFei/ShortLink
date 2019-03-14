"use strict";

let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandler');

let handle = {};
handle['/'] = requestHandler.root;
handle['/favicon.ico'] = requestHandler.root;
handle['/insert'] = requestHandler.insertLink;
handle['/selectLinkByKeyword'] = requestHandler.selectLinkByKeyword;
handle['/selectLink'] = requestHandler.selectLink;

server.start(router.router, handle);