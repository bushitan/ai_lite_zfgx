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
    updateAddress(res){

        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)

        var unionid = wx.getStorageSync(API.KEY_UNIONID)
        // wx.request({
        //     'url': "https://www.51zfgx.com/Comment/Add",
        //     method: "POST",
        //     data:{
        //         "addrID":"7715",
        //         "unionid": unionid,
        //         "Type":6,
        //     },
        //     'success': function (res) {
        //         wx.showToast({
        //             title: '参与活动积分+1',
        //         })
        //     },
        // })

    },
    //获取地址
    address:function(){
        wx.chooseAddress({
            success: function (res) {
                GP.updateAddress(res)
            },
            fail:function(res){
                GP.openSetting()
            },
        })
    },
    // 获取授权
    openSetting(){
        wx.showModal({
            title: '未授权地址',
            content: '没有地址，明信片无法送达T_T',
            confirmText: "重新授权",
            success: function (res) {
                if (res.confirm) {
                    wx.openSetting({
                        success(res) {
                            GP.reAddress()
                        }
                    })
                }               
            },
        })
    },
    //重新获取地址
    reAddress(){
        wx.chooseAddress({
            success: function (res) {
                GP.updateAddress(res)
            },
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