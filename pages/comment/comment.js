// pages/resualt/resualt.js
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[1,2,3,4],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.setNavigationBarTitle({
            title:"钦州--三婆石祝福墙"
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