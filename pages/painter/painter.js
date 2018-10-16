// pages/resualt/resualt.js
var GP
var API = require('../../utils/api.js')

//原始的
var orgBodyRectangle = {}
var orgLandmark = {}

var offsetBodyRectangle = {}
var offsetLandmark = {}

var canvas


Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneImage:"../../images/info_unselect.png", 
        tagName:"",   

        tempImage:"",


        // AI识别结果
        // bg: "../../images/body.jpg",
        key:"",
        landmark: {},
        touchKey:"",
        move:{},
        
        // 选择器
        keyIndex:0,
        keyArray: [
            { name: "头部", key: "head" },
            { name: "脖子", key: "neck" },
            { name: "左肩", key: "left_shoulder" },
            { name: "左肘", key: "left_elbow" },
            { name: "左手", key: "left_hand" },
            { name: "右肩", key: "right_shoulder" },
            { name: "右肘", key: "right_elbow" },
            { name: "右手", key: "right_hand" },
            { name: "左臀", key: "left_buttocks" },
            { name: "左膝", key: "left_knee" },
            { name: "左脚", key: "left_foot" },
            { name: "右臀", key: "right_buttocks" },
            { name: "右膝", key: "right_knee" },
            { name: "右脚", key: "right_foot" },
        ],

        //颜色
        pointColor: "#6596ed",
        lineColor:"#6596ed",
        //获取图片
    },


    onLoad: function (options) {
        GP = this
        // GP.onInit(GP.data.tempImage)


        var tempFile = "https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg"
        GP.setData({
            tempImage: tempFile
        })
        GP.onInit(tempFile)
    },

    //初始化屏幕
    onInit(imagePath){
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                GP.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,

                })
                wx.getImageInfo({
                    src: imagePath, 
                    success(res) {
                        var _width = GP.data.windowWidth - 20
                        var _ratio = _width / res.width
                        GP.setData({
                            imageWidth: _width,
                            imageHeight: _width * res.height / res.width,
                            ratio: _ratio,
                        })
                        GP.bodyAI()
                    }
                })
            }
        })
    },

    //转换点坐标
    offsetPoint(org_body_rectangle, org_landmark){


        var orgBodyRectangle = org_body_rectangle
        var orgLandmark = org_landmark

        var offsetBodyRectangle = {}
        var offsetLandmark = {}

        // 原点宽度
        var pointWidth = 10
        var pointHeight = 10

        //14个点坐标转换
        for (var i in orgLandmark){
            var _obj = orgLandmark[i]
            _obj.key = i
            _obj.width = pointWidth
            _obj.height = pointHeight
            _obj.x = (orgBodyRectangle.left + _obj.x) * GP.data.ratio - pointWidth / 2
            _obj.y = (orgBodyRectangle.top + _obj.y) * GP.data.ratio - pointHeight / 2
            offsetLandmark[i] = _obj
        }
        //跨步坐标生成
        var _half = {
            id: 14,
            x: (offsetLandmark["left_buttocks"].x + offsetLandmark["right_buttocks"].x) / 2,
            y: (offsetLandmark["left_buttocks"].y + offsetLandmark["right_buttocks"].y) / 2,
            width: 10,
            height: 10,
        }
        offsetLandmark["half"] = _half
        GP.setData({
            landmark: offsetLandmark
        })      
    },

    //获取当前的关节数值
    touchCallback(e) {
        var key = e.detail.key
        var landmark = e.detail.landmark
        offsetLandmark = landmark
        GP.setData({ key: key})
    },

    //移动
    moveTop() {
        offsetLandmark[GP.data.key].y = offsetLandmark[GP.data.key].y - 1
        GP.setData({ landmark: offsetLandmark })
    },
    moveLeft() {
        offsetLandmark[GP.data.key].x = offsetLandmark[GP.data.key].x - 1
        GP.setData({ landmark: offsetLandmark })
    },
    moveRight() {
        offsetLandmark[GP.data.key].x = offsetLandmark[GP.data.key].x + 1
        GP.setData({ landmark: offsetLandmark })
    },
    moveBottom() {
        offsetLandmark[GP.data.key].y = offsetLandmark[GP.data.key].y + 1
        GP.setData({ landmark: offsetLandmark })
    },




    // 更换图片
    clickChoice() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                // const tempFilePaths = res.tempFilePaths

                var tempFile = "https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg"
                GP.setData({
                    tempImage: tempFile
                })
                GP.onInit(tempFile )
            }
        })
    },

    //图片导出
    clickDown() {

        var _width = this.data.imageWidth
        var _height = this.data.imageHeight
        var downCanvasID = "downCanvas"
        // GP.setData({ getImage: true })
        canvas = wx.createCanvasContext(downCanvasID)
        // 1. 绘制图片至canvas
        canvas.drawImage(this.data.tempImage, 0, 0, _width, _height)
        GP.updateLine()
        canvas.draw()
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            // width: this.data.bgWidth,
            // height: this.data.bgHeight,
            width: _width,
            height: _height,
            // destWidth: 100,
            // destHeight: 100,
            canvasId: downCanvasID,
            success(res) {
                console.log(res.tempFilePath)
            }
        })

    },

    updateLine() {
        var key = offsetLandmark
        // console.log(key)
        this.drawLine(key["head"], key["neck"])
        this.drawLine(key["neck"], key["left_shoulder"])
        this.drawLine(key["neck"], key["right_shoulder"])

        this.drawLine(key["left_shoulder"], key["left_elbow"])
        this.drawLine(key["left_elbow"], key["left_hand"])

        this.drawLine(key["right_shoulder"], key["right_elbow"])
        this.drawLine(key["right_elbow"], key["right_hand"])

        this.drawLine(key["left_shoulder"], key["half"])
        this.drawLine(key["right_shoulder"], key["half"])


        this.drawLine(key["left_buttocks"], key["half"])
        this.drawLine(key["right_buttocks"], key["half"])

        this.drawLine(key["left_buttocks"], key["left_knee"])
        this.drawLine(key["left_knee"], key["left_foot"])

        this.drawLine(key["right_buttocks"], key["right_knee"])
        this.drawLine(key["right_knee"], key["right_foot"])

        // context.setStrokeStyle(this.data.lineColor)
        canvas.setLineWidth(2)
        canvas.setStrokeStyle(this.data.lineColor)
        canvas.stroke()
        // canvas.draw()
    },

    drawLine(point1, point2) {
        canvas.moveTo(
            this.getCenterPos(point1).x,
            this.getCenterPos(point1).y
        )
        canvas.lineTo(
            this.getCenterPos(point2).x,
            this.getCenterPos(point2).y
        )
    },

    getCenterPos(point) {
        var center_x = point.x + point.width / 2
        var center_y = point.y + point.height / 2
        return { x: center_x, y: center_y, }
    },



















    // 输入颜色
    inputPointColor(e) {
        var value = e.detail.value
        value = value.substring(0, 6)
        // var color = ("#" + value).substring(1, 7)
        GP.setData({ pointColor: "#" + value })
    }, 
    inputLineColor(e) {
        var value = e.detail.value
        value = value.substring(0, 6)
        GP.setData({ lineColor: "#" + value })
    }, 



    save(){
        wx.showModal({
            title: '保存失败',
            content: '这功能还没开发完啦',
        })
    },


    toAI(){
        wx.navigateBack({ })
    },
    getBase64getBase64(e){
        console.log(e.detail)
        // GP.bodyAI(e.detail)
    },

    pickKey(e){
        console.log(e.detail)
        var index = e.detail.value
        GP.setData({
            keyIndex: index,
            touchKey:GP.data.keyArray[index].value,
        })
    },
    currentIndex(e){
        var index = e.detail
        GP.setData({
            keyIndex: index,
            touchKey: GP.data.keyArray[index].value,
        })
    },

    currentKey(e){
        var key = e.detail
        GP.setData({
            touchKey:key
        })
    },

    //移动
    // moveTop() {
    //     var _move = { key: GP.data.touchKey, x: 0, y: -1, }
    //     GP.setData({ move: _move })
    // },
    // moveLeft() {
    //     var _move = { key: GP.data.touchKey, x: -1, y:0 }
    //     GP.setData({ move: _move })
    // },
    // moveRight() {
    //     var _move = { key: GP.data.touchKey, x: 1, y: 0}
    //     GP.setData({ move: _move })
    // },
    // moveBottom() {
    //     var _move = { key: GP.data.touchKey, x: 0, y: 1, }
    //     GP.setData({ move: _move })
    // },



    bodyAI() {
        console.log("in face AI")
        wx.request({
            // url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
            url: "https://api-cn.faceplusplus.com/humanbodypp/v1/skeleton",
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                api_key: "y-IDakOn3S3kW0vPX2kzg8sLrZtNLyb5",
                api_secret: "dSNBrCEpLcEA0gemfPHetg8G26UEIBkh",

                image_url:"https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg",   
                // return_attributes: 'emotion',
            },
            success: (res) => {
                console.log(res)

                GP.offsetPoint(
                    res.data.skeletons[0].body_rectangle,
                    res.data.skeletons[0].landmark
                )
              
                // console.log(res.data.faces[0].attributes.emotion)
                // var step = GP.sort(res.data.faces[0].attributes.emotion)
                // GP.toEmojiResualt(step)

            },
            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                wx.hideLoading()

            },
        })
    },

})