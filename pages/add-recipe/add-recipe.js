Page({
  data: {
    showIngredientModal: false,
    selectedIngredients: []
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
});
