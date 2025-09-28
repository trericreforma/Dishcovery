Component({
  properties: {
    label: {
      type: String,
      value: 'Adjust value'
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 100
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onChange(e) {
      this.triggerEvent('change', e.detail.value);
    }
  }
});
