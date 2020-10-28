const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

app.get('/api/news', (req, res) => {
  res.json({
    code: 0,
    data: [{
      id: 1,
      title: 'new title1'
    }, {
      id: 2,
      title: 'new title2'
    }]
  })
});

app.get('/api/login', (req, res) => {
  res.json({
    code: 0,
    data: {}
  })
});

app.get('/api/logout', (req, res) => {
  res.json({
    code: 0,
    data: {}
  })
});

app.listen(4000, () => console.log(`server api listening 4000`));