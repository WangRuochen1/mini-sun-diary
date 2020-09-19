// miniprogram/pages/writeDiary/writeDiary.js
const app = getApp()
var datalist = require("../../data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diary:"",
    openid:"",
    time:"",
    today:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.formatTime();
  },


  formatTime: function () {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds();
    
    var monthText = datalist.datalist.month[month];
    var today = monthText + "/" + day + "/" + year;
    var time = hour + ":" + minute;
    this.setData({
      today: today,
      time: time
    })
  },
 
  setDiary: function (val) {
    console.log(val.detail.value);
    this.setData({
      diary: val.detail.value
    });
  },

  finishDiary: function () {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    console.log(this.data.openid)
        // add to data base
    const db = wx.cloud.database()
    db.collection('diaryCollect').add({
      data: {
        diary: this.data.diary,
        today: this.data.today,
        time: this.data.time,
      },
      success: res => {
        wx.showToast({
          title: 'Save Successfully!',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
    // navigate back
    wx.redirectTo({
       url: '../WelcomePage/welcomePage',
    })
     
  },

  clickBack: function() {
    wx.redirectTo({
      url: '../WelcomePage/welcomePage',
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})