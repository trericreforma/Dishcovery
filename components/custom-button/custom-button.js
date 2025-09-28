Component({
  properties: {
    label: {
      type: String,
      value: 'Button'
    },
    type: {            // 'primary' | 'secondary'
      type: String,
      value: 'primary'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    block: {           // full width or not (kept true by default)
      type: Boolean,
      value: true
    }
  },
  methods: {
    onTap(e) {
      if (this.data.disabled) return;
      // emit event to parent
      this.triggerEvent('tap', { }, { bubbles: true, composed: true });
    }
  }
});
