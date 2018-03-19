//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    var that = this;
    //小程序初始化先判断用户是否登录    
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            !!res.data ? that.globalData.userInfo = res.data : that.login();
          },
          fail: function () {
            that.login();
          }
        });
      },
      fail: function () {
        //登录态过期
        that.login() //重新登录
      }
    })
  },

  login: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setUserInfo(res.userInfo);
            that.setData({
              userInfo: res.userInfo
            });
          },
          fail: function (res) {
            that.loginFail();
          }
        })
      }
    })
  },

  loginFail: function () {
    var that = this;
    wx.showModal({
      content: '登录失败，请允许获取用户信息,如不显示请删除小程序重新进入',
      showCancel: false
    });
    that.login();
  },
  setUserInfo: function (data) { //将用户信息缓存保存
    this.globalData.userInfo = data;
    wx.setStorage({
      key: "userInfo",
      data: data
    })
  },
  globalData: {
    userInfo: null,
    sk: null
  }

})