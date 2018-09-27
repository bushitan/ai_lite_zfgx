// pages/resualt/resualt.js
var GP
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneImage:"../../images/info_unselect.png", 
        tagName:"",   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        
        // console.log("ao")
        var ai = wx.getStorageSync("ai")
        // console.log(ai)
        var tagName
        if (ai.tagName == "非菜") 
            tagName = "这不是粉啊！"
        else if (ai.tagName.indexOf("面") != -1) 
            tagName = "有面的，好难嗦T_T！"
        else if (ai.tagName.indexOf("粉") != -1) 
            tagName = ai.tagName + ",嗦粉好嗨森^_^！"
        else if (ai.tagName == "") 
            tagName = "我也不懂这是啥！"
        else 
            tagName = "拿" + ai.tagName + "忽悠我，我要嗦粉"
        
        GP.setData({
            phoneImage:ai.phoneImage,
            tagName: tagName,
            // score: parseInt(ai.score * 100),
            // score: ai.score,
        })
    },

    toAI(){
        wx.navigateBack({ })
    },
})