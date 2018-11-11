// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {        
        // 改变颜色
        mode: {
            type: String,
            value: "",
            observer: '_changeMode',
        },
        direction: {
            type: String,
            value: "row",
        },
        image: {
            type: String,
            value: "../../images/zfgx_logo.png",
        },
        content: {
            type: String,
            value: "",
        },
        
        
  },

  /**
   * 组件的初始数据
   */
    data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
      _changeMode(newVal, oldVal) {
          if (this.data.mode == "")
            this.setData({
                mode: this.data.MODE_MENU
            })
    },

    /**
     * return: 点击列表的index
     */
    click(e) {
        this.triggerEvent('click');
    },
  }
})
