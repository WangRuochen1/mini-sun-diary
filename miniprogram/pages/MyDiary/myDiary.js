// miniprogram/pages/MyDiary/myDiary.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    openid: "",
    content:"",
    articles:[],
    currentLoad:0,
    loadMore: false,
  },

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.onQuery();
  },


  onQuery: function() {
    const db = wx.cloud.database()
    //查询当前用户日记
    db.collection('diaryCollect').skip(this.data.currentLoad).limit(6).where({
      _openid: this.data.openid
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res.data)
        var tempArray = this.data.articles
        tempArray.push.apply(tempArray,res.data)
        this.setData({
          articles: tempArray,
          loadMore: false,
          currentLoad: this.data.currentLoad + 6,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  scrollToLower: function() {
    console.log ("到最底下啦!!!");
    console.log(this.data.loadMore);
    if(!this.data.loadMore) {
      this.setData({
        loadMore: true,
      })
      this.onQuery();
    } 
  },

  showDiary: function(content) {
    console.log(content.currentTarget.dataset.name);
    console.log(content.currentTarget.dataset.time)
    var param = JSON.stringify(content.currentTarget.dataset.name);
    var time = JSON.stringify(content.currentTarget.dataset.time);
    wx.navigateTo({
      url: '/pages/SingleDiary/SingleDiary?param=' +param+'&time='+time,
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