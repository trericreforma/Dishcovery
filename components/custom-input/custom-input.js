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
      this.triggerEvent('input', e.detail.value);
    }
  }
});
