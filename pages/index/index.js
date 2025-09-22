const recipeService = require("../../api/services/recipe");
Page({
  data: {
    search: '',
    categories: [
      {
        name: "All  ",
        img: "../../assets/icons/all.png"
      },
      {
        name: "Breakfast",
        img: "../../assets/icons/breakfast.png"
      },
      {
        name: "Lunch",
        img: "../../assets/icons/lunch.png"
      },
      {
        name: "Dinner",
        img: "../../assets/icons/dinner.png"
      },
      {
        name: "Snack",
        img: "../../assets/icons/snack.png"
      },
      {
        name: "Dessert",
        img: "../../assets/icons/dessert.png"
      },
      {
        name: "Drinks",
        img: "../../assets/icons/drinks.png"
      },
    ],
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
  onSearchInput(e) {
    const value = e.detail.value.toLowerCase();
    const filtered = this.data.allRecipes.filter(r => r.title.toLowerCase().includes(value) || r.desc.toLowerCase().includes(value));
    this.setData({
      search: value,
      recipes: filtered
    });
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
