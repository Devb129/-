import * as echarts from '../../ec-canvas/echarts';
function setOption(chart, xdata, ydata) {
  const option = {
    title: {
      text: '本月餐费支出趋势',
      padding: [10, 0, 0, 20],
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: false,
    grid: {
      show: false
    },
    xAxis: {
      type: 'category',
      data: xdata, //x轴上的数据是动态的，所以我作为参数传进来            
      axisLabel: {
        interval: 5, //x轴间隔多少显示刻度                
        formatter: function(value) { //显示时间                    
          var date = new Date(value * 1000);
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
          return h + m
        },
        fontSize: 8
      }
    },
    yAxis: {
      x: 'center',
      scale: true,
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          var val = value / 1000000000 + 'G';
          return val
        }
      }
    },
    series: [{
      type: 'line',
      data: ydata, //y轴上的数据也是动态的，也作为参数传进来            
      symbol: 'none',
      lineStyle: {
        width: 1
      }
    }]
  };
  chart.setOption(option)
}
Page({
    data: {
      ecOne: {
        lazyLoad: true
      },
      timer: '' //因为我要实时刷新，所以设置了个定时器    
    },
    onLoad: function(options) {
      var _this = this;
      this.getOneOption();
      this.setData({ //每隔一分钟刷新一次            
        timer: setInterval(function() {
          _this.getOneOption();
        }, 60000)
      })
    },
    onReady: function() { //这一步是一定要注意的        
      this.oneComponent = this.selectComponent('#mychart-one');
    },
    onUnload: function() {
      clearInterval(this.data.timer)
    },
    init_one: function(xdata, ydata) { //初始化第一个图表
      this.oneComponent.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        setOption(chart, xdata, ydata)
        this.chart = chart;
        return chart;
      });
    },
    getOneOption: function() { //这一步其实就要给图表加上数据        
      var _this = this;
      wx.request({
        url: '127.0.0.1/chart.php', //你请求数据的接口地址            
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        data: { //传的参数，这些都不用多说了吧               
          xdata:orderdate,
          ydata:bill
        },
        success: function(res) { //我这里就假设res.xdata和res.ydata是我们需要的数据，即在x轴和y轴展示的数据，记住一定是数组哦！               
          _this.init_one(res.xdata, res.ydata)
        }
      })
    }
}
)