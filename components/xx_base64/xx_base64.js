// components/xx_cover_news/xx_cover_news.js


// var upng = require('UPNG.js')
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
        console.log("tempImagePath:", tempImagePath)
        if (tempImagePath != "") {
            wx.showLoading({
                title: '识别中...',
            })
            wx.getImageInfo({
                src: tempImagePath,
                success(res) {
                    var width = res.width
                    var height = res.height
                    var max = 400
                    if( width >= height){
                        width = max
                        height = parseInt(max * res.height / res.width)
                    }
                    else {
                        height = max
                        width = parseInt( max * res.width / res.height )

                    }
                    that.setData({
                        width: width,
                        height: height,
                    })
                    var canvas = wx.createCanvasContext(canvasID, that)
                    canvas.drawImage(tempImagePath, 0, 0, width, height)
                    canvas.draw(false, () => {
                        GP.imageToBase64()
                    },this)
                }
            })
        }
    },

    // 3 开始base编码
    imageToBase64() {

        var that = this
        var width = this.data.width
        var height = this.data.height
        wx.canvasToTempFilePath({
            canvasId: canvasID,
            fileType:"jpg",
            x: 0,
            y: 0,
            width: width,
            height: height,
            success(res) {
                // 临时文件
                var tempFilePath = res.tempFilePath
                wx.getFileSystemManager().readFile({
                    filePath: tempFilePath, //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: function (res) {
                        var base64Img = res.data;
                        that.triggerEvent('getBase64',  base64Img);
                    }
                })
            },
            fail(res) {
                console.log(res)
            }
        }, that)
    },

    // 3.1 IOS 图片倒置
    reverseImgData(res) {
        var w = this.data.width
        var h = this.data.height
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
