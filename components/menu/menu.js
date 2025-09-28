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
      wx.navigateTo({ url: '/pages/index/index' })
    },
    goSharedRecipes() {
      wx.navigateTo({ url: '/pages/sharedRecipes/sharedRecipes' })
    },
    onAdd() {
      wx.navigateTo({ url: '/pages/add-recipe/add-recipe' })
    },
    goBookmark() {
      wx.navigateTo({ url: '/pages/bookmarks/bookmarks' })
    },
    goProfile() {
      wx.navigateTo({ url: '/pages/profile/profile' })
    }
  }
})
