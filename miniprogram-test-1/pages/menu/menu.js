// pages/menu/menu.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperTitle: [{
      text: "学生食堂",
      id: 1
    }, {
      text: "教工食堂",
      id: 2
    }, {
      text: "面包房",
      id: 3
    }],
    menu: [],
    currentPage: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false
  },
  pullBar: function() {
    this.setData({
      pullBar: !this.data.pullBar
    })
  },

  pay() {

    let meal = [];
    let that = this;
    let menu = this.data.menu
    for (var i = 0; i < 3; i++) {
      if (menu[i].menucontent1.numb != 0) {
        meal.push(menu[i].menucontent1.name)
      }
    }
    console.log(that.data.date)
    wx.request({
      url: 'http://127.0.0.1/xieru.php',
      method: 'POST',
      data: {
        id: wx.getStorageSync('userInfo').nickName,
        bill: that.data.cost,
        meal:meal,
        orderdate: that.data.date,
      },
      success: () => {
        wx.redirectTo({
          url: '/pages/bill/bill',
        })
      }
    })

  },
  addToTrolley: function(e) {
    var info = this.data.menu;
    var info1 = this.data.menu1;
    var info2 = this.data.menu2; 
      if (this.data.currentPage== 0) {
        if (e.target.dataset.index==1){
       info[this.data.selected].menucontent1.numb++;
        this.setData({
          cost: this.data.cost + this.data.menu[this.data.selected].menucontent1.price,
          menu: info,
          })
        } else if (e.target.dataset.index == 2) {
            info[this.data.selected].menucontent2.numb++;
            this.setData({
              cost: this.data.cost + this.data.menu[this.data.selected].menucontent2.price,
              menu: info,
          })
        } else {
          info[this.data.selected].menucontent3.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu[this.data.selected].menucontent3.price,
            menu: info,
          })}
      }
    
      if (this.data.currentPage== 1) {
        if (e.target.dataset.index == 1) {
          info[this.data.selected].menucontent1.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu1[this.data.selected].menucontent1.price,
            menu1: info1,
          })
        } else if (e.target.dataset.index == 2) {
          info[this.data.selected].menucontent2.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu1[this.data.selected].menucontent2.price,
            menu1: info1,
          })
        } else {
          info[this.data.selected].menucontent3.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu1[this.data.selected].menucontent3.price,
            menu1: info1,
          })
        }
       
      }

      if (this.data.currentPage== 2) {
        if (e.target.dataset.index == 1) {
          info[this.data.selected].menucontent1.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu2[this.data.selected].menucontent1.price,
            menu2: info2,
          })
        } else if (e.target.dataset.index == 2) {
          info[this.data.selected].menucontent2.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu2[this.data.selected].menucontent2.price,
            menu2: info2,
          })
        } else {
          info[this.data.selected].menucontent3.numb++;
          this.setData({
            cost: this.data.cost + this.data.menu2[this.data.selected].menucontent3.price,
            menu2: info2,
          })
        }
      }
    

  },
  removeFromTrolley: function(e) {
    var info = this.data.menu;
    var info1 = this.data.menu1;
    var info2 = this.data.menu2;
    if (this.data.currentPage == 0) {
      if (e.target.dataset.index == 1) {
        info[this.data.selected].menucontent1.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu[this.data.selected].menucontent1.price,
          menu: info,
        })
      } else if (e.target.dataset.index == 2) {
        info[this.data.selected].menucontent2.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu[this.data.selected].menucontent2.price,
          menu: info,
        })
      } else if (e.target.dataset.index == 3){
        info[this.data.selected].menucontent3.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu[this.data.selected].menucontent3.price,
          menu: info,
        })
      }
    }

    if (this.data.currentPage == 1) {
      if (e.target.dataset.index == 1) {
        info[this.data.selected].menucontent1.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu1[this.data.selected].menucontent1.price,
          menu1: info1,
        })
      } else if (e.target.dataset.index == 2) {
        info[this.data.selected].menucontent2.numb++;
        this.setData({
          cost: this.data.cost + this.data.menu1[this.data.selected].menucontent2.price,
          menu1: info1,
        })
      } else {
        info[this.data.selected].menucontent3.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu1[this.data.selected].menucontent3.price,
          menu1: info1,
        })
      }

    }

    if (this.data.currentPage == 2) {
      if (e.target.dataset.index == 1) {
        info[this.data.selected].menucontent1.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu2[this.data.selected].menucontent1.price,
          menu2: info2,
        })
      } else if (e.target.dataset.index == 2) {
        info[this.data.selected].menucontent2.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu2[this.data.selected].menucontent2.price,
          menu2: info2,
        })
      } else {
        info[this.data.selected].menucontent3.numb--;
        this.setData({
          cost: this.data.cost - this.data.menu2[this.data.selected].menucontent3.price,
          menu2: info2,
        })
      }
    }

    
  },
  turnPage: function(e) {
    this.setData({
      selected: 0,
      currentPage: e.currentTarget.dataset.index
    })
  },
  turnTitle: function(e) {
    let that = this;
    this.setData({
      selected: 0,
      currentPage: e.detail.current
    })
    if (e.detail.source == "touch") {

    }
  },
  turnMenu: function(e) {

    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5ce133def22a16752f2fb7c0/menu/#!method=get",
      method: "GET",
      success: function(res) {
        that.setData({
          menu: res.data,
        })
      }
    })

    wx.request({
      url: "https://www.easy-mock.com/mock/5cef7aceb2d91f3a12aac749/menu1/#!method=get",
      method: "GET",
      success: function(res) {
        that.setData({
          menu1: res.data,
        })
      }
    })
    wx.request({
      url: "https://www.easy-mock.com/mock/5cef7df59c2c653f52e7589d/menu2/#!method=get",
      method: "GET",
      success: function(res) {
        that.setData({
          menu2: res.data,
        })
      }
    })
    var date = new Date()
    let d = date;
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate()
    let x = [year, month, day].join('-')
    this.setData({
      date: x,
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})