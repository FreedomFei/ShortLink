'use strict';

let db = require('../database/db');
let shortid = require('shortid');

exports.root = (response) => {
    response.writeHead(200, {'content-type': 'text/plain'});
    response.write('error root');
    response.end();
};

exports.insertLink = (response, url) => {
    let keyword = shortid.generate();
    console.log('keyword:' + keyword);
    let link = {
        url: JSON.parse(url).url,
        keyword: keyword
    };

    db.insertLink(link, (results) => {
        if (results) {
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write(JSON.stringify(results));
        } else {
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('error insertLink');
        }
        response.end();
    })
};

exports.selectLinkByKeyword = (response, shortLink) => {
    db.selectLinkByKeyword(shortLink, (results) => {
        if (results && results.length) {
            let result = results[0];
            console.log(JSON.stringify(result));

            response.writeHead(302, {'Location': result.url});
        } else {
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('error selectLinkByKeyword');
        }
        response.end();
    })
};

exports.selectLink = (response) => {
    db.selectLink((results) => {
        if (results && results.length) {
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write(JSON.stringify(results));
        } else {
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('error selectLink');
        }
        response.end();
    })
};
