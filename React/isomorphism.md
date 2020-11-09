
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
css-loader
style-loader
isomorphic-style-loader

promise



















一、目录结构调整：
1. 服务端运行的代码与客户端运行的代码的差异化区分抽离(`/server`, `/client`)及共性抽离(`/shared`)

二、构建：
1. 模块化标准统一到es module  -- 针对服务端
2. es6，jsx，tsx编译；less，sass，postcss编译
3. 服务端构建及客户端构建；两端构建的共性及差异性
4. webpack配置优化 - 主要为客户端配置优化
5. npm script 构建流 - 包括本地开发构建流，生产构建
  a. dev - 包括保存后同步编译客户端运行代码【内存中，缓存构建】，服务端运行代码【内存中？缓存构建？调研实现？】，启动服务端nodejs渲染服务器，启动静态资源服务器？ ==》构建速度需优化 ✨
  b. build - 构建生产运行代码，浏览器端及服务器端
  c. start - 生产代码构建后，start启动nodejs渲染服务器
  d. 构建速度优化

三、服务端React与客户端React
1. 服务端通过renderToString将虚拟DOM渲染成字符串
2. 客户端通过ReactDOM.hydrate水合服务端html
3. 服务端无法执行事件绑定，客户端执行js，绑定事件
4. 服务端无法执行`componentDidMount`，原客户端此生命周期内获取数据的方法需抽取出，构造组件级静态方法`loadData`用于服务端数据获取；若服务端注入此组件数据，客户端`componentDidMount`无需再次获取对应数据
5. 对于组件，同时适用于客户端及服务端的改造；

四、路由机制：
1. 浏览器端使用BrowerRouter, 服务器端使用StaticRouter
2. 路由配置及多级路由配置 - 对象配置 - 是否其他改造较小的方式？
3. 服务器端路由匹配及多级路由匹配；借助于 `react-router-config`的`matchRoutes`
4. 浏览器端及服务器端的路由渲染及多级路由渲染；借助于 `react-router-config`的`renderRoutes`
5. 未登录时，服务端redirect到登录页，客户端登录后直接进入未登录前的请求页 301重定向
6. 404页面，服务端返回404页面及404状态码

五、数据流：
1. 数据请求库 - 支持客户端及服务器端
2. 服务器端请求与客户端请求的不同处理 -- 客户端请求域名及服务端请求域名的差异/服务端请求携带其他额外http链路参数
3. 中间层数据请求代理
4. 服务端部分接口请求失败的处理  -- a.页面组件渲染;b.接入日志追踪系统
5. 服务端及客户端数据流管理的统一 -- redux
  a. 服务端store的创建
  b. 客户端store的创建(需脱水服务端注入的数据，用于客户端store的初始化)
6. 服务端数据获取的时机及组件级静态方法`loadData`的执行时机
7. 数据同步策略 -- 服务端渲染用到的数据在客户端重用 -- 数据的注水及脱水

六、css样式
1. 服务器端使用isomorphic-style-loader，浏览器端使用style-loader
2. React高阶组件封装 - 组件样式生成
3. 服务端css样式组装及注入 -- 客户端js是否重新驱动覆盖首屏内嵌style？

七、服务端缓存：
1. 与用户无关的接口和页面的缓存  -- 降低内容到达时间
2. React组件级缓存
3. 各缓存方案的选取？

八、SSR降级机制：
1. SSR应用降级至SPA应用的时机？
  a. 服务端渲染流程中发生某些异常或全部异常？
  b. 大流量场景减少服务器负担
2. 降级机制包括：
  a. URL或配置文件中的全局降级
  b. 服务器端渲染流程中发生异常

九、接入全链路追踪：
1. 服务端接口请求报错日志记录
2. 渲染服务器渲染报错日志记录

十、性能优化：
1. Static Generation v.s. Server-side Rendering
2. nodejs渲染服务器缓存：
 a. 页面缓存
 b. React组件级缓存 
 c. 特定接口数据缓存

十一、部署：
1. 静态资源(js, css, images, fonts 及 Static Generation)部署 -- CDN部署
2. Server-side Rendering 部署 -- nodejs渲染服务器部署
3. 降级为单页SPA时，提供的web应用容器外层是否nginx，或单页SPA由nodejs渲染服务器提供静态资源服务功能

十二、h5项目ssr注意事项：
1. 环境区分 - 服务端还是客户端
2. 埋点的处理
3. 用户登录状态转发
...其他问题...
其他问题：
1. nodejs SSR渲染服务器是否提供静态资源服务器功能
2. nodejs SSR渲染服务器是否提供数据代理转发功能，以优化数据调用链路
  - 如果提供数据代理转发功能，什么情况下代理？ -- 请求path？
  - 不提供数据代理，渲染服务器请求网关与浏览器端请求网关 - 同步？渲染服务器直接转发浏览器验签参数或渲染服务器实现浏览器验签功能
...其他...




