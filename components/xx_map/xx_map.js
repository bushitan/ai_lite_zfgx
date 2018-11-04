// components/xx_cover_news/xx_cover_news.js

var pointList = [
    { name: "南宁", PostalCode: 7701, Score: 520, top: 300, left: 340, },
    { name: "柳州", PostalCode: 7702, Score: 520, top: 100, left: 440, },
    { name: "桂林", PostalCode: 7703, Score: 520, top: 50, left: 540, },
    { name: "河池", PostalCode: 7704, Score: 520, top: 130, left: 300, },
    { name: "百色", PostalCode: 7705, Score: 520, top: 210, left: 180, },
    { name: "北海", PostalCode: 7706, Score: 520, top: 440, left: 440, },
    { name: "崇左", PostalCode: 7707, Score: 520, top: 340, left: 230, },
    { name: "贵港", PostalCode: 7708, Score: 520, top: 270, left: 500, },
    { name: "贺州", PostalCode: 7709, Score: 520, top: 160, left: 640, },
    { name: "来宾", PostalCode: 7710, Score: 520, top: 220, left: 440, },
    { name: "钦州", PostalCode: 7711, Score: 520, top: 370, left: 410, },
    { name: "梧州", PostalCode: 7712, Score: 520, top: 270, left: 600, },
    { name: "玉林", PostalCode: 7713, Score: 520, top: 370, left: 510, },
    { name: "防城港", PostalCode: 7714, Score: 520, top: 420, left: 300, },
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
        select: {
            type: Number,
            value: "7710",
            // observer: '_changeList',
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
        this.setData({
            select: e.currentTarget.dataset.postal_code
        })
        this.triggerEvent('click',e.currentTarget.dataset.postal_code);
        // this.triggerEvent('click', e.currentTarget.dataset.point_id);
    },
  }
})
