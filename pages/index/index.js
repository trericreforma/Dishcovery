Page({
  data: {
    message: "Welcome to your first Mini App!"
  },
  handleClick() {
    wx.showToast({
      title: 'Button clicked!',
      icon: 'success'
    });
  }
})
