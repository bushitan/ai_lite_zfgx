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
        blessContent: "为广西60岁生日送祝福，赢广西旅游豪华大鲤  【点击参加】",
        hhxxContent: "寻找欢欢喜喜，抢可爱吉祥物周边  【点击参加】",
        postcardContent: "限量版纪念明信片，免费送！  【点击参加】",
        day:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        // GP.onInit()
        GP.setData({
            day: UTIL.getDealing()
        })
        
    },
    // 去送祝福
    toBless(){
        MENU.toBlessArticle()
    },
    // 寻找欢欢喜喜
    toMascot() {
        MENU.toMascot()
    },
    // 明信片 
    toAddress() {
        MENU.toAddress()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})