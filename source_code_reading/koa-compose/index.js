'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

// 暴露出去的是一个普通函数 （对于函数源码阅读，先搞清楚入参及返回值 类型及值意义）
// 参数middleware是一个数组，数组的每一项必须是函数
// 作用：把一个个不相干的中间件串在一起，组合函数，把这些函数串联起来执行，前一个函数的输出结果就是另一个函数的输入参数
function compose (middleware) {
  // 参数校验，保证入参的正确性
  // 传入的参数是不是数组，不是抛错
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  
  // 判断传入的数组的每一项是不是函数
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
  
  // 返回匿名函数，匿名函数执行返回的是一个promise
  // context是koa实例中的ctx执行上下文对象
  // next是钩子或者回调函数，用于串联到下一个中间件
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      // 合理性校验， 满足条件的话，说明next()被调用了多次
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]

      // 当前下下标值和数组长度一样的时候，将next赋值给fn, 此时的next是 undefined
      if (i === middleware.length) fn = next

      // 整个中间件执行结束，返回
      if (!fn) return Promise.resolve()

      try {
        // fn(context, dispatch.bind(null, i + 1)) 是这个promise返回的结果
        // fn就是某一个中间件
        // 结果同时运行，此中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
