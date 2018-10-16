// components/xx_cover_news/xx_cover_news.js


var downCanvasID = "downCanvas"
Component({
    /**
     * 组件的属性列表
     */
    properties: {    
        getImage: {
            type: String,
            observer: '_getImage',
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _getImage(newVal, oldVal) {
            console.log(newVal)


            var canvas = wx.createCanvasContext(downCanvasID)
            // 1. 绘制图片至canvas
            // canvas.drawImage(this.data.bg, 0, 0, this.data.bgWidth, this.data.bgHeight)
            canvas.drawImage(this.data.bg, 0, 0, 355, 355)
            canvas.draw()
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                // width: this.data.bgWidth,
                // height: this.data.bgHeight,
                width: 355,
                height: 355,
                // destWidth: 100,
                // destHeight: 100,
                canvasId: downCanvasID,
                success(res) {
                    console.log(res.tempFilePath)
                }
            })

            // downCanvasID
            // wx.previewImage({
            //     urls: ['https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg'],
            // })
        },

    }
})
