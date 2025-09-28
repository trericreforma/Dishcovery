Component({
  data: {
    activePage: ''
  },
  lifetimes: {
    attached() {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      console.log(currentPage)
      this.setData({
        activePage: '/' + currentPage.route
      })
    }
  },
  methods: {
    goHome() {
      wx.switchTab({ url: '/pages/index/index' })
    },
    goSearch() {
      wx.navigateTo({ url: '/pages/search/search' })
    },
    onAdd() {
      wx.navigateTo({ url: '/pages/add-recipe/add-recipe' })
    },
    goBookmark() {
      wx.navigateTo({ url: '/pages/bookmark/bookmark' })
    },
    goProfile() {
      wx.navigateTo({ url: '/pages/profile/profile' })
    }
  }
})
