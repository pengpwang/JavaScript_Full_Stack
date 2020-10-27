import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import render from './render';
import { getStore } from '../store';
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
  const store = getStore();
  // 多级路由匹配
  const matchedRoutes = matchRoutes(routes, req.path);
  const promises = [];
  matchedRoutes.forEach(item => {
    if(item.route.loadData){
      promises.push(item.route.loadData(store));
    }
  });

  Promise.all(promises).then(() => {
    res.send(render(store, routes, req));
  });
});

app.listen(port, () => console.log(`react isomorphism app listening on port ${port}`));