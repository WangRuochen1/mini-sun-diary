// miniprogram/pages/WelcomePage/welcomePage.js

const app = getApp()

Page({

  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    openid:"",
  },

  gotoWrite: function() {
    wx.navigateTo({
      url: '/pages/writeDiary/writeDiary',
    })
  },

  gotoMyDiary: function() {
    wx.navigateTo({
      url: '/pages/MyDiary/myDiary',
    })
  },

  gotoAnime: function() {
    wx.navigateTo({
      url: '/pages/Anime/anime',
    })
  },

  gotoTellBug: function (){
    wx.navigateTo({
      url: '/pages/TellBug/tellBug',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  console.log('get into here![云函数] [login] user openid: ', 
                  res.result.userInfo.openId)
                  app.globalData.openid = res.result.userInfo.openId
                  this.setData({
                    openid: res.result.userInfo.openId
                  })
                },
                fail: err => {
                  console.error('[云函数] [login] 调用失败', err)
                }
              })
              console.log(res);
            }
          })
        }
      }
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