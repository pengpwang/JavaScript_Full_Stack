import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../routes';
import getStore from '../store';

export default (req) => {
  const content = renderToString(
    <Provider store={getStore()}>
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