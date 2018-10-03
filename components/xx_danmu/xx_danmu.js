// components/xx_cover_news/xx_cover_news.js

var pointList = [
    {
        id: 1, top: 10, left: 30,
    },
    {
        id: 2, top: 80, left: 230,
    },
    {
        id: 3, top: 110, left: 130,
    },
]

Component({
  /**
   * 组件的属性列表
   */
    properties: {        
        // 改变颜色
        list: {
            type: Array,
            // value: pointList,
            value: [
                { name: "1", content: "123", z: 1, logo: "../../images/logo.jpg" },
                { name: "2", content: "abc", z: 1, logo: "../../images/point.png" },
            ],
            observer: '_changeList',
        },
      
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_SCROLL: "scroll",
        MODE_MENU: "menu",
        // pop1: { top: 10, left: 20 },
        pop1: { top: 50, left: 20, name: "1", content: "123", z: 1, logo: "../../images/logo.jpg" },
        pop2: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        pop3: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        pop4: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        pop5: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        pop6: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        pop7: { top: 50, left: 30, name: "2", content: "abc", z: 1, logo: "../../images/logo.jpg" },
        index:0,
    },

    ready(){
        var self = this
        var interval = setInterval(
            function () {
                // for (var i=0;i<self.data.list.length;i++){
                    var obj = self.data.list[self.data.index % self.data.list.length]
                    self.newPop(obj.logo, obj.name, obj.content)
                // }
            }
            , 1000);    

    },
    detached(){

    },
  /**
   * 组件的方法列表
   */
    methods: {

        add(){
            // var list = [
            //     { name: "1", content: "123", z: 1, logo: "../../images/logo.jpg" },
            //     { name: "2", content: "abc", z: 1, logo: "../../images/point.png"},
            // ]

            var obj = this.data.list[this.data.index % 2]
            this.newPop(obj.logo, obj.name, obj.content)
        },

        newPop(logo,name,content){
        //定时器数组，每1秒，pop一次数组，如果有数据，则取第一条按顺序放入动画列表，
        // 放入animation 按循序放。
            this.animation = wx.createAnimation()
            this.animation = wx.createAnimation({
                timingFunction: 'fadeIn',
            })
            this.animation.opacity(1).step({ delay: 0, duration: 500 })
            this.animation.opacity(0).step({ delay: 2000, duration: 1500 })
            var index = this.data.index
            if (index % 7 == 0) {
                this.setData({ pop1: this.createPop(this.data.pop1, logo, name, content) })
                this.setData({ animation1: this.animation.export() })
            }
            else if (index % 7 == 1) {
                this.setData({ pop2: this.createPop(this.data.pop2, logo, name, content) })
                this.setData({ animation2: this.animation.export() })
            }
            else if (index % 7 == 2) {
                this.setData({ pop3: this.createPop(this.data.pop3, logo, name, content) })
                this.setData({ animation3: this.animation.export() })
            }
            else if (index % 7 == 3) {
                this.setData({ pop4: this.createPop(this.data.pop4, logo, name, content) })
                this.setData({ animation4: this.animation.export() })
            }
            else if (index % 7 == 4) {
                this.setData({ pop5: this.createPop(this.data.pop5, logo, name, content) })
                this.setData({ animation5: this.animation.export() })
            }
            else if (index % 7 == 5) {
                this.setData({ pop6: this.createPop(this.data.pop6, logo, name, content) })
                this.setData({ animation6: this.animation.export() })
            }
            else {    
                this.setData({ pop7: this.createPop(this.data.pop7, logo, name, content) })
                this.setData({ animation7: this.animation.export(), })
            }

            this.setData({
                index: index + 1,
            })
        },  

        createPop(pop,logo, name, content){
            var left = Math.random() * 310
            var top = Math.random() * 50
            var index = this.data.index
            pop.logo = logo
            pop.name = name
            pop.content = content
            pop.z = index
            pop.left = left
            pop.top = top
            return pop
        },


        /**
         * return: 点击列表的index
         */
        click(e) {
            // this.setData({
            //     initindex: e.currentTarget.dataset.index
            // })


            this.triggerEvent('click', e.currentTarget.dataset.point_id);
        },
    }
})
