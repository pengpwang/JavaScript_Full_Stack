//index.js
//获取应用实例
const app = getApp()
// const key = '2fa9e8c5045ccb8755682ab02d49caea';
// const mock = {
//   "data1": {
//     "bankConversionPri": "670.6000",
//     "date": "2020-10-09",
//     "fBuyPri": "669.1900",
//     "fSellPri": "672.0100",
//     "mBuyPri": "663.8200",
//     "mSellPri": "672.0100",
//     "name": "美元",
//     "time": "17:40:02"
//   },
//   "data2": {
//     "bankConversionPri": "791.1050",
//     "date": "2020-10-09",
//     "fBuyPri": "788.1800",
//     "fSellPri": "794.0300",
//     "mBuyPri": "765.6400",
//     "mSellPri": "794.0300",
//     "name": "欧元",
//     "time": "17:40:02"
//   },
//   "data3": {
//     "bankConversionPri": "86.5350",
//     "date": "2020-10-09",
//     "fBuyPri": "86.3600",
//     "fSellPri": "86.7100",
//     "mBuyPri": "85.6500",
//     "mSellPri": "86.7100",
//     "name": "港币",
//     "time": "17:40:02"
//   },
//   "data4": {
//     "bankConversionPri": "6.3330",
//     "date": "2020-10-09",
//     "fBuyPri": "6.3095",
//     "fSellPri": "6.3564",
//     "mBuyPri": "6.1291",
//     "mSellPri": "6.3564",
//     "name": "日元",
//     "time": "17:40:02"
//   },
//   "data5": {
//     "bankConversionPri": "867.2250",
//     "date": "2020-10-09",
//     "fBuyPri": "864.0200",
//     "fSellPri": "870.4300",
//     "mBuyPri": "839.3000",
//     "mSellPri": "870.4300",
//     "name": "英镑",
//     "time": "17:40:02"
//   },
//   "data6": {
//     "bankConversionPri": "481.9050",
//     "date": "2020-10-09",
//     "fBuyPri": "480.1200",
//     "fSellPri": "483.6900",
//     "mBuyPri": "466.3900",
//     "mSellPri": "483.6900",
//     "name": "澳大利亚元",
//     "time": "17:40:02"
//   },
//   "data7": {
//     "bankConversionPri": "509.1650",
//     "date": "2020-10-09",
//     "fBuyPri": "507.2800",
//     "fSellPri": "511.0500",
//     "mBuyPri": "492.7700",
//     "mSellPri": "511.0500",
//     "name": "加拿大元",
//     "time": "17:40:02"
//   },
//   "data8": {
//     "bankConversionPri": "21.5800",
//     "date": "2020-10-09",
//     "fBuyPri": "21.5000",
//     "fSellPri": "21.6600",
//     "mBuyPri": "20.8300",
//     "mSellPri": "21.6600",
//     "name": "泰国铢",
//     "time": "17:40:02"
//   },
//   "data9": {
//     "bankConversionPri": "494.7000",
//     "date": "2020-10-09",
//     "fBuyPri": "492.8700",
//     "fSellPri": "496.5300",
//     "mBuyPri": "478.7700",
//     "mSellPri": "496.5300",
//     "name": "新加坡元",
//     "time": "17:40:02"
//   },
//   "data10": {
//     "bankConversionPri": "734.2050",
//     "date": "2020-10-09",
//     "fBuyPri": "731.4900",
//     "fSellPri": "736.9200",
//     "mBuyPri": "710.5700",
//     "mSellPri": "736.9200",
//     "name": "瑞士法郎",
//     "time": "17:40:02"
//   },
//   "data11": {
//     "bankConversionPri": "106.2900",
//     "date": "2020-10-09",
//     "fBuyPri": "105.9000",
//     "fSellPri": "106.6800",
//     "mBuyPri": "102.8700",
//     "mSellPri": "106.6800",
//     "name": "丹麦克朗",
//     "time": "17:40:02"
//   },
//   "data12": {
//     "bankConversionPri": "84.0050",
//     "date": "2020-10-09",
//     "fBuyPri": "83.8300",
//     "fSellPri": "84.1800",
//     "mBuyPri": "83.1600",
//     "mSellPri": "84.1800",
//     "name": "澳门元",
//     "time": "17:40:02"
//   },
//   "data13": {
//     "bankConversionPri": "162.0900",
//     "date": "2020-10-09",
//     "fBuyPri": "161.4900",
//     "fSellPri": "162.6900",
//     "mBuyPri": null,
//     "mSellPri": "162.6900",
//     "name": "林吉特",
//     "time": "17:40:02"
//   },
//   "data14": {
//     "bankConversionPri": "72.5550",
//     "date": "2020-10-09",
//     "fBuyPri": "72.2900",
//     "fSellPri": "72.8200",
//     "mBuyPri": "70.2200",
//     "mSellPri": "72.8200",
//     "name": "挪威克朗",
//     "time": "17:40:02"
//   },
//   "data15": {
//     "bankConversionPri": "443.2200",
//     "date": "2020-10-09",
//     "fBuyPri": "441.5800",
//     "fSellPri": "444.8600",
//     "mBuyPri": "428.9500",
//     "mSellPri": "444.8600",
//     "name": "新西兰元",
//     "time": "17:40:02"
//   },
//   "data16": {
//     "bankConversionPri": "12.8965",
//     "date": "2018-08-14",
//     "fBuyPri": "12.4190",
//     "fSellPri": "13.3740",
//     "mBuyPri": "12.4190",
//     "mSellPri": "13.3740",
//     "name": "菲律宾比索",
//     "time": "01:10:04"
//   },
//   "data17": {
//     "bankConversionPri": "8.6800",
//     "date": "2020-10-09",
//     "fBuyPri": "8.6500",
//     "fSellPri": "8.7100",
//     "mBuyPri": "8.3800",
//     "mSellPri": "8.7100",
//     "name": "卢布",
//     "time": "17:40:02"
//   },
//   "data18": {
//     "bankConversionPri": "75.7450",
//     "date": "2020-10-09",
//     "fBuyPri": "75.4600",
//     "fSellPri": "76.0300",
//     "mBuyPri": "73.3100",
//     "mSellPri": "76.0300",
//     "name": "瑞典克朗",
//     "time": "17:40:02"
//   },
//   "data19": {
//     "bankConversionPri": "22.3750",
//     "date": "2018-08-14",
//     "fBuyPri": "21.5500",
//     "fSellPri": "23.2000",
//     "mBuyPri": "21.5500",
//     "mSellPri": "23.2000",
//     "name": "新台币",
//     "time": "01:10:04"
//   },
//   "data20": {
//     "bankConversionPri": "176.6900",
//     "date": "2018-08-14",
//     "fBuyPri": "167.9000",
//     "fSellPri": "185.4800",
//     "mBuyPri": "167.9000",
//     "mSellPri": "185.4800",
//     "name": "巴西雷亚尔",
//     "time": "01:10:04"
//   },
//   "data21": {
//     "bankConversionPri": "0.2941",
//     "date": "2020-10-09",
//     "fBuyPri": null,
//     "fSellPri": "0.5881",
//     "mBuyPri": "0.5671",
//     "mSellPri": "0.5881",
//     "name": "韩国元",
//     "time": "17:40:02"
//   },
//   "data22": {
//     "bankConversionPri": "40.7100",
//     "date": "2020-10-09",
//     "fBuyPri": "40.5600",
//     "fSellPri": "40.8600",
//     "mBuyPri": "38.5800",
//     "mSellPri": "40.8600",
//     "name": "南非兰特",
//     "time": "17:40:02"
//   }
// };

