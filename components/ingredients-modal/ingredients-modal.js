Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    query: '',
    ingredients: [
      { name: 'tomato', unit: 'pcs' },
      { name: 'egg', unit: 'pcs' },
      { name: 'oil', unit: 'tbsp' },
      { name: 'salt', unit: 'to taste' },
      { name: 'sugar', unit: 'tsp' },
      { name: 'rice noodles', unit: 'oz' },
      { name: 'garlic', unit: 'cloves' },
      { name: 'shrimp', unit: 'oz' },
      { name: 'bean sprouts', unit: 'cup' },
      { name: 'bell pepper', unit: 'pcs' },
      { name: 'green onion', unit: 'pcs' },
      { name: 'peanut', unit: 'cup' },
      { name: 'lime', unit: 'pcs' },
      { name: 'cilantro', unit: 'cup' },
      { name: 'fish sauce', unit: 'tbsp' },
      { name: 'soy sauce', unit: 'tbsp' },
      { name: 'vinegar', unit: 'tbsp' },
      { name: 'sriracha', unit: 'tbsp' },
      { name: 'coriander', unit: 'tsp' },
      { name: 'cumin', unit: 'tsp' },
      { name: 'turmeric', unit: 'tsp' },
      { name: 'cinnamon', unit: 'tsp' },
      { name: 'clove', unit: 'tsp' },
      { name: 'onion', unit: 'pcs' },
      { name: 'ginger', unit: 'inch' },
      { name: 'chicken', unit: 'pcs' },
      { name: 'tomato', unit: 'cup' },
      { name: 'chicken broth', unit: 'cup' },
      { name: 'cream', unit: 'cup' },
      { name: 'cilantro', unit: 'tbsp' },
      { name: 'spaghetti', unit: 'g' },
      { name: 'ground beef', unit: 'g' },
      { name: 'tomato sauce', unit: 'cups' },
      { name: 'carrot', unit: 'pcs' },
      { name: 'celery', unit: 'stalk' },
      { name: 'pepper', unit: 'to taste' },
      { name: 'romaine', unit: 'head' },
      { name: 'crouton', unit: 'cup' },
      { name: 'parmesan', unit: 'cup' },
      { name: 'caesar dressing', unit: 'cup' },
      { name: 'chicken', unit: 'g' },
      { name: 'flour', unit: 'cup' },
      { name: 'milk', unit: 'cup' },
      { name: 'baking powder', unit: 'tsp' },
      { name: 'butter', unit: 'tbsp' },
      { name: 'avocado', unit: 'pcs' },
      { name: 'onion', unit: 'pcs' },
      { name: 'tomato', unit: 'pcs' },
      { name: 'rice', unit: 'cups' },
      { name: 'pea', unit: 'cup' },
      { name: 'miso paste', unit: 'tbsp' },
      { name: 'dashi broth', unit: 'cups' },
      { name: 'tofu', unit: 'g' },
      { name: 'seaweed', unit: 'tbsp' },
      { name: 'bread', unit: 'slices' },
      { name: 'cheese', unit: 'slices' },
      { name: 'tortilla', unit: 'pcs' },
      { name: 'lettuce', unit: 'cup' },
      { name: 'salsa', unit: 'cup' },
      { name: 'garam masala', unit: 'tbsp' }
    ],
    filteredIngredients: []
  },
  methods: {
    handleInput(e) {
      const value = (e.detail && e.detail.value) ? e.detail.value.toLowerCase() : '';
      if (!value) {
        this.setData({
          query: '',
          filteredIngredients: []
        });
        return;
      }
  
      this.setData({
        query: value,
        filteredIngredients: this.data.ingredients.filter(item =>
          item.name.toLowerCase().includes(value)
        )
      });
    },
  
    addIngredient(e) {
      this.setData({
        query: '',
        filteredIngredients: []
      });
      const item = e.currentTarget.dataset.item;
      this.triggerEvent('add', item); // send to parent
      this.closeModal(); // close modal after adding
    },
  
    closeModal() {
      this.triggerEvent('close');
    },
  
    stopTap() {
      // prevent modal closing when tapped inside
    }
  }
  
});
