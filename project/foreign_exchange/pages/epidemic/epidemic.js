let ll = require('../../data.js');

Page({
  data: {
    allData: ll
  },
  onLoad(){
    const _this = this;
    wx.request({
      url: `https://www.huipaijia.cn/api/utils/epidemic`,
      // url: `http://localhost:5000/api/utils/epidemic`,
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        _this.setData({
          allData: res.data
        })
      }
    })
  }
});