const recipeService = require("../../api/services/recipe");
Page({
  data: {
    search: '',
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
      this.setData({ recipes: res });
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    }
  },
  openModal(e) {
    this.setData({
      selectedRecipe: e.currentTarget.dataset.item,
      showModal: true
    })
  },
  onModalClose() {
    this.setData({ showModal: false })
  }
})
