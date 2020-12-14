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
    }, {
      id: 3,
      title: 'new title3'
    }, {
      id: 4,
      title: 'new title4'
    }, {
      id: 5,
      title: 'new title5'
    }, {
      id: 6,
      title: 'new title6'
    }, {
      id: 7,
      title: 'new title7'
    }, {
      id: 8,
      title: 'new title8'
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