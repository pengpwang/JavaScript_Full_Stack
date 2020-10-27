import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

export default (store, routes, req) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        {routes.map(route => 
          <Route { ...route } />
        )}
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
      <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          };
      </script>
      <script src="/index.js"></script>
    </body>
    </html>
  `;
};