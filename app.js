const i18n = require('./i18n/index.js')

App({
  onLaunch() {
    const sysLang = (wx.getSystemInfoSync().language || 'en')
    const savedLang = wx.getStorageSync('lang') || null
    const defaultLang = savedLang || (sysLang.includes('zh') ? 'zh' : 'en')
    i18n.setLang(defaultLang)

    this.globalData = {
      i18n,
      currentLang: defaultLang
    }
  },
  globalData: {
    i18n,
    currentLang: 'en'
  }
})