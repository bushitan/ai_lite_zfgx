

var blessSrc = "https://mp.weixin.qq.com/s/XkdbAaFLeK_T52PpANbyuQ" //吉祥物识别文章
var mascotSrc = "https://mp.weixin.qq.com/s/JZqSx3emFCOM7SSAgTSWvg" //吉祥物识别文章
var postcardSrc = "https://mp.weixin.qq.com/s/wKlEut2PyfKICTnHc00VHA" //吉祥物识别文章

// 基础跳转
function toArticle(src){
        wx.navigateTo({
            url: '/pages/article/article?src=' + src,
        })
    
}
var menu = {
    toMore: function () {
        if (getCurrentPages().length == 1)
            wx.redirectTo({
                url: '/pages/more/more',
            })
        else
            wx.navigateBack({})
    },
    toBlessArticle: function () { 
        toArticle(blessSrc)
    },
    toMascotArticle: function () {
        toArticle(mascotSrc)
    },
    toPostcardArticle: function () {
        toArticle(postcardSrc)
    },
    toMascot() {
        wx.navigateTo({
            url: '/pages/mascot/mascot',
        })
    },

    toAddress() {
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },
}




module.exports = {
    toMore: menu.toMore,
    toBlessArticle: menu.toBlessArticle,
    toMascotArticle: menu.toMascotArticle,
    toPostcardArticle: menu.toPostcardArticle,
    toMascot: menu.toMascot,
    toAddress: menu.toAddress,
}
