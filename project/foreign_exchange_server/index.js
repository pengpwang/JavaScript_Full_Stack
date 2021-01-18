
const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;
const key = '2fa9e8c5045ccb8755682ab02d49caea';
const ali_appCode = '167aa4c4122144a3b4e568755699e8ee';

app.get('/api/finance/exchange/rmbquot', (req, res) => {
  axios.get(`http://web.juhe.cn:8080/finance/exchange/rmbquot?key=${key}`)
    .then((data) => {
      res.send(data.data);
    }, (err) => {
      res.send({
        code: -1,
        data: null,
        msg: '数据服务宕机~'
      })
    })
});

app.get('/api/utils/epidemic', (req, res) => {
  axios({
    method: 'get',
    url: 'http://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend',
    headers: { 'Authorization': `APPCODE ${ali_appCode}` }
  })
    .then((data) => {
      res.send(data.data);
    }, (err) => {
      res.send({
        code: -1,
        data: null,
        msg: '数据服务宕机~'
      })
    })
});

app.get('/api/test', (req, res) => {
  res.send({
    code: 0,
    data: {
      name: 'Jack',
      age: 18
    }
  });
})



app.listen(port, () => console.log(`foreign exchange server app listening on port ${port}`));

