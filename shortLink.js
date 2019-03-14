'use strict';

let ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let CHARS = Array.from(ORIGINAL);
let LENGTH = ORIGINAL.length;

exports.encode = () => {
    let number = Math.floor(Date.now());

    let shortUrl = '';
    while (number) {
        shortUrl += CHARS[number % LENGTH];
        number = parseInt(number / 62);
    }

    return shortUrl.split('').reverse().join('');
};

exports.decode = (keyword) => {
    let key = Array.from(keyword);
    let len = key.length;
    let number = 0;

    for (let i = 0; i < len; i++) {
        number = number + ORIGINAL.indexOf(key[i]) * Math.pow(62, len - i - 1);
    }
    return number;
};

// (() => {
//     let encode2 = encode();
//     console.log(encode2)
//     console.log(decode(encode2))
// })();


