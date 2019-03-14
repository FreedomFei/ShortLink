'use strict';

//response由router去做
exports.router = (handler, pathname, response, postData) => {

    if (typeof handler[pathname] === 'function') {
        //通用路由
        handler[pathname](response, postData);
    } else if (pathname) {
        //shortLink查询
        let shortLink = pathname.replace('/', '');
        handler['/selectLinkByKeyword'](response, shortLink);
    } else {
        //其他请求处理
        handler['/'](response);
    }
};
