// components/xx_cover_news/xx_cover_news.js

var pointList = [
    {
        name:"百色", id: 1, top: 210, left: 180,
    },
    {
        name: "崇左", id: 2, top: 340, left: 230,
    },
    {
        name: "河池", id: 3, top: 130, left: 300,
    },
    {
        name: "南宁 | 会展中心", id: 4, top: 300, left: 340,
    },
    {
        name: "防城港", id: 5, top: 420, left: 300,
    },
    {
        name: "柳州", id: 6, top: 100, left: 440,
    },
    {
        name: "来宾", id: 7, top: 220, left: 440,
    },
    {
        name: "贵港", id: 8, top: 270, left: 500,
    },
    {
        name: "钦州 | 三娘湾", id: 9, top: 370, left: 410,
    },
    {
        name: "北海", id: 10, top: 440, left: 440,
    },
    {
        name: "玉林", id: 11, top: 370, left: 510,
    },
    {
        name: "桂林", id: 12, top: 50, left: 540,
    },
    {
        name: "贺州", id: 13, top: 160, left: 640,
    },
    {
        name: "梧州", id: 14, top: 270, left: 600,
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
            value: pointList,
            observer: '_changeList',
        },
      
  },

  /**
   * 组件的初始数据
   */
    data: {
        MODE_SCROLL: "scroll",
        MODE_MENU: "menu",
    },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * return: 点击列表的index
     */
    click(e) {
        // this.setData({
        //     initindex: e.currentTarget.dataset.index
        // })

        
        this.triggerEvent('click', pointList[e.currentTarget.dataset.index]);
        // this.triggerEvent('click', e.currentTarget.dataset.point_id);
    },
  }
})
