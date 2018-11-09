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

        AIImage:"", //待识别图片
        //是否正在识别
        isLoad:false,
        dialog:"识别中...",
    },

    success(){
        wx.navigateBack({
            
        })
    },
    error(){
        wx.showModal({
            title: '反馈成功',
            content: '我们将人工复核，感谢您的反馈，将会提高识别AI效率',
            showCancel:false,
            success:function(){
                wx.navigateBack({})
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
        GP.setData({
            AIImage: tempImagePath,
        })
        wx.showLoading({
            title: '识别中...',
        })
    },

    getBase64(e) {
        // console.log(" in get OK")
        console.log(e.detail)
        console.log(e.detail.length)
        

        // var base64 = wx.getStorageSync("base64")

        GP.easyDL(e.detail)
        // GP.easyDL(ttt)
        
    },


    // 百度分析
    easyDL(base64_code) {
        var access_token = "24.6f731c3b52bc627f677f67d4ea472e9a.2592000.1544325371.282335-11721075"
        var base = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/suofen"
        wx.request({
            url: base + "?access_token=" + access_token,
            method: "POST",
            header: {
                'content-type': 'application/json'
            },

            data: {
                "image": base64_code,
                // "top_num": 5
            },
            success: (res) => {
                console.log(res.data)
                console.log(res.data.results)

                GP.setData({
                    dialog: GP.checkName(res.data.results[0].name)
                })

                GP.addScore()
            },
            fail: (res) => {
                console.log(res)
            },
            complete:function(){
                wx.hideLoading()
                // wx.showToast({
                //     title: '识别成功',
                // })
            },
        })
    },

    checkName(name){
        if (name == "[default]") return "图中没有欢欢，也没有喜喜"
        if (name == "logo") return "这是广西60大庆的LOGO"
        if (name == "hh") return "这是欢欢"
        if (name == "xx") return "这是喜喜"
        if (name == "hhxx") return "欢欢和喜喜"
        if (name == "all") return "LOGO，欢欢，喜喜都在"
    },

    addScore(){
        var unionid = wx.getStorageSync(API.KEY_UNIONID)
        wx.request({
            'url': "https://www.51zfgx.com/Comment/Add",
            method: "POST",
            data:{
                "addrID":"7715",
                "unionid": unionid,
                "Type":6,
            },
            'success': function (res) {
                wx.showToast({
                    title: '参与活动积分+1',
                })
            },
        })
    },

})