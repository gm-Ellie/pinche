//首页
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    tabs: ['人找车', '车找人'],
    userInfo: null,
    carForPeopleList: [],
    peopleForCarList: [],
  },
  onLoad: function () {
    var that = this;
    this.setData({
      userInfo: app.globalData.userInfo
    });
    that.getCarForPeopleList();
  },
  //初始化页面，获取车找人数据
  getCarForPeopleList: function () {
    util.getReq('http://page.banma.dev.sankuai.com/api/message/common/msg/beaconSubTypes', {}, function (data) {
      console.log(data);
      this.carForPeopleList = data;
    })
  },
  //切换tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //打电话
  phoneClick: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.phone
    })
  }

})