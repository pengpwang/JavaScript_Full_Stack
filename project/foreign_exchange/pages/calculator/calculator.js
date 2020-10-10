
const N_mBuyPri = 0;
const N_fBuyPri = 1;
const N_mSellPri = 2;
const N_fSellPri = 3;

Page({
  data: {
    name: '',
    current: N_mBuyPri,
    N_mBuyPri: N_mBuyPri,
    N_fBuyPri: N_fBuyPri,
    N_mSellPri: N_mSellPri,
    N_fSellPri: N_fSellPri,
    tabs: [
      { name: '现钞买入价', index: N_mBuyPri },
      { name: '现汇买入价', index: N_fBuyPri },
      { name: '现钞卖出价', index: N_mSellPri },
      { name: '现汇卖出价', index: N_fSellPri },
    ],
    country_ex: {},
    rmb_mBuyPri: 0,
    f_money_mBuyPri: 0,
    rmb_fBuyPri: 0,
    f_money_fBuyPri: 0,
    rmb_mSellPri: 0,
    f_money_mSellPri: 0,
    rmb_fSellPri: 0,
    f_money_fSellPri: 0,
  },
  onLoad(options) {
    const { name } = options;
    let country_ex = {};
    
    try {
      const value = wx.getStorageSync('_f_e_list')
      if (value && Array.isArray(value)) {
        for(let v of value){
          if(v.name == name){
            country_ex = v;
            console.log(country_ex);
          }
        }
      }
    } catch (e) {
      wx.navigateBack();
    }

    this.setData({
      name,
      country_ex
    })
  },
  handleTab(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  handleRmb(e) {
    const type = e.currentTarget.dataset.type;
    const { fBuyPri, mBuyPri, fSellPri, mSellPri } = this.data.country_ex;
    let rmb = Number(e.detail.value) || 0;
    let f_money = 0;

    if(type == N_mBuyPri){
      this.setData({
        f_money_mBuyPri: 100 / mBuyPri * rmb
      });
    }else if(type == N_fBuyPri) {
      this.setData({
        f_money_fBuyPri: 100 / fBuyPri * rmb
      });
    }else if(type == N_mSellPri){
      this.setData({
        f_money_mSellPri: 100 / mSellPri * rmb
      });
    }else if(type == N_fSellPri){
      this.setData({
        f_money_fSellPri: 100 / fSellPri * rmb
      });
    }else{
      // DO Nothing
    }
    
  },
  handleFMoney(e) {
    const type = e.currentTarget.dataset.type;
    const { fBuyPri, mBuyPri, fSellPri, mSellPri } = this.data.country_ex;
    let f_money = Number(e.detail.value) || 0;
    let rmb = 0;

    if(type == N_mBuyPri){
      this.setData({
        rmb_mBuyPri: mBuyPri / 100 * f_money
      })
    }else if(type == N_fBuyPri) {
      this.setData({
        rmb_fBuyPri: fBuyPri / 100 * f_money
      })
    }else if(type == N_mSellPri){
      this.setData({
        rmb_mSellPri: mSellPri / 100 * f_money
      })
    }else if(type == N_fSellPri){
      this.setData({
        rmb_fSellPri: fSellPri / 100 * f_money
      })
    }else{
      // DO Nothing
    }
  }
});