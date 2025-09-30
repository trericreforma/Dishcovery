const bookmarkService = require("../../api/services/bookmark.js");

Page({
  data: {
    search: '',
    recipes: [],    
    showModal: false,
    selectedRecipe: {}
  },

  onLoad() {
    this.fetchBookmarks();
  },

  async fetchBookmarks() {
    try {
      const res = await bookmarkService.getBookmarks();
      // res is an array of bookmarks with `recipe`
      const recipes = res.map(b => b.recipe); 
      this.setData({ recipes });
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      wx.showToast({ title: 'Failed to load bookmarks', icon: 'none' });
    }
  },

  openModal(e) {
    this.setData({
      selectedRecipe: e.currentTarget.dataset.item,
      showModal: true
    });
  },

  onModalClose() {
    this.setData({ showModal: false });
  }
});
