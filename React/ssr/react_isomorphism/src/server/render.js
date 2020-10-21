import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import routes from '../routes';

const reducer = (state = { name: 'Jack' }, action) => {
  return state;
}
const store = createStore(reducer, applyMiddleware(thunk));

export default (req) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        {routes}
      </StaticRouter>
    </Provider>
  );

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title></title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/index.js"></script>
    </body>
    </html>
  `;
};