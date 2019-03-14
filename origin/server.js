"use strict";

let http = require('http');
let url = require('url');

let PORT = process.env.PORT || 9090;

exports.start = (router, handler) => {
    http.createServer((request, response, body) => {
        let pathname = url.parse(request.url).pathname;
        console.log('path:' + pathname);

        let postData = '';
        request.setEncoding("utf8");
        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log('Received POST data chunk:' + postDataChunk);
        });
        request.addListener("end", function () {
            router(handler, pathname, response, postData);
        });
    }).listen(PORT);
};

console.log('server started!');
console.log('port:' + PORT);
