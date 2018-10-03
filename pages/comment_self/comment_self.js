// pages/comment_self/comment_self.js
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
        wx.setNavigationBarTitle({
            title: "钦州--三婆石祝福墙"
        })
    },
    send(){
        wx.showModal({
            title: '发送成功',
            content:"祝福广西，我出一力",
            success:function(){
                wx.navigateBack({
                    
                })
            },
        })
    },
        
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})