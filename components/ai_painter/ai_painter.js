// components/xx_cover_news/xx_cover_news.js
//1 head	Object	头部
//2 neck	Object	脖子
//3 left_shoulder	Object	左肩
//4 left_elbow	Object	左肘
//5 left_hand	Object	左手
//6 right_shoulder	Object	右肩
//7 right_elbow	Object	右肘
//8 right_hand	Object	右手
//9 left_buttocks	Object	左臀
//10 left_knee	Object	左膝
//11 left_foot	Object	左脚
//12 right_buttocks	Object	右臀
//13 right_knee	Object	右膝
//14 right_foot	Object	右脚

var canvasID = "lineCanvas"
var context
var tempKey = ""
Component({
  /**
   * 组件的属性列表
   */
    properties: {        
        // 改变颜色
        bodyRectangle: {
            type: Object,
            value: {},
        },
        landmark: {
            type: Object,
            value: {},
            observer: '_changeLandmark',
        },

        move: {
            type: Object,
            value: {},
            observer: '_changeMove',
        },

        bg: {
            type: String,
            value: "",
            observer: '_changeBG',
        },
        pointColor: {
            type: String,
            value: "#ffffff",
        },
        lineColor: {
            type: String,
            value: "#ffffff",
            observer: '_changeColor',
        },
       
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_SCROLL: "scroll",
        MODE_MENU: "menu",
        list:[],

        isTouchLock:false,
        windowWidth:0,
        windowHeight:0,
        bgWidth: 0,
        bgHeight: 0,
    },

    ready(){
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                    
                })
                wx.getImageInfo({
                    src: '../../images/body.jpg',
                    success(res) {
                        console.log(res)
                        var _width = that.data.windowWidth - 20
                        var _height = _width * res.height / res.width
                        var _xRatio = _width / res.width
                        var _yRatio = _height / res.height
                        that.setData({
                            bgWidth: _width,
                            bgHeight: _width * res.height / res.width,
                            xRatio: _xRatio,
                            yRatio: _yRatio,
                            bgOrignWidth: res.width,
                            bgOrignHeight: res.height
                        })
                    }
                })
            }
        })

        var that = this 
        setTimeout(function(){
            that.setData({
                isTouchLock:true
            })
        },3000)



        context = wx.createCanvasContext(canvasID,this)

        context.setStrokeStyle(this.data.lineColor)
        // context.setLineWidth(5)
        // context.rect(0, 0, 200, 200)
        // context.stroke()
        // context.setStrokeStyle("#ff0000")
        context.setLineWidth(2)

        
        // context.moveTo(160, 100)
        // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        // context.moveTo(140, 100)
        // context.arc(100, 100, 40, 0, Math.PI, false)
        // context.moveTo(85, 80)
        // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        // context.moveTo(125, 80)
        // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        // context.stroke()
        // context.draw()

    },

  /**
   * 组件的方法列表
   */
    methods: {
        
        

        _changeColor(newVal, oldVal) {
            if (newVal) {
                // context.setStrokeStyle(newVal)
                this.setData({ lineColor: newVal})
                this.updateLine()
            }
        },


        // 改变
        _changeLandmark(newVal, oldVal) {
            console.log(newVal, oldVal) 

            console.log(newVal)
            if (newVal.hasOwnProperty("head")){
                //按顺序做列表
                var _orderList = ["head", "neck", "left_shoulder", "left_elbow", "left_hand", "right_shoulder", "right_elbow", "right_hand", "left_buttocks", "left_knee", "left_foot","right_buttocks", "right_knee", "right_foot"]
                var _width = 10
                var _height =10
                for (var i = 0; i < _orderList.length; i++){
                    var _obj = newVal[_orderList[i]]
                    _obj.id = i
                    _obj.width = _width
                    _obj.height = _height
                    _obj.x = (this.data.bodyRectangle.left + _obj.x) * this.data.xRatio - _width / 2
                    _obj.y = (this.data.bodyRectangle.top + _obj.y) * this.data.yRatio - _height / 2
                    newVal[_orderList[i]] = _obj
                }
                //胯部中央点
                var _half = {
                    id:14,
                    x: (newVal[_orderList[11]].x + newVal[_orderList[8]].x ) /2,
                    y: (newVal[_orderList[11]].y + newVal[_orderList[8]].y) / 2,
                    width: 10,
                    height: 10,
                }
                newVal["half"] = _half
                this.setData({
                    landmark: newVal
                })
                this.updateLine()
            }
        },

        _changeMove(newVal, oldVal){
            if (newVal) {
                var key = newVal["key"]
                var offsetX = newVal["x"]
                var offsetY = newVal["y"]
                var _landmark = this.data.landmark
                _landmark[key].x = _landmark[key].x + offsetX
                _landmark[key].y = _landmark[key].y + offsetY
                this.setData({
                    landmark: _landmark
                })
                // GP.setData
                this.updateLine()
            }
        },


        /**
         * return: 点击列表的index
         */
        clickLeft(e) {
            // this.setData({
            //     initindex: e.currentTarget.dataset.index
            // })
            console.log(123)
            this.triggerEvent('clickLeft');
        },

        //触摸事件
        touch(e) {
            if (this.data.isTouchLock){
                var key = e.currentTarget.dataset.key
                var _landmark = this.data.landmark
                _landmark[key].x = e.detail.x
                _landmark[key].y = e.detail.y
                // this.setData({
                //     landmark: _landmark
                // })
                // this.setData({
                //     landmark: _landmark
                // })

                if (tempKey != key) {
                    tempKey = key
                    // this.triggerEvent('currentKey', key);
                    // console.log(e.currentTarget.dataset.index)
                    this.triggerEvent('currentIndex', e.currentTarget.dataset.index);
                    
                }
                this.updateLine()
            }
        },


        //1 head	Object	头部
        //2 neck	Object	脖子
        //3 left_shoulder	Object	左肩
        //4 left_elbow	Object	左肘
        //5 left_hand	Object	左手
        //6 right_shoulder	Object	右肩
        //7 right_elbow	Object	右肘
        //8 right_hand	Object	右手
        //9 left_buttocks	Object	左臀
        //10 left_knee	Object	左膝
        //11 left_foot	Object	左脚
        //12 right_buttocks	Object	右臀
        //13 right_knee	Object	右膝
        //14 right_foot	Object	右脚
        updateLine(){
            var key = this.data.landmark
            console.log(key)
            this.drawLine(key["head"], key["neck"])
            this.drawLine(key["neck"], key["left_shoulder"])
            this.drawLine(key["neck"], key["right_shoulder"])

            this.drawLine(key["left_shoulder"], key["left_elbow"])
            this.drawLine(key["left_elbow"], key["left_hand"])

            this.drawLine(key["right_shoulder"], key["right_elbow"])
            this.drawLine(key["right_elbow"], key["right_hand"])

            this.drawLine(key["left_shoulder"], key["half"])
            this.drawLine(key["right_shoulder"], key["half"])


            this.drawLine(key["left_buttocks"], key["half"])
            this.drawLine(key["right_buttocks"], key["half"])

            this.drawLine(key["left_buttocks"], key["left_knee"])
            this.drawLine(key["left_knee"], key["left_foot"])

            this.drawLine(key["right_buttocks"], key["right_knee"])
            this.drawLine(key["right_knee"], key["right_foot"])

            context.setStrokeStyle(this.data.lineColor)
            context.stroke()
            context.draw()
        },

        drawLine(point1,point2){
            context.moveTo(
                this.getCenterPos(point1).x,
                this.getCenterPos(point1).y
            )
            context.lineTo(
                this.getCenterPos(point2).x,
                this.getCenterPos(point2).y
            )
        },

        getCenterPos(point) {
            var center_x = point.x + point.width / 2
            var center_y = point.y + point.height / 2            
            return { x: center_x, y: center_y,}
        },
    }
})
