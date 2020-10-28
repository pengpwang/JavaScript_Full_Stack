import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import StyleContext from 'isomorphic-style-loader/StyleContext';

export default (store, routes, req, context) => {
  const css = new Set() // CSS for all rendered React components
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const html = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {/* {routes.map(route => 
            <Route { ...route } />
          )} */}

          { renderRoutes(routes) }
        </StaticRouter>
      </Provider>
    </StyleContext.Provider>
  );

  const cssStr = [...css].join('\n');
  // const cssStr = context.css.join('\n');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title></title>
      <style>${cssStr}</style>
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