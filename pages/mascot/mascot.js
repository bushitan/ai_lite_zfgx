var APP = getApp()
var API = require('../../utils/api.js')
var MENU = require('../../utils/menu.js')
var UTIL = require('../../utils/util.js')
var GP;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logoContent: '我叫"锦绣辉煌，扬帆起航"，是60周年庆祝活动的徽标；您在路边看到我，请给我个大特写',
        hhContent: '我叫"欢欢"，壮文叫daegmbauq（发音：达姆巴），我会唱山歌、会打铜鼓，我抓的鱼可大了！您在路边看到我，请拍照给我点个赞',
        xxContent: '我叫"喜喜"，壮文叫dahniq（发音：达妮），我也会唱山歌、会跳舞，我酿的酒还可好喝咧！您在路边看到我，请跟我合个影^_^',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()
        GP.setData({
            day: UTIL.getDealing()
        })
    },

    onInit() {
        wx.login({
            success: function (res) {
                wx.request({
                    'url': "https://www.51zfgx.com/WxOpen/OnLogin?code=" + res.code,
                    method: "POST",
                    'success': function (res) {
                        console.log(res)
                        wx.setStorageSync(API.KEY_UNIONID, res.data.unionId)
                    },
                })
            },
            fail: function (res) {
                console.log("fail", res)
            },
        });
    },
    toMore() {
        MENU.toMore()        
    },
    toArticle() {
        MENU.toMascotArticle()
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
                    url: '/pages/m_result/m_result',
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