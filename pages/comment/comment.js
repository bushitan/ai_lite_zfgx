// pages/resualt/resualt.js
var APP = getApp()
var API = require('../../utils/api.js')
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        danmuList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.setNavigationBarTitle({
            title:"钦州--三婆石祝福墙"
        })
        GP.setData({
            danmuList: APP.globalData.danmu
        })

    },

    toAI(){
        wx.navigateBack({ })
    },
    sendZan(){
        wx.navigateTo({
            url: '/pages/comment_self/comment_self',
        })
    },
    back(){
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
})