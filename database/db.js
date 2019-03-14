'use strict';

let mysql = require('mysql');

let connection;

(function handleError() {
    connection = mysql.createConnection({
        host: '',
        port: ,
        database: '',
        user: '',
        password: '',
        charsetNumber: 'utf8mb4',
    });

    connection.connect((error) => {
        if (error) {
            console.error('error connecting: ' + error.stack);
            return setTimeout(handleError, 2000);
        }
        console.log('mysql connected as id ' + connection.threadId);
    });

    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
})();

exports.insertLink = (link, callback) => {
    // let sql =
    //     `INSERT INTO link (url, keyword, insert_at, update_at) VALUES ('${link.url}', '${link.keyword}', NOW(), NOW())`;

    let sql = 'INSERT INTO shortlink SET ?, insert_at = NOW(), update_at = NOW()';
    connection.query(sql, link, (error, results, fields) => {
            if (error) {
                throw error
            }
            callback(results)
        }
    )
};

exports.selectLinkByKeyword = (keyword, callback) => {
    // 1'OR'1'='1
    // let sql =
    //     `SELECT *
    //     FROM link
    //     WHERE BINARY keyword = '${keyword}'`;

    let sql = 'SELECT * FROM shortlink WHERE BINARY keyword = ?';
    connection.query(sql, keyword, (error, results, fields) => {
        if (error) {
            throw error
        }
        callback(results)
    })
};

exports.selectLink = (callback) => {
    let sql =
        `SELECT *
        FROM shortlink`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        }
        callback(results);
    })
};
