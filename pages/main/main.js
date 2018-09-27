//获取应用实例
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputText: ''

  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  
  onShow() {
    const self = this
    let userText = wx.getStorageSync('userText')
    if (userText) {
      self.data.inputText = userText
      self.setData(self.data)
    } // page载入的时候先读取一次，wx.getStorageSync('userText')里面有没有内容，有内容就填充，没有则什么也不做
  },
  onInputText(e) {
    const self = this
    const value = e.detail.value
    if (value) {
      wx.setStorageSync('userText', value)
    } // 监听用户输入的信息，一旦有内容输入进去，就会使用wx.setStorageSync('userText', value)设置usertext这个key的值，使用wx.getStorageSync('userText')可以得到usertext这个key的值
  }
})

