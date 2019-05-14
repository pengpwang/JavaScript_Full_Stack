
'use strict';

/**
 * Module dependencies.  模块依赖
 */

 // 判断传入的函数是否是标准的generator-function
const isGeneratorFunction = require('is-generator-function');

// 轻量级的js的debug调试工具，暴露一个函数，传入你需要使用的模块，不会影响具体模块的使用
const debug = require('debug')('koa:application');

// 事件监听，当一个HTTP请求关闭，完成或请求出错的时候，调用注册好的回调函数
const onFinished = require('on-finished');

// 响应请求，向客户端或HTTP请求的请求来源方返回数据
const response = require('./response');

// 中间件函数数组，koa里面所有中间件都必须是中间件数组，数组里面的每一个值都必须是一个函数 ；next在其中实现。。**重要**
const compose = require('koa-compose');

// 判断数据是不是json数据格式
const isJSON = require('koa-is-json');

// 整个运行服务的执行上下文，在里面可以访问HTTP请求的request，和响应的response
const context = require('./context');

// 客户端的请求，以及所携带的数据。通过它可以获取到cookie，提交的表单数据，headers, url地址， query参数等等
const request = require('./request');

// 请求的状态码, 2XX, 3XX, 4XX, 5XX
const statuses = require('statuses');

// 记录用户信息，做一些业务埋点
// const Cookies = require('cookies');

// 约定了哪些数据可以被服务端接收,涉及到内容的协商，协议，和资源的控制。内部知识量很庞大
// const accepts = require('accepts');

const Emitter = require('events');
const util = require('util');
const Stream = require('stream');
const http = require('http');

// 白名单选择，把一个对象中的某些key检出
const only = require('only');

// 对老的koa中generator中间件做兼容,把他们转成标准的promise中间件
const convert = require('koa-convert');

// 判断在用的koa的某些接口或方法是不是过期，即将被废弃。如果过期或废弃，会给出一个相应的提示
const deprecate = require('depd')('koa');

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */

// 暴露 Application 类 **核心** ；提供传入中间件，监听端口，生成一个服务器实例，对HTTP请求逐层的过中间件数组里的每一项，将结果给handleResponse处理响应返回内容
// 继承自Emitter，则Application实例可直接为自定义事件注册回调函数，可以触发事件，可以捕捉事件
module.exports = class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  constructor() {
    super();

    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  // 传端口号，ip地址等
  listen(...args) {
    debug('listen');

    // 通过node的http模块生成一个HTTP.server的实例；*** 重点在this.callback() ***
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    // 做了兼容，把老的中间件模块fn转成promise的中间件模块
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');

    // 把中间件fn推入到实例的middleware数组中
    this.middleware.push(fn);
    return this;
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  callback() {
    // 通过compose处理整个中间件数组  *** 重要 ***
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      // 通过nodejs原生的req, res生成一个上下文
      const ctx = this.createContext(req, res);

      // 所有请求处理通过this.handleRequest(ctx, fn)完成
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  /**
   * Handle request in callback.
   *
   * @api private
   */

  handleRequest(ctx, fnMiddleware) {
    // 通过ctx拿到koa封装的res
    const res = ctx.res;

    // 对res设置默认的状态码 404
    res.statusCode = 404;

    // 配置onerror 触发的事件
    const onerror = err => ctx.onerror(err);

    // 申明handleResponse，   respond为向客户端返回数据
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);

    // fnMiddleware中间件数组，中间件数组处理链路，等到整个中间件数组处理完成后，把最终处理结果通过then传递给handleResponse
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  /**
   * Initialize a new context.
   *
   * @api private
   */

  createContext(req, res) {
    // 对象互相挂载，方便在整个HTTP请求链路中及时的访问到进来的及出去的请求上面的特定属性和行为.使我们用起来更方便

    // Object.create(proto [, propertiesObject])  //使用指定的原型对象及其属性去创建一个新对象
    const context = Object.create(this.context);  // 生成新对象 context
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);

    // 将当前实例交给context.app
    context.app = request.app = response.app = this;

    // 将nodejs原生的req, res 交给 context.req, context.res
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};

    return context;
  }

  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */
  // 异常情况的处理
  onerror(err) {
    if (!(err instanceof Error)) throw new TypeError(util.format('non-error thrown: %j', err));

    if (404 == err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();
  }
};

/**
 * Response helper.
 */
// 向客户端返回数据：内部做了状态码的判断，内容类型的判断
function respond(ctx) {
  // allow bypassing koa
  // 合理性校验
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  // 通过判断body的类型来调用 res.end() 向客户端返回数据
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
