Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    recipe: {
      type: Object,
      value: {}
    }
  },
  methods: {
    closeModal() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    },
    preventScroll() {}
  }
})
