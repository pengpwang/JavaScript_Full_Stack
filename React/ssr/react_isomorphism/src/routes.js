// 配置路由条目

import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';

export default [
  {
    path: '/',
    component: Home,
    loadData: Home.loadData,
    key: '/',
    routes: [
      {
        path: '/login',
        component: Login,
        key: '/login'
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