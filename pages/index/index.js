// pages/index/index.js
var API = require('../../utils/api.js')
var GP;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status:0 ,// 0未点击地图 1点击地图
        swiper:"../../images/swiper.jpg",
        currentAreaID:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
    },

    //点击地图的蜡烛
    clickTorch(e) {
        console.log(e.detail)
        var area_id = e.detail
        console.log(area_id == GP.data.currentAreaID)
        if (area_id == GP.data.currentAreaID)
            GP.showDefault()
        else
            GP.showArea(area_id)
    },
    clickArea(e){
        var area_id = e.currentTarget.dataset.area_id
        var newSwiper
        console.log(area_id == GP.data.currentAreaID)
        if (area_id == GP.data.currentAreaID)       
            GP.showDefault()
        else
            GP.showArea(area_id)
    },
    showDefault() {
        var defaultSwiper = "../../images/swiper.jpg"
        GP.setData({ 
            swiper: defaultSwiper ,
            currentAreaID: ""
        })
    },
    showArea(area_id) {
        var newSwiper = "../../images/logo.jpg"
        GP.setData({ 
            swiper: newSwiper ,
            currentAreaID: area_id
        })
     },


    toEmoji(){
        wx.navigateTo({
            url: '/pages/emoji/emoji',
        })
    },
    chooseImage(){
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
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