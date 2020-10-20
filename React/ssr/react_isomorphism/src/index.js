import express from 'express';
import Home from './containers/Home';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title></title>
  </head>
  <body>
    <div>11</div>
  </body>
  </html>
  `);
});

app.listen(port, () => console.log(`react isomorphism app listening on port ${port}`));