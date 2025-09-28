Component({
  properties: {
    placeholder: {
      type: String,
      value: 'Enter text...'
    },
    value: {
      type: String,
      value: ''
    },
    autoHeight: {
      type: Boolean,
      value: true
    },
    maxlength: {
      type: Number,
      value: -1 // -1 means no limit
    }
  },
  methods: {
    onInput(e) {
      const val = e.detail.value || '';
      this.triggerEvent('input', { value: val });
    }
  }
});
