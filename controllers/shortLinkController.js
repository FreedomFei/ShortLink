'use strict';

let shortid = require('shortid');
let db = require('../database/db');

let resData = {
    code: 0,
    message: '操作成功',
    data: [],
};

exports.root = (req, res) => {
    res.send(resData)
};

exports.insert = (req, res) => {
    let keyword = shortid.generate();
    console.log('keyword:' + keyword);
    let link = {
        keyword: keyword
    };
    Object.assign(link, req.body);

    db.insertLink(link, (results) => {
        if (results) {
            let data = Object.assign({}, resData, {data: [link]});
            res.send(data)
        } else {
            let data = Object.assign({}, resData, {code: 600, message: '操作失败'});
            res.send(data)
        }
    })
};

exports.keyword = (req, res) => {
    db.selectLinkByKeyword(req.params.keyword, (results) => {
        if (results && results.length) {
            let result = results[0];
            console.log(JSON.stringify(result));

            res.location(result.url);
            res.status(302).end();
        } else {
            let data = Object.assign({}, resData, {code: 600, message: '操作失败'});
            res.send(data)
        }
    })
};

exports.selectLink = (req, res) => {
    db.selectLink((results) => {
        if (results && results.length) {
            let data = Object.assign({}, resData, {data: results});
            res.send(data);
        } else {
            let data = Object.assign({}, resData, {code: 600, message: '操作失败'});
            res.send(data)
        }
    })
};
