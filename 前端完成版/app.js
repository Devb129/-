//app.js
var app = getApp();
App({
  onLaunch: function() {
      //调用登录接口
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //that.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
            }
          })
        }
      }
    })

    
  },


  globalData: {
    userInfo: null,
    location: ""
  }
})
