var APP = getApp()
var API = require('../../utils/api.js')
var GP;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
    },

    onInit() {
        wx.login({
            success: function (res) {
                wx.request({
                    'url': "https://www.51zfgx.com/WxOpen/OnLogin?code=" + res.code,
                    method: "POST",
                    'success': function (res) {
                        console.log(res)
                    },
                })
            },
            fail: function (res) {
                console.log("fail", res)
            },
        });
    },
    toArticle() {
        wx.navigateTo({
            url: '/pages/article/article',
        })
    },


    //选择照片
    toPainter() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePath = res.tempFilePaths[0]
                wx.setStorageSync(API.KEY_TEMP_IMAGE_PATH, tempFilePath)
                wx.navigateTo({
                    url: '/pages/resualt/resualt',
                })
                // console.log(tempFilePaths)
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})