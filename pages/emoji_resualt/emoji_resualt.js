// pages/resualt/resualt.js
var GP

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

        header:"小主人，别生气啦",
        bgImage: "../../images/sf.png",
        emojiBase64: "../../images/qr.jpg",
        x:"12",
        y:"50",
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
        var emoji = wx.getStorageSync("emoji")
        var step = emoji.step
        // var step = 6
        GP.setData({
            emojiBase64: emoji.emojiBase64,
            header: bgList[step].header,
            bgImage: bgList[step].bgImage,
            x: bgList[step].x,
            y: bgList[step].y,
        })


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
})