// pages/resualt/resualt.js
var API = require('../../utils/api.js')
var upng = require('../../utils/upng-js/UPNG.js')
var GP
const canvasID = 'scannerCanvas'
// var base64
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tempImage:"",

        //反馈地名
        areaList: ['南宁', "柳州", '桂林', "钦州--三婆石", "河池", '贺州', "玉林",],
        value:"河池",
        //弹出错误反馈框
        dialogvisible: false,
        options: {
            showclose: true,
            showfooter: true,
            closeonclickmodal: true,
            fullscreen: true,
        },
        title: '识别错误反馈',
        opacity: '0.4',
        width: '85',
        position: 'center',
        positions: [{
            title: '居中',
            value: 'center'
        }, {
            title: '顶部',
            value: 'top'
        }, {
            title: '底部',
            value: 'bottom'
        }],
        positionIndex: 0
    },

    // 反馈错误
    openDialog(){
        GP.setData({ dialogvisible:true})
    },
    // 选择地名
    bindChange: function (e) {
        const val = e.detail.value
        console.log(val)
        // this.setData({
        //     year: this.data.years[val[0]],
        //     month: this.data.months[val[1]],
        //     day: this.data.days[val[2]]
        // })
    },
    handleConfirm(){
        wx.showModal({
            title: '反馈成功',
            content: '衷心感谢您能反馈信息，增加AI识别度',
            showCancel:false,
            success:function(){
                GP.back()
            },
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        //TODO 
        // 1 识别建筑
        // 2 增加积分
        // 3 获取纪念卡
    },
    onShow(){
        var tempImagePath = wx.getStorageSync(API.KEY_TEMP_IMAGE_PATH)
        // console.log(tempImagePath)
        wx.getImageInfo({
            src: tempImagePath,
            success(res) {
                GP.drawTarget(tempImagePath, res.width, res.height)
                GP.setData({
                    tempImage: tempImagePath,
                    width: res.width,
                    height: res.height,
                })
                console.log(res.width)
                console.log(res.height)
            }
        })
    },


    // 2 图片画图
    drawTarget(tempImagePath, width, height) {
        var canvas = wx.createCanvasContext(canvasID)
        // 1. 绘制图片至canvas
        canvas.drawImage(tempImagePath, 0, 0, width, height)
        // 绘制完成后执行回调，API 1.7.0
        canvas.draw(false, () => {
            GP.imageToBase64()
        })
    },

    // 3 开始base编码
    imageToBase64() {

        // wx.showLoading({
        //     title: '识别中...',
        // })
        wx.canvasGetImageData({
            canvasId: canvasID,
            x: 0,
            y: 0,
            width: GP.data.width,
            height: GP.data.height,
            success(res) {
                let platform = wx.getSystemInfoSync().platform
                if (platform == 'ios') {
                    // 兼容处理：ios获取的图片上下颠倒
                    res = that.reverseImgData(res)
                }
                let pngData = upng.encode([res.data.buffer], GP.data.width, GP.data.height)
                let base64 = wx.arrayBufferToBase64(pngData)
                console.log(base64.length)
                // GP.easyDL()  //获取百度对比结果
                // GP.dish() //菜品识别
                // GP.faceAI(base64)
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



    faceAI(base64) {
        console.log("in face AI")
        wx.request({
            url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                api_key: "y-IDakOn3S3kW0vPX2kzg8sLrZtNLyb5",
                api_secret: "dSNBrCEpLcEA0gemfPHetg8G26UEIBkh",
                image_base64: base64,
                return_attributes: 'emotion',
            },
            success: (res) => {
                console.log(res)
                console.log(res.data.faces[0].attributes.emotion)
                // var step = GP.sort(res.data.faces[0].attributes.emotion)
                wx.showModal({
                    title: '识别成功',
                    content: '您获得了一张卡片',
                    success:function(){
                        GP.toComment()
                    },
                })
               
            },
            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                wx.hideLoading()

            },
        })
    },


    back() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    toComment(){
        
        // wx.redirectTo({
        //     url: '/pages/comment/comment',
        // })
    },
})