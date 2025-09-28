Component({
  properties: {
    placeholder: {
      type: String,
      value: 'Enter text...'
    },
    value: {
      type: String,
      value: ''
    }
  },
  methods: {
    onInput(e) {
      this.triggerEvent('input', { value: e.detail.value });
    }
  }
});
