import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import render from './render';
import { getServerStore } from '../store';
import routes from '../routes';


const app = express();
const port = 3000;

app.use(express.static('public'));

// 中间层数据请求代理转发
app.use('/api', proxy('http://localhost:4000', {
  proxyReqPathResolver(req) {
    return `/api${req.url}`;
  }
}));

app.get('*', (req, res) => {
  const store = getServerStore(req);
  // 多级路由匹配  react-router-config
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if(item.route.loadData){
      // 防止一个接口的失败，影响页面的渲染
      // 不管调用接口是否失败，都让它成功
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).then(resolve);
      })
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    const context = { css: [] };
    const html = render(store, routes, req, context);

    if(context.action === 'REPLACE'){
      // 重定向
      return res.redirect(301, context.url);
    }else if(context.notFound){
      res.statusCode = 404;
    }

    res.send(html);
  })
});

// app.get('*', (req, res) => {
//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title></title>
//       <style></style>
//     </head>
//     <body>
//       <div id="root"></div>
//       <script src="/index.js"></script>
//     </body>
//     </html>
//   `
//   res.send(html);
// })

app.listen(port, () => console.log(`react isomorphism app listening on port ${port}`));