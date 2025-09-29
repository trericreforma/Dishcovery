Page({
  data: {
    showIngredientModal: false,
    selectedIngredients: [],
    steps: [],
    selectedCategory: '',
    selectedCuisine: ''
  },

  openModal() {
    this.setData({ showIngredientModal: true });
  },

  closeIngredientModal() {
    this.setData({ showIngredientModal: false });
  },

  handleAddIngredient(e) {
    const item = e.detail;
    const newItem = { ...item, quantity: 1 }; // default quantity
    this.setData({
      selectedIngredients: [...this.data.selectedIngredients, newItem]
    });
  },

  increaseQty(e) {
    const index = e.currentTarget.dataset.index;
    const updated = [...this.data.selectedIngredients];
    updated[index].quantity += 1;
    this.setData({ selectedIngredients: updated });
  },

  decreaseQty(e) {
    const index = e.currentTarget.dataset.index;
    const updated = [...this.data.selectedIngredients];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      this.setData({ selectedIngredients: updated });
    }
  },

  removeIngredient(e) {
    const index = e.currentTarget.dataset.index;
    const updated = [...this.data.selectedIngredients];
    updated.splice(index, 1);
    this.setData({ selectedIngredients: updated });
  },

  getIngredientIcon(name) {
    if (!name) {
      return '../../assets/ingredients/default.png';
    }
    const safeName = name.toLowerCase().replace(/\s+/g, '_');
    return `../../assets/ingredients/${safeName}.png`;
  },

  addStep() {
    this.setData({
      steps: [...this.data.steps, { text: '' }]  // ✅ not null
    });
  },
  

  handleStepInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    const steps = [...this.data.steps];
    steps[index] = value;
    this.setData({ steps });
  },

  updateStep(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value || '';
    const steps = this.data.steps;
    steps[index].text = value;
    this.setData({ steps });
  },

  removeStep(e) {
    const index = e.currentTarget.dataset.index;
    const steps = this.data.steps.filter((_, i) => i !== index);
    this.setData({ steps });
  },

  handleCategoryChange(e) {
    const categoryIndex = e.detail.value;
    const categories = ['Chicken','Seafood','Beef','Pork','Vegetable','Other'];
    this.setData({
      selectedCategory: categories[categoryIndex]
    });
  },

  handleCuisineChange(e) {
    const cuisineIndex = e.detail.value;
    const cuisines = ['Filipino','Australian','French','American','Japanese','Asian','Other'];
    this.setData({
      selectedCuisine: cuisines[cuisineIndex]
    });
  }
});
