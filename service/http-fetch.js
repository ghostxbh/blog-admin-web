/**
 * http by xbh 2019.07.16
 */

const fetch = require('node-fetch');
let Config = {
    Token: null,
    Headers: {"Content-Type": "application/json; charset=utf-8"},
    credentials: "include"
};

const http = (method, url, data) => {
    let logStr = `网络请求 ${url}(${method})`;
    let __st = new Date();
    let body = JSON.stringify(data);
    let headers = {
        ...Config.Headers,
        Authorization: Config.Token
    };
    return fetch(url, {method, headers, body})
        .then(response => response.json().then(json => {
            if (response.ok) {
                console.log(logStr, " ok 用时(ms):", new Date().getTime() - __st.getTime());
                return json;
            }
            let {status, statusText} = response;
            console.log(logStr, " error 用时(ms):", new Date().getTime() - __st.getTime());
            return Promise.reject({status, statusText, ...json});
        }));
};

const get = (url, data) => http('GET', url, data);

const post = (url, data) => http('POST', url, data);

const put = (url, data) => http('PUT', url, data);

const del = (url) => http('DELETE', url);

module.exports = {fetch, http, get, post, put, del, Config};