// 小程序入口
App({
  globalData: {
    userInfo: null,
    audioContext: null
  },
  
  onLaunch() {
    // 初始化云开发（如需要）
    if (!wx.cloud) {
      console.log('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'xihu-poem-env',
        traceUser: true
      })
    }
  }
})
