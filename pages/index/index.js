
Page({
  data: {
    search: '',
    recipes: [
      {
        title: 'Tomato Egg Stir-fry',
        desc: 'A classic, quick Chinese dish.',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80',
        ingredients: ['2 tomatoes', '3 eggs', '1 tbsp oil', 'Salt', 'Sugar'],
        steps: [
          'Cut tomatoes into small pieces.',
          'Beat eggs with a pinch of salt.',
          'Heat oil in a pan, scramble eggs, then set aside.',
          'Stir-fry tomatoes until soft, add sugar and salt.',
          'Add eggs back, mix well, and serve.'
        ]
      },
      {
        title: 'Simple Pancakes',
        desc: 'Fluffy pancakes with minimal ingredients.',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80',
        ingredients: ['1 cup flour', '1 egg', '1 cup milk', '1 tbsp sugar', '1 tsp baking powder'],
        steps: [
          'Mix flour, sugar, and baking powder.',
          'Add egg and milk, whisk until smooth.',
          'Heat a pan, pour batter to form pancakes.',
          'Cook until bubbles form, flip and cook other side.',
          'Serve with syrup or toppings.'
        ]
      },
      {
        title: 'Garlic Butter Shrimp',
        desc: 'Easy shrimp recipe for seafood lovers.',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=120&q=80',
        ingredients: ['200g shrimp', '2 tbsp butter', '3 garlic cloves', 'Salt', 'Pepper'],
        steps: [
          'Peel and devein shrimp.',
          'Melt butter in a pan, add minced garlic.',
          'Add shrimp, cook until pink.',
          'Season with salt and pepper.',
          'Serve hot.'
        ]
      }
    ],
    allRecipes: [
      {
        title: 'Tomato Egg Stir-fry',
        desc: 'A classic, quick Chinese dish.',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80',
        ingredients: ['2 tomatoes', '3 eggs', '1 tbsp oil', 'Salt', 'Sugar'],
        steps: [
          'Cut tomatoes into small pieces.',
          'Beat eggs with a pinch of salt.',
          'Heat oil in a pan, scramble eggs, then set aside.',
          'Stir-fry tomatoes until soft, add sugar and salt.',
          'Add eggs back, mix well, and serve.'
        ]
      },
      {
        title: 'Simple Pancakes',
        desc: 'Fluffy pancakes with minimal ingredients.',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80',
        ingredients: ['1 cup flour', '1 egg', '1 cup milk', '1 tbsp sugar', '1 tsp baking powder'],
        steps: [
          'Mix flour, sugar, and baking powder.',
          'Add egg and milk, whisk until smooth.',
          'Heat a pan, pour batter to form pancakes.',
          'Cook until bubbles form, flip and cook other side.',
          'Serve with syrup or toppings.'
        ]
      },
      {
        title: 'Garlic Butter Shrimp',
        desc: 'Easy shrimp recipe for seafood lovers.',
        img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=120&q=80',
        ingredients: ['200g shrimp', '2 tbsp butter', '3 garlic cloves', 'Salt', 'Pepper'],
        steps: [
          'Peel and devein shrimp.',
          'Melt butter in a pan, add minced garlic.',
          'Add shrimp, cook until pink.',
          'Season with salt and pepper.',
          'Serve hot.'
        ]
      }
    ],
    showModal: false,
    selectedRecipe: {}
  },
  onSearchInput(e) {
    const value = e.detail.value.toLowerCase();
    const filtered = this.data.allRecipes.filter(r => r.title.toLowerCase().includes(value) || r.desc.toLowerCase().includes(value));
    this.setData({
      search: value,
      recipes: filtered
    });
  },
  onRecipeTap(e) {
    const index = e.currentTarget.dataset.index;
    const recipe = this.data.recipes[index];
    this.setData({
      showModal: true,
      selectedRecipe: recipe
    });
  },
  onModalClose() {
    this.setData({
      showModal: false,
      selectedRecipe: {}
    });
  }
})