Page({
  data: {
    list: []
  },
  onLoad() {
    this.getData();
  },
  onPullDownRefresh(){
    console.log('下拉刷新~')
    this.getData();
  },
  linkToCalculator(e) {
    const name = e.currentTarget.dataset.name;

    if(name){
      wx.navigateTo({
        url: `../calculator/calculator?name=${name}`
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '无法跳转'
      })
    }
    
  },
  linkToEpidemic(){
    wx.navigateTo({
      url: `../epidemic/epidemic`
    });
  },
  getData() {
       // const list = Object.values(mock);
    // this.setData({
    //   list
    // }, () => {
    //   try {
    //     wx.setStorageSync('_f_e_list', list)
    //   } catch (e) { }
    // });

    const _this = this;
    wx.request({
      url: `https://www.huipaijia.cn/api/finance/exchange/rmbquot`,
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
        if(res.data.error_code === 0){
          const listResObj = Array.isArray(res.data.result) ? res.data.result[0] : {};
          const list = Object.values(listResObj);
          _this.setData({
            list
          }, () => {
            try {
              wx.setStorageSync('_f_e_list', list)
            } catch (e) { }
          });
        }else{
          wx.showModal({
            title: '错误提示',
            content: res.data.reason || res.data.resultcode,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })      
        }
      }
    })
  }
})
