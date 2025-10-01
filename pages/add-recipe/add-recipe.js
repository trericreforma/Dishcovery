const { BASE_URL } = require("../../api/config");

Page({
  data: {
    showIngredientModal: false,
    name: '',
    description: '',
    selectedIngredients: [],
    steps: [],
    selectedCategory: '',
    selectedCuisine: '',
    tags: '',
    imageUrl: '',
    youtubeUrl: '',
    tempImageUrl: ''
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

  handleQuantityInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = parseInt(e.detail.value, 10);
    
    // Validate the input
    if (isNaN(value) || value < 1) {
      return;
    }

    const updated = [...this.data.selectedIngredients];
    updated[index].quantity = value;
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

  handleNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  handleTagsInput(e) {
    this.setData({
      tags: e.detail.value
    });
  },

  handleChooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        
        wx.showLoading({
          title: 'Uploading image...'
        });

        // First, upload to your server
        wx.uploadFile({
          url: `${BASE_URL}/upload`,
          filePath: tempFilePath,
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);
            if (uploadRes.statusCode === 200) {
              this.setData({
                tempImageUrl: tempFilePath,
                imageUrl: `${BASE_URL}${data.url}` // Store the URL returned from server
              });
              wx.showToast({
                title: 'Image uploaded successfully',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: 'Failed to upload image',
                icon: 'error'
              });
            }
          },
          fail: (error) => {
            console.error('Upload failed:', error);
            wx.showToast({
              title: 'Failed to upload image',
              icon: 'error'
            });
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      }
    });
  },

  handleSubmitRecipe() {
    // Validate required fields
    if (!this.data.name || !this.data.description || !this.data.selectedCategory || !this.data.selectedCuisine) {
      wx.showToast({
        title: 'Please fill in all required fields',
        icon: 'none'
      });
      return;
    }

    const recipe = {
      name: this.data.name,
      description: this.data.description,
      category: this.data.selectedCategory,
      cuisine: this.data.selectedCuisine,
      tags: this.data.tags,
      ingredients: this.data.selectedIngredients.map(ing => ({
        name: ing.name,
        quantity: ing.quantity.toString(),
        unit: ing.unit
      })),
      instructions: this.data.steps.map((step, index) => ({
        step: (index + 1).toString(),
        description: step.text || step // Handle both text property and direct string
      })),
      image_url: this.data.imageUrl || '',
      youtube_url: this.data.youtubeUrl || ''
    };

    wx.showLoading({
      title: 'Saving recipe...'
    });

    wx.request({
      url: 'https://6a0204055b7b.ngrok-free.app/recipes',
      method: 'POST',
      data: recipe,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode === 201 || res.statusCode === 200) {
          wx.showToast({
            title: 'Recipe created successfully!',
            icon: 'success',
            duration: 2000,
            complete: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 2000);
            }
          });
        } else {
          wx.showToast({
            title: 'Failed to create recipe: ' + (res.data?.message || 'Unknown error'),
            icon: 'none',
            duration: 3000
          });
        }
      },
      fail: (error) => {
        wx.hideLoading();
        console.error('Error creating recipe:', error);
        wx.showToast({
          title: 'Network error. Please try again.',
          icon: 'none',
          duration: 3000
        });
      }
    });
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
