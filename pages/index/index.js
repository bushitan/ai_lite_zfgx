var APP = getApp()
var API = require('../../utils/api.js')
var GP;
var Nanning = { name: "南宁 | 会展中心", id: 4, top: 300, left: 340, }
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status:0 ,// 0未点击地图 1点击地图
        swiper:"../../images/swiper.jpg",
        currentAreaID:"",
        currentArea: Nanning,

        danmuList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        if (wx.getStorageSync(API.KEY_CURRENT_AREA) == "")
            wx.setStorageSync(API.KEY_CURRENT_AREA, Nanning)
        else
            GP.setData({ currentArea: wx.getStorageSync(API.KEY_CURRENT_AREA)})
        GP.setData({
            danmuList: APP.globalData.danmu
        })
    },

    //点击地图的蜡烛
    clickTorch(e) {
        console.log(e.detail)
        var currentArea = e.detail
        var area_id = currentArea.id
        console.log(area_id == GP.data.currentAreaID)

        wx.setStorageSync(API.KEY_CURRENT_AREA, currentArea)

        if (area_id == GP.data.currentAreaID)
            GP.showDefault(currentArea)
        else
            GP.showArea(currentArea,area_id)
    },
    // clickArea(e){
    //     var area_id = e.currentTarget.dataset.area_id
    //     var newSwiper
    //     console.log(area_id == GP.data.currentAreaID)
    //     if (area_id == GP.data.currentAreaID)       
    //         GP.showDefault()
    //     else
    //         GP.showArea(area_id)
    // },
    showDefault(currentArea) {
        var defaultSwiper = "../../images/swiper.jpg"
        GP.setData({ 
            swiper: defaultSwiper ,
            currentAreaID: "",
            currentArea: currentArea,
        })
    },
    showArea(currentArea,area_id) {
        var newSwiper = "../../images/logo.jpg"
        GP.setData({ 
            swiper: newSwiper ,
            currentAreaID: area_id,
            currentArea: currentArea,
        })
     },


    toEmoji(){
        wx.navigateTo({
            url: '/pages/emoji/emoji',
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

    onMap(){
        wx.previewImage({
            urls: ["http://www.gxta.gov.cn/Content/front/images/%E5%B9%BF%E8%A5%BF%E6%97%85%E6%B8%B8%E5%AF%BC%E8%A7%88%E5%9B%BE-1.jpg"],
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})