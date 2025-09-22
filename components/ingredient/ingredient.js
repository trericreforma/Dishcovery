Component({
  properties: {
    name: String,
    quantity: [String, Number],
    unit: String
  },
  data: {
    iconPath: ''
  },
  observers: {
    'name': function (name) {
      if (!name) {
        this.setData({
          iconPath: '../../assets/ingredients/default.png'
        });
        return;
      }
      const safeName = name.toLowerCase().replace(/\s+/g, '_');
      this.setData({
        iconPath: `../../assets/ingredients/${safeName}.png`
      });
    }
  }
});
