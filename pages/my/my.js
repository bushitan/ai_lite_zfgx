// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    clickCard(){
        wx.previewImage({
            urls: ["../../images/swiper.jpg"],
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})