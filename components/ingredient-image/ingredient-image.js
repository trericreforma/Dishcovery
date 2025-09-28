Component({
  properties: {
    name: String
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
      const safeName = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
      this.setData({
        iconPath: `../../assets/ingredients/${safeName}.png`
      });
    }
  },
  methods: {
    onError() {
      // fallback if image file not found
      this.setData({
        iconPath: '../../assets/ingredients/default.png'
      });
    }
  }
});
