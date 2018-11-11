var APP = getApp()
var API = require('../../utils/api.js')
var MENU = require('../../utils/menu.js')
var GP;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressContent:"",
        addressNone: "添加收件地址",
        addressSuccess: "已添加（点击更新）",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.onInit()

       
    },

    onInit() {
        var unionid = wx.getStorageSync(API.KEY_UNIONID)
        wx.request({
            'url': "https://www.51zfgx.com/Address/List",
            method: "POST",
            data: {
                "unionID": unionid,
                // "unionID": "32131",
            },
            'success': function (res) {
                console.log(res.data)
                if (res.data.result.length > 0)
                    GP.setData({
                        addressContent: res.data.result[0],
                    })
            },
        })
    },

    toMore() {
        MENU.toMore()
    },
    toArticle() {
        MENU.toPostcardArticle()
    },

    updateAddress(res){
        var _address = {
            "userName": res.userName,
            "postalCode": res.postalCode,
            "provinceName": res.provinceName,
            "cityName": res.cityName,
            "countyName": res.countyName,
            "detailInfo": res.detailInfo,
            "nationalCode": res.nationalCode,
            "telNumber": res.telNumber,
        }


        var unionid = wx.getStorageSync(API.KEY_UNIONID)
        wx.request({
            'url': "https://www.51zfgx.com/Address/Add",
            method: "POST",
            data: {
                "unionID": unionid,
                "userName": res.userName,
                "postalCode": res.postalCode,
                "provinceName": res.provinceName,
                "cityName": res.cityName,
                "countyName": res.countyName,
                "detailInfo": res.detailInfo,
                "nationalCode": res.nationalCode,
                "telNumber": res.telNumber,
            },
            'success': function (res) {
                console.log(res)

                wx.showModal({
                    title: '添加地址成功',
                    content:"正在排队派发精美明信片",
                    showCancel:"false",
                })
                GP.setData({
                    addressContent: _address,
                })                
            },
        })

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
            title: '未授权添加地址',
            content: '没有地址，明信片无法送达T_T',
            confirmText: "重新添加",
            success: function (res) {
                if (res.confirm) {
                    wx.openSetting({
                        success(res) {
                            GP.reAddress()
                        },
                        fail: function (res) {
                            wx.showModal({
                                title: '授权失败',
                                content: '您未授权，没有地址，明信片无法送达T_T',
                                confirmText: "重新授权",
                            })
                        },
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