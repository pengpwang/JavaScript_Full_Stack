import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

export default (store, routes, req, context) => {

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
        {/* {routes.map(route => 
          <Route { ...route } />
        )} */}

        { renderRoutes(routes) }
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
      <div id="root">${html}</div>
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