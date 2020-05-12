export default function authorize (url = '', type = 'IMAGE') {
  var that = this;
  // 获取用户是否开启用户授权相册
  wx.getSetting({
    success (res) {
      // 如果没有则获取授权
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success () {
            save(url, type)
          },
          fail () {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '若点击不授权，将无法使用保存图片功能',
              cancelText: '不授权',
              cancelColor: '#999',
              confirmText: '授权',
              confirmColor: '#f94218',
              success (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success (res) {
                      console.log(res.authSetting)
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      } else {
        save(url, type)
      }
    }
  })

}
 function save (url, type) {
  if (type === 'IMAGE') {
    // 有则直接保存
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success () {
        wx.showToast({ title: '保存成功', icon: 'none' })
      },
      fail () {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })

  } else if (type == 'VIDEO') {
    wx.saveVideoToPhotosAlbum({
      filePath: url,
      success (res) {
        wx.showToast({ title: '保存成功', icon: 'none' })
      }, fail () {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })

  }

}