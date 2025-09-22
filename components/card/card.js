Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  externalClasses: ['customClass'],
  properties: {
    img: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: 'Card Title'
    },
    desc: {
      type: String,
      value: 'Card description'
    }
  },
  data: {},
  methods: {}
});
