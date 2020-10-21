import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './containers/Home';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const content = renderToString(<Home />);

  res.send(`
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
  `);
});

app.listen(port, () => console.log(`react isomorphism app listening on port ${port}`));