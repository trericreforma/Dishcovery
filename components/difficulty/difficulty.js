Component({
  properties: {
    options: {
      type: Array,
      value: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' }
      ]
    },
    selected: {
      type: String,
      value: 'easy'
    }
  },
  methods: {
    onSelect(e) {
      const value = e.currentTarget.dataset.value;
      this.setData({ selected: value });
      this.triggerEvent('change', value);
    }
  }
});
