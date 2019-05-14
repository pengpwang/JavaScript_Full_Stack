
'use strict';

/**
 * Module dependencies.
 */

const contentDisposition = require('content-disposition');
const ensureErrorHandler = require('error-inject');
const getType = require('cache-content-type');
const onFinish = require('on-finished');
const isJSON = require('koa-is-json');
const escape = require('escape-html');
const typeis = require('type-is').is;
const statuses = require('statuses');
const destroy = require('destroy');
const assert = require('assert');
const extname = require('path').extname;
const vary = require('vary');
const only = require('only');
const util = require('util');

/**
 * Prototype.
 */
// 暴露一个普通对象，对象里定义了可以访问到的属性和可以调用的方法
// 处理数据完成后，响应给客户端的逻辑都封装在 response.js模块中
module.exports = {

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public  // 表明api 是公开的。可以被创建的实例访问到
   */

  // 拿到上下文请求中的套接字
  get socket() {
    return this.res.socket;
  },

  /**
   * Return response header.
   *
   * @return {Object}
   * @api public
   */

  // 拿到响应头中之前设置好的header, 若没有则返回{}, 且对nodejs版本做了兼容
  get header() {
    const { res } = this;
    return typeof res.getHeaders === 'function'
      ? res.getHeaders()
      : res._headers || {};  // Node < 7.7
  },

  /**
   * Return response header, alias as response.header
   *
   * @return {Object}
   * @api public
   */

  // 同 header, 拿到header的内容
  get headers() {
    return this.header;
  },

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  // 拿到返回的状态码
  get status() {
    return this.res.statusCode;
  },

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  // 设置状态码。即使之前设置了，这里依然可以修改; 若状态码不存在，则把返回的内容设为null
  set status(code) {
    if (this.headerSent) return;

    assert(Number.isInteger(code), 'status code must be a number');
    assert(code >= 100 && code <= 999, `invalid status code: ${code}`);
    this._explicitStatus = true;
    this.res.statusCode = code;
    if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses[code];
    if (this.body && statuses.empty[code]) this.body = null;
  },

  /**
   * Get response status message
   *
   * @return {String}
   * @api public
   */

  // 拿到状态消息内容 404 -> Not Found
  get message() {
    return this.res.statusMessage || statuses[this.status];
  },

  /**
   * Set response status message
   *
   * @param {String} msg
   * @api public
   */

  set message(msg) {
    this.res.statusMessage = msg;
  },

  /**
   * Get response body.
   *
   * @return {Mixed}
   * @api public
   */

  // 拿到响应内容，可能在中间件内设置过了body
  get body() {
    return this._body;
  },

  /**
   * Set response body.
   *
   * @param {String|Buffer|Object|Stream} val
   * @api public
   */
  
  // 设置返回内容;内部做了类型判断
  set body(val) {
    const original = this._body;
    this._body = val;

    // no content
    // 没有内容时，设置status为204
    if (null == val) {
      if (!statuses.empty[this.status]) this.status = 204;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }

    // set the status
    if (!this._explicitStatus) this.status = 200;

    // set the content-type only if not yet set
    const setType = !this.header['content-type'];

    // string
    // 若内容时字符串时，判断内容是否是<开始，是的话返回html， 否则返回纯文本
    if ('string' == typeof val) {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }

    // buffer
    // 是否是buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin';
      this.length = val.length;
      return;
    }

    // stream
    // 是否是流
    if ('function' == typeof val.pipe) {
      onFinish(this.res, destroy.bind(null, val));
      ensureErrorHandler(val, err => this.ctx.onerror(err));

      // overwriting
      if (null != original && original != val) this.remove('Content-Length');

      if (setType) this.type = 'bin';
      return;
    }

    // json
    this.remove('Content-Length');
    this.type = 'json';
  },

  /**
   * Set Content-Length field to `n`.
   *
   * @param {Number} n
   * @api public
   */
  // 设置响应内容的长度
  set length(n) {
    this.set('Content-Length', n);
  },

  /**
   * Return parsed response Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

   // 拿到响应内容的长度
  get length() {
    const len = this.header['content-length'];
    const body = this.body;

    if (null == len) {
      if (!body) return;
      if ('string' == typeof body) return Buffer.byteLength(body);
      if (Buffer.isBuffer(body)) return body.length;
      if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));
      return;
    }

    return Math.trunc(len) || 0;
  },

  /**
   * Check if a header has been written to the socket.
   *
   * @return {Boolean}
   * @api public
   */

  // 判断header的内容有没有写到套接字里面去；通常用来判断是否开始响应部分内容给客户端
  get headerSent() {
    return this.res.headersSent;
  },

  /**
   * Vary on `field`.
   *
   * @param {String} field
   * @api public
   */

  // 通过vary列出一些响应的字段列表，帮助缓存服务器使用合适的版本去解释这个文档 *** 高级玩法 ***
  vary(field) {
    if (this.headerSent) return;

    vary(this.res, field);
  },

  /**
   * Perform a 302 redirect to `url`.
   *
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   *
   * Examples:
   *
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   *
   * @param {String} url
   * @param {String} [alt]
   * @api public
   */

  // 重定向；绝对地址，路径
  redirect(url, alt) {
    // location
    if ('back' == url) url = this.ctx.get('Referrer') || alt || '/';
    this.set('Location', url);

    // status
    if (!statuses.redirect[this.status]) this.status = 302;

    // html
    if (this.ctx.accepts('html')) {
      url = escape(url);
      this.type = 'text/html; charset=utf-8';
      this.body = `Redirecting to <a href="${url}">${url}</a>.`;
      return;
    }

    // text
    this.type = 'text/plain; charset=utf-8';
    this.body = `Redirecting to ${url}.`;
  },

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {String} filename
   * @api public
   */

  // 附件， 对附件类型可以配置filename实现内容的配置 ***高级玩法***
  attachment(filename, options) {
    if (filename) this.type = extname(filename);
    this.set('Content-Disposition', contentDisposition(filename, options));
  },

  /**
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   *
   * Examples:
   *
   *     this.type = '.html';
   *     this.type = 'html';
   *     this.type = 'json';
   *     this.type = 'application/json';
   *     this.type = 'png';
   *
   * @param {String} type
   * @api public
   */
  // 设置返回的内容类型
  set type(type) {
    type = getType(type);
    if (type) {
      this.set('Content-Type', type);
    } else {
      this.remove('Content-Type');
    }
  },

  /**
   * Set the Last-Modified date using a string or a Date.
   *
   *     this.response.lastModified = new Date();
   *     this.response.lastModified = '2013-09-13';
   *
   * @param {String|Date} type
   * @api public
   */

  // 修改文件上一次的更改时间；用来通知客户端，内容过期，不要用本地缓存了
  set lastModified(val) {
    if ('string' == typeof val) val = new Date(val);
    this.set('Last-Modified', val.toUTCString());
  },

  /**
   * Get the Last-Modified date in Date form, if it exists.
   *
   * @return {Date}
   * @api public
   */
  // 拿到上次更新的时间
  get lastModified() {
    const date = this.get('last-modified');
    if (date) return new Date(date);
  },

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *     this.response.etag = 'md5hashsum';
   *     this.response.etag = '"md5hashsum"';
   *     this.response.etag = 'W/"123456789"';
   *
   * @param {String} etag
   * @api public
   */
  // 由服务器生成一个实体tag，用来标识url对象是否发生了更新或者改变
  set etag(val) {
    if (!/^(W\/)?"/.test(val)) val = `"${val}"`;
    this.set('ETag', val);
  },

  /**
   * Get the ETag of a response.
   *
   * @return {String}
   * @api public
   */

  get etag() {
    return this.get('ETag');
  },

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    const type = this.get('Content-Type');
    if (!type) return '';
    return type.split(';', 1)[0];
  },

  /**
   * Check whether the response is one of the listed types.
   * Pretty much the same as `this.request.is()`.
   *
   * @param {String|Array} types...
   * @return {String|false}
   * @api public
   */
  // 判断是不是某种类型
  is(types) {
    const type = this.type;
    if (!types) return type || false;
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(type, types);
  },

  /**
   * Return response header.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */
  // 拿到header里面具体配置项的内容
  get(field) {
    return this.header[field.toLowerCase()] || '';
  },

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   *
   * @param {String|Object|Array} field
   * @param {String} val
   * @api public
   */
  // 设置header里面一些子项的内容
  set(field, val) {
    if (this.headerSent) return;

    if (2 == arguments.length) {
      if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v));
      else if (typeof val !== 'string') val = String(val);
      this.res.setHeader(field, val);
    } else {
      for (const key in field) {
        this.set(key, field[key]);
      }
    }
  },

  /**
   * Append additional header `field` with value `val`.
   *
   * Examples:
   *
   * ```
   * this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
   * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
   * this.append('Warning', '199 Miscellaneous warning');
   * ```
   *
   * @param {String} field
   * @param {String|Array} val
   * @api public
   */
  // 插入一些自定义的header配置项
  append(field, val) {
    const prev = this.get(field);

    if (prev) {
      val = Array.isArray(prev)
        ? prev.concat(val)
        : [prev].concat(val);
    }

    return this.set(field, val);
  },

  /**
   * Remove header `field`.
   *
   * @param {String} name
   * @api public
   */
  // 移除一些header配置项
  remove(field) {
    if (this.headerSent) return;

    this.res.removeHeader(field);
  },

  /**
   * Checks if the request is writable.
   * Tests for the existence of the socket
   * as node sometimes does not set it.
   *
   * @return {Boolean}
   * @api private
   */

  // 检查request 是否继续可写
  get writable() {
    // can't write any more after response finished
    if (this.res.finished) return false;  // 完成响应的话，不允许写入内容了

    const socket = this.res.socket;
    // There are already pending outgoing res, but still writable
    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
    if (!socket) return true;
    return socket.writable;
  },

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    if (!this.res) return;
    const o = this.toJSON();
    o.body = this.body;
    return o;
  },

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'status',
      'message',
      'header'
    ]);
  },

  /**
   * Flush any set headers, and begin the body
   */

  // 刷新之前设置过的headers
  flushHeaders() {
    this.res.flushHeaders();
  }
};

/**
 * Custom inspection implementation for newer Node.js versions.
 *
 * @return {Object}
 * @api public
 */
if (util.inspect.custom) {
  module.exports[util.inspect.custom] = module.exports.inspect;
}
