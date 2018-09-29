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
        

    },

    toAI(){
        wx.navigateBack({ })
    },
})