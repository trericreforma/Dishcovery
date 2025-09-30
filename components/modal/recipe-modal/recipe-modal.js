const bookmarkService = require('../../../api/services/bookmark.js');

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    recipe: {
      type: Object,
      value: {}
    }
  },

  data: {
    isBookmarked: false,
    bookmarkLoading: false
  },

  observers: {
    recipe(newRecipe) {
      if (newRecipe && newRecipe.id) {
        bookmarkService.checkBookmark(newRecipe.id)
          .then(res => {
            this.setData({ isBookmarked: !!res.isBookmarked });
          })
          .catch(err => {
            console.error("checkBookmark error:", err);
          });
      }
    }
  },

  methods: {
    closeModal() {
      this.setData({ visible: false });
      this.triggerEvent('close');
    },

    preventScroll() {},

    toggleBookmark() {
      // prevent double taps while request in flight
      if (this.data.bookmarkLoading) return;

      const recipeId = this.data.recipe && this.data.recipe.id;
      if (!recipeId) {
        wx.showToast({ title: 'No recipe id', icon: 'none' });
        return;
      }

      this.setData({ bookmarkLoading: true });

      bookmarkService.toggleBookmark(recipeId, (result, err) => {
        this.setData({ bookmarkLoading: false });

        if (err) {
          wx.showToast({ title: 'Error', icon: 'none' });
          console.error('bookmark toggle error', err);
          return;
        }

        const created = result && result.action === 'created';
        this.setData({ isBookmarked: created });

        wx.showToast({ title: created ? 'Bookmarked!' : 'Removed!' });

        // notify parent page if it wants to react
        this.triggerEvent('bookmarkchange', { recipeId, action: result.action });
      });
    }
  }
});
