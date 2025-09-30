  // ...existing code...
const recipeService = require("../../api/services/recipe");
Page({
  data: {
    search: '',
    loading: false,
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
      const filtered = Array.isArray(res) ? res.filter(item => typeof item === 'object' && item !== null) : [];
      this.setData({ recipes: filtered });
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    }
  },
  onSearchInput(e) {
    const value = (e && e.detail && typeof e.detail.value === 'string') ? e.detail.value.toLowerCase() : '';
    this.setData({ search: value });

    // Store latest search value for debounce
    this.latestSearchValue = value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(async () => {
      const criteria = this.latestSearchValue;
      if (!criteria) return;
      this.setData({ loading: true });
      try {
        const res = await recipeService.searchRecipes({ external: true, criteria });
        const filtered = Array.isArray(res) ? res.filter(item => typeof item === 'object' && item !== null) : [];
        this.setData({ recipes: filtered, loading: false });
      } catch (err) {
        console.error("Failed to search recipes:", err);
        this.setData({ recipes: [], loading: false });
      }
    }, 1200);
  },
  onCategorySelect(e) {
    const category = e.currentTarget.dataset.category;
    // If 'All' is selected, clear search and show all recipes
    if (category.trim().toLowerCase() === 'all') {
      this.fetchRecipes();
      this.setData({ search: '' });
      return;
    }
    this.setData({ search: category, loading: true });
    recipeService.searchRecipes({ external: true, criteria: category })
      .then(res => {
        const filtered = Array.isArray(res) ? res.filter(item => typeof item === 'object' && item !== null) : [];
        this.setData({ recipes: filtered, loading: false });
      })
      .catch(err => {
        console.error("Failed to search recipes by category:", err);
        this.setData({ recipes: [], loading: false });
      });
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
