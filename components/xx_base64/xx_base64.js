// components/xx_cover_news/xx_cover_news.js


var upng = require('UPNG.js')
var canvasID = "scannerCanvas"
var GP
Component({
  /**
   * 组件的属性列表
   */
    properties: {        
        // 改变颜色
        url: {
            type: String,
            value: "",
            observer: 'drawTarget',
        },
        width: {
            type: String,
            value: "",
        },
        height: {
            type: String,
            value: "",
        },
    
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_SCROLL: "scroll",
        MODE_MENU: "menu",
  },
    ready(){
        GP = this
    },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
      _changeMode(newVal, oldVal) {
          if (this.data.mode == "")
            this.setData({
                mode: this.data.MODE_MENU
            })
    },

    /**
     * return: 点击列表的index
     */
    clickLeft(e) {
        // this.setData({
        //     initindex: e.currentTarget.dataset.index
        // })
        console.log(123)
        this.triggerEvent('clickLeft');
    },



        // 2 图片画图
        drawTarget(tempImagePath, oldVal) {
            var that = this
            //获取图片的数据
            wx.getImageInfo({
                src: tempImagePath,
                success(res) {
                    console.log(res.width)
                    console.log(res.height)
                    // var width = res.width
                    // var height = res.height
                    var width = 100
                    var height = 100
                    that.setData({
                        width: width,
                        height: height
                    })
                    
                    var canvas = wx.createCanvasContext(canvasID)
                    // 1. 绘制图片至canvas
                    canvas.drawImage(tempImagePath, 0, 0, width, height)
                    // 绘制完成后执行回调，API 1.7.0
                    canvas.draw(false, () => {
                        GP.imageToBase64()
                    })
                }
            })


        },

        // 3 开始base编码
        imageToBase64() {

            var that = this
            var width = this.data.width
            var height = this.data.height
            wx.showLoading({
                title: '识别中...',
            })
            wx.canvasGetImageData({
                canvasId: canvasID,
                x: 0,
                y: 0,
                width: width,
                height: height,
                success(res) {
                    let platform = wx.getSystemInfoSync().platform
                    if (platform == 'ios') {
                        // 兼容处理：ios获取的图片上下颠倒
                        res = that.reverseImgData(res)
                    }
                    let pngData = upng.encode([res.data.buffer], width, height)
                    let base64 = wx.arrayBufferToBase64(pngData)
                    // phone64 = base64
                    console.log(base64.length)
                    that.triggerEvent('getBase64', base64);
                    // GP.easyDL()  //获取百度对比结果
                    // GP.dish() //菜品识别
                    // GP.faceAI()
                },
                fail(res) {
                    console.log(res)
                }
            })
        },

      // 3.1 IOS 图片倒置
      reverseImgData(res) {
          var w = res.width
          var h = res.height
          let con = 0
          for (var i = 0; i < h / 2; i++) {
              for (var j = 0; j < w * 4; j++) {
                  con = res.data[i * w * 4 + j]
                  res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
                  res.data[(h - i - 1) * w * 4 + j] = con
              }
          }
          return res
      },

  }
})
