// 配置路由条目

import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default [
  {
    path: '/',
    component: App,
    key: '/App',
    routes: [
      {
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
        key: '/',
      },{
        path: '/login',
        component: Login,
        key: '/login'
      },{
        component: NotFound,
        key: '/notfound'
      }
    ]
  }
];

// export default (
//   <Fragment>
//     <Route path='/' exact component={Home}></Route>
//     <Route path='/login' exact component={Login}></Route>
//   </Fragment>
// );