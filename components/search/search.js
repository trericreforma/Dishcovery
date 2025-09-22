Component({
  properties: {
    placeholder: {
      type: String,
      value: 'Search...'
    },
    value: {
      type: String,
      value: ''
    }
  },
  methods: {
    onInput(e) {
      this.triggerEvent('input', e.detail.value);
    },
    onConfirm(e) {
      this.triggerEvent('confirm', e.detail.value);
    },
    onSearchTap() {
      this.triggerEvent('search', this.properties.value);
    }
  }
});
