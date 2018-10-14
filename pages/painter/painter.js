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
        
        // console.log("ao")
        // var emoji = wx.getStorageSync(API.KEY_TEMP_IMAGE_PATH)
        // var step = emoji.step
        // // var step = 6
        // GP.setData({
        //     emojiBase64: emoji.emojiBase64,
        //     header: bgList[step].header,
        //     bgImage: bgList[step].bgImage,
        //     x: bgList[step].x,
        //     y: bgList[step].y,
        // })


        // console.log(ai)
        // var tagName
        // if (ai.tagName == "非菜") 
        //     tagName = "这不是粉啊！"
        // else if (ai.tagName.indexOf("面") != -1) 
        //     tagName = "有面的，好难嗦T_T！"
        // else if (ai.tagName.indexOf("粉") != -1) 
        //     tagName = ai.tagName + ",嗦粉好嗨森^_^！"
        // else if (ai.tagName == "") 
        //     tagName = "我也不懂这是啥！"
        // else 
        //     tagName = "拿" + ai.tagName + "忽悠我，我要嗦粉"
        
        // GP.setData({
        //     phoneImage:ai.phoneImage,
        //     tagName: tagName,
        //     // score: parseInt(ai.score * 100),
        //     // score: ai.score,
        // })
    },

    toAI(){
        wx.navigateBack({ })
    },
    getBase64(e){
        console.log(e.detail)
        // GP.bodyAI(e.detail)
    },

    bodyAI(base64) {
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
                // image_base64: base64,
                image_url:"https://cdn.faceplusplus.com.cn/mc-official/scripts/demoScript/images/demo-pic74.jpg",   
                // return_attributes: 'emotion',
            },
            success: (res) => {
                console.log(res)
                // console.log(res.data.faces[0].attributes.emotion)
                // var step = GP.sort(res.data.faces[0].attributes.emotion)
                // GP.toEmojiResualt(step)




//                 "1539445140,1dc3f9dd-ba57-42c6-8469-ece0f0bee909"
//                 skeletons
//                 :
//                 Array(1)
//                 0
// :
//                 body_rectangle
//                 :
//                 { width: 80, top: 201, left: 221, height: 207 }
//                 landmark
//                 :
//                 head
//                 :
//                 { y: 2, x: 34, score: 0.6236738 }
//                 left_buttocks
//                 :
//                 { y: 102, x: 42, score: 0.5800599 }
//                 left_elbow
//                 :
//                 { y: 72, x: 67, score: 0.57144314 }
//                 left_foot
//                 :
//                 { y: 197, x: 39, score: 0.57855994 }
//                 left_hand
//                 :
//                 { y: 72, x: 59, score: 0.47889563 }
//                 left_knee
//                 :
//                 { y: 141, x: 44, score: 0.5776876 }
//                 left_shoulder
//                 :
//                 { y: 41, x: 54, score: 0.551361 }
//                 neck
//                 :
//                 { y: 37, x: 37, score: 0.54930395 }
//                 right_buttocks
//                 :
//                 { y: 102, x: 27, score: 0.61194927 }
//                 right_elbow
//                 :
//                 { y: 63, x: 9, score: 0.6742425 }
//                 right_foot
//                 :
//                 { y: 176, x: 27, score: 0.5411666 }
//                 right_hand
//                 :
//                 { y: 72, x: 14, score: 0.5395435 }
//                 right_knee
//                 :
//                 { y: 141, x: 22, score: 0.5109828 }
//                 right_shoulder
//                 :
//                 { y: 41, x: 19, score: 0.5459569 }
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