
#### 注意：

TODO:
babel
webpack
react
react-dom
react-router-dom
react-router-config
express
redux
react-redux
redux-thunk



















目录结构调整：

构建：webpack

1. 模块化标准统一到es module
2. es6，jsx编译；less，sass，postcss编译
3. 服务端构建及客户端构建；两端构建的共性及差异性
4. npm script 构建流
5. webpack配置优化

服务端React
1. 通过renderToString将虚拟DOM渲染成字符串
2. 无法执行事件绑定

客户端React

路由机制：
1. 浏览器端使用BrowerRouter, 服务器端使用StaticRouter
2. 路由配置

数据流：
1. 数据请求库 - 支持客户端及服务器端
2. 服务器端请求与客户端请求的不同处理
3. 中间层数据请求代理

css样式

SSR降级机制：
1. SSR应用降级至SPA应用的时机？
  - 服务端渲染流程中发生某些异常或全部异常？
  - 大流量场景减少服务器负担
2. 降级机制包括：
  - URL或配置文件中的全局降级
  - 服务器端渲染流程中发生异常

服务端缓存：
1. 与用户无关的接口和页面  -- 降低内容到达时间

接入全链路追踪：

性能优化：
1. Static Generation v.s. Server-side Rendering

部署：
1. 静态资源(js, css, images, fonts 及 Static Generation)部署
2. Server-side Rendering 部署



h5项目ssr难点及注意事项：
1. 环境区分 - 服务端还是客户端


