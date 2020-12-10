// 配置路由条目

import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import App from './shared/containers/App';
import Home from './shared/containers/Home';
import Login from './shared/containers/Login';
import NotFound from './shared/containers/NotFound';

export default [
  {
    path: '/',
    component: App,
    key: '/App',
    routes: [
      {
        path: '/home',
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