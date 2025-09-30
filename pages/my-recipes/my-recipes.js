  // ...existing code...
  const recipeService = require("../../api/services/recipe");
  Page({
    data: {
      search: '',
      loading: false,
      recipes: [],    
      showModal: false,
      selectedRecipe: {}
    },
    onLoad() {
      this.fetchRecipes();
    },
    async fetchRecipes() {
      try {
        const res = await recipeService.getRecipes();
        const filtered = Array.isArray(res) ? res.filter(item => typeof item === 'object' && item !== null) : [];
        this.setData({ recipes: filtered });
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    },
    openModal(e) {
      let selected = e.currentTarget.dataset.item;
      if (typeof selected !== 'object' || selected === null) {
        console.error('Selected recipe is not an object:', selected);
        wx.showToast({ title: 'Recipe data error', icon: 'none' });
        return;
      }
      this.setData({
        selectedRecipe: selected,
        showModal: true
      })
    },
    onModalClose() {
      this.setData({ showModal: false })
    }
  })
  