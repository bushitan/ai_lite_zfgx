// components/xx_cover_news/xx_cover_news.js


var canvasID = "downCanvas"
var canvas
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        url: {
            type: String,
            value: {},
            observer: '_makeLandmark',
        },
        title: {
            type: String,
            value: "",
        },
        // width: {
        //     type: Number,
        //     value: 0,
        // },
        // height: {
        //     type: Number,
        //     value: 0,
        // },
        // pointColor: {
        //     type: String,
        //     value: "#ffffff",
        // },
        // lineColor: {
        //     type: String,
        //     value: "#ffffff",
        //     // observer: '_changeColor',
        // },

    },

    /**
     * 组件的初始数据
     */
    data: {
        borderSize:20,
        logoHeight:90,
        screenWidth:750,
        screenHeight:1000,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _makeLandmark(tempImagePath, oldVal) {

            console.log(tempImagePath)
            var that = this
            if (tempImagePath != "") {

                wx.getImageInfo({
                    src: tempImagePath,
                    success(res) {
                        var width = res.width
                        var height = res.height
                        var max = 530
                        if (width >= height) {
                            width = max
                            height = parseInt(max * res.height / res.width)
                        }
                        else {
                            height = max
                            width = parseInt(max * res.width / res.height)

                        }
                        that.setData({
                            width: width,
                            height: height,
                        })
                        canvas = wx.createCanvasContext(canvasID, that)
                      
                        that.drawLogo()
                        canvas.drawImage(tempImagePath, 110 + (max - width)/2, 180, width, height)
                        canvas.draw(false, () => {
                            that.imageToBase64()
                        }, this)
                    }
                })
            }
        },

        drawLogo() {

            canvas.drawImage("../../images/share_bg.jpg", 0, 0,
                this.data.screenWidth,
            this.data.screenHeight)
            canvas.setFillStyle("#ffffff")
            // canvas.setFontSize(40)
            canvas.font = 'normal bold 40px sans-serif';
            canvas.fillText(this.data.title, 110, 120)
            canvas.fill()
        },

        imageToBase64() {
            var that = this
            wx.canvasToTempFilePath({
                canvasId: canvasID,
                fileType: "jpg",
                x: 0,
                y: 0,
                width: this.data.screenWidth,
                height: this.data.screenHeight,
                success(res) {
                    // 临时文件
                    var tempFilePath = res.tempFilePath
                    wx.previewImage({
                        urls: [tempFilePath],
                    })
                    that.triggerEvent('complete');
                },
                fail(res) {
                    console.log(res)
                }
            }, that)
        },


        drawPoint(key){
            canvas.setFillStyle(this.data.pointColor)
            for (var i in key) {
                canvas.beginPath()
                canvas.arc(
                    this.getCenterPos(key[i]).x,
                    this.getCenterPos(key[i]).y,
                    key[i].width / 2,
                    0,
                    2 * Math.PI
                )
                canvas.fill()
            }

        },

        drawLine(point1, point2) {
            canvas.setLineWidth(2)
            canvas.setStrokeStyle(this.data.lineColor)
            canvas.beginPath()
            canvas.moveTo(
                this.getCenterPos(point1).x,
                this.getCenterPos(point1).y
            )
            canvas.lineTo(
                this.getCenterPos(point2).x,
                this.getCenterPos(point2).y
            )
            canvas.stroke()
        },

        getCenterPos(point) {
            var center_x = point.x + (point.width + this.data.borderSize ) / 2
            var center_y = point.y + (point.height + this.data.borderSize) / 2
            return { x: center_x, y: center_y, }
        },





    }
})
