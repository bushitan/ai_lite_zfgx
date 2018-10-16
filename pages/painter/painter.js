// pages/resualt/resualt.js
var GP

var API = require('../../utils/api.js')
// anger：愤怒
// disgust：厌恶
// fear：恐惧
// happiness：高兴
// neutral：平静
// sadness：伤心
// surprise：惊讶

var bgList = [
    { header: "（愤怒表情）小主人，别生气啦", bgImage: "../../images/1.jpg", x: "12", y: "50" },
    { header: "（厌恶表情）不要嫌弃伦家啦", bgImage: "../../images/2.jpg", x: "112", y: "150" },
    { header: "（恐惧表情）你怕我的爪爪么！", bgImage: "../../images/3.jpg", x: "212", y: "70" },
    { header: "（高兴表情）爱你哦", bgImage: "../../images/4.jpg", x: "120", y: "180" },
    { header: "（平静表情）一起笑", bgImage: "../../images/5.jpg", x: "22", y: "150" },
    { header: "（伤心表情）憋难过", bgImage: "../../images/6.jpg", x: "72", y: "160" },
    { header: "（惊讶表情）吃惊么？", bgImage: "../../images/7.jpg", x: "100", y: "180" },
]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneImage:"../../images/info_unselect.png", 
        tagName:"",   

            tempImage:"https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg",


        // AI识别结果
        bg: "../../images/body.jpg",
        landmark: {},
        touchKey:"",
        move:{},
        
        // 选择器
        keyIndex:0,
        keyArray: [
            { name: "头部", value: "head" },
            { name: "脖子", value: "neck" },
            { name: "左肩", value: "left_shoulder" },
            { name: "左肘", value: "left_elbow" },
            { name: "左手", value: "left_hand" },
            { name: "右肩", value: "right_shoulder" },
            { name: "右肘", value: "right_elbow" },
            { name: "右手", value: "right_hand" },
            { name: "左臀", value: "left_buttocks" },
            { name: "左膝", value: "left_knee" },
            { name: "左脚", value: "left_foot" },
            { name: "右臀", value: "right_buttocks" },
            { name: "右膝", value: "right_knee" },
            { name: "右脚", value: "right_foot" },
        ],

        //颜色
        pointColor: "#6596ed",
        lineColor:"#6596ed",
        //获取图片
        getImage:false,


    },

    // 输入颜色
    inputPointColor(e) {
        var value = e.detail.value
        value = value.substring(0, 6)
        // var color = ("#" + value).substring(1, 7)
        GP.setData({ pointColor: "#" + value })
    }, 
    inputLineColor(e) {
        var value = e.detail.value
        value = value.substring(0, 6)
        GP.setData({ lineColor: "#" + value })
    }, 

    // 更换图片
    clickChoice() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
            }
        })
    },

      
    clickDown() { 
        GP.setData({ getImage:true})
    },




    save(){
        wx.showModal({
            title: '保存失败',
            content: '这功能还没开发完啦',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.bodyAI()
        // wx.getSystemInfo({
        //     success:function(res){
        //         GP.setData({
        //             windowWidth: res.windowWidth,
        //             windowHeight: res.windowHeight
        //         })
        //         wx.getImageInfo({
        //             src: '../../images/body.jpg',
        //             success(res) {
        //                 console.log(res)
        //                 GP.setData({
        //                     bgWidth: res.width,
        //                     bgHeight: res.height
        //                 })
        //                 // GP.bodyAI()
        //             }
        //         })
        //     }
        // })
       

    },

    toAI(){
        wx.navigateBack({ })
    },
    getBase64getBase64(e){
        console.log(e.detail)
        // GP.bodyAI(e.detail)
    },

    pickKey(e){
        console.log(e.detail)
        var index = e.detail.value
        GP.setData({
            keyIndex: index,
            touchKey:GP.data.keyArray[index].value,
        })
    },
    currentIndex(e){
        var index = e.detail
        GP.setData({
            keyIndex: index,
            touchKey: GP.data.keyArray[index].value,
        })
    },

    currentKey(e){
        var key = e.detail
        GP.setData({
            touchKey:key
        })
    },

    //移动
    moveTop() {
        var _move = { key: GP.data.touchKey, x: 0, y: -1, }
        GP.setData({ move: _move })
    },
    moveLeft() {
        var _move = { key: GP.data.touchKey, x: -1, y:0 }
        GP.setData({ move: _move })
    },
    moveRight() {
        var _move = { key: GP.data.touchKey, x: 1, y: 0}
        GP.setData({ move: _move })
    },
    moveBottom() {
        var _move = { key: GP.data.touchKey, x: 0, y: 1, }
        GP.setData({ move: _move })
    },



    bodyAI() {
        console.log("in face AI")
        wx.request({
            // url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
            url: "https://api-cn.faceplusplus.com/humanbodypp/v1/skeleton",
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                api_key: "y-IDakOn3S3kW0vPX2kzg8sLrZtNLyb5",
                api_secret: "dSNBrCEpLcEA0gemfPHetg8G26UEIBkh",

                image_url:"https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg",   
                // return_attributes: 'emotion',
            },
            success: (res) => {
                console.log(res)

                GP.setData({
                    bodyRectangle: res.data.skeletons[0].body_rectangle,
                    landmark: res.data.skeletons[0].landmark
                })
                // console.log(res.data.faces[0].attributes.emotion)
                // var step = GP.sort(res.data.faces[0].attributes.emotion)
                // GP.toEmojiResualt(step)

            },
            fail: (res) => {
                console.log(res)
            },
            complete: (res) => {
                wx.hideLoading()

            },
        })
    },

})