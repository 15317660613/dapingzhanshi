import $ from 'jquery'
import { deepClone } from '@/utils/index';

const splitLineColor = 'rgba(102,102,102,0.1)'  //图表背景网格线的颜色
const axisLabelColor = 'rgba(102,102,102,1)'    //刻度文字的颜色
const textColor = '#666666';

const textStyle = {
  fontSize: 10
}

function resizeFontSize(){
  if($(window).width()>1366){
    return textStyle.fontSize = 12
  }else{
    return textStyle.fontSize = 10
  }
}

export const perfOpt = { // 电堆性能衰减图
  updateFont: function(){
    var fs = resizeFontSize()
    this.grid = {
        left: 2.6*fs,
        right: 1.2*fs,
        top: 2.3*fs,
        bottom: 3.1*fs
    }
    this.xAxis[0].nameGap = 2 * fs
  },
  color: ['#008AFF', '#FF8400', '#0093BD', '#00A04B'],
  textStyle: textStyle,
  legend: {
    textStyle: {
      color: textColor
    },
    padding: [5, 0],
    right: 5,
    itemGap: 3,
    itemWidth: 12,
    itemHeight: 8
  },
  grid: {
      left: 26,
      right: 12,
      top: 23,
      bottom: 31
  },
  xAxis: [
      {
          type: 'value',
          min: 0,
          name: '电流密度(A/cm)',
          nameGap: 20,
          nameLocation: 'center',
          nameTextStyle: {
            align: 'center',
            color: axisLabelColor
          },
          axisTick: {
              alignWithLabel: true
          },
          axisLabel: {
              show: true,
              textStyle: {
              color: axisLabelColor
              }
          },
          axisLine:{
              lineStyle:{color:splitLineColor}
          },
          axisTick:{
              show:false
          },
          splitLine:{
              show:false
          }
      }
  ],
  yAxis: [
      {
          type: 'value',
          splitNumber : 5,
          name: '电压(V)',
          nameGap: 10,
          nameTextStyle: {
            align: 'right',
            padding: [0,-10,0,0],
            color: axisLabelColor
          },
          axisLabel: {
              show: true,
              textStyle: {
              color: axisLabelColor
              }
          },
          axisLine:{
              lineStyle:{color:splitLineColor}
          },
          splitLine:{
              show:true,
              lineStyle:{
                  color: splitLineColor
              }
          }
      }
  ],
  series: [
      {
        type: 'line',
        name: '0',
        symbol: 'circle',
        data: []
      },
      {
        type: 'line',
        name: '500',
        symbol: 'circle',
        data: []
      },
      {
        type: 'line',
        name: '1000',
        symbol: 'circle',
        data: []
      },
      {
        type: 'line',
        name: '1500',
        symbol: 'circle',
        data: []
      }
  ]
}

export const voltOpt = { // 电堆电压衰减图
  updateFont: function(){
    var fs = resizeFontSize()
    this.grid = {
        left: 3.2*fs,
        right: fs,
        top: 2.3*fs,
        bottom: 3.1*fs
    }
    this.xAxis[0].nameGap = 2 * fs
  },
  textStyle: textStyle,
  color: ['#007EFF', '#FF3C00'],
  grid: {
      left: 32,
      right: 10,
      top: 23,
      bottom: 31
  },
  xAxis: [
      {
          type: 'value',
          min: 0,
          name: '时间(h)',
          nameGap: 20,
          nameLocation: 'center',
          nameTextStyle: {
            align: 'center',
            color: axisLabelColor
          },
          axisTick: {
              alignWithLabel: true
          },
          axisLabel: {
              show: true,
              textStyle: {
              color: axisLabelColor
              }
          },
          axisLine:{
              lineStyle:{color:splitLineColor}
          },
          axisTick:{
              show:false
          },
          splitLine:{
              show:false
          }
      }
  ],
  yAxis: [
      {
          type: 'value',
          min: 0.4,
          interval: 0.05,
          splitNumber : 5,
          name: '电压(V)',
          nameGap: 10,
          nameTextStyle: {
            align: 'right',
            padding: [0,-5,0,0],
            color: axisLabelColor
          },
          axisLabel: {
              show: true,
              textStyle: {
              color: axisLabelColor
              },
              formatter: function (value, index) {
                return value.toFixed(2);
              }
          },
          axisLine:{
              lineStyle:{color:splitLineColor}
          },
          splitLine:{
              show:true,
              lineStyle:{
                  color: splitLineColor
              }
          }
      }
  ],
  series: [
      {
        type: 'line',
        name: '数据线',
        symbol: 'circle',
        smooth: true,
        // smoothMonotone: 'x',
        data: []
      },
      {
        type: 'line',
        name: '趋势线',
        symbol: 'none',
        lineStyle: {
          type: 'dotted'
        },
        data: []
      }
  ]
}

export const powerOpt = { // 功率分布饼图
    updateFont: function(){
      var fs = resizeFontSize()
      this.series[0].label.rich.s1.fontSize = fs;
      this.series[0].label.rich.s2.fontSize = fs;
    },
    textStyle: textStyle,
    color: ['#F4A16F', '#8BB9FF', '#50B7CD', '#4D7ABD', '#F46F6F'],
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    series: [
        {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            label: {
              formatter: '{s1|{b}} {s2|{d}%}',
              rich: {
                s1: {
                  color: textColor
                },
                s2:{
                  color: 'rgba(0,106,233,1)'
                }
              },
              position: 'outer',
              alignTo: 'edge',
              margin: 0
            },
            labelLine: {
              length2: '5%'
            },
            data: []
        }
    ]
}

export const faultOpt = { // 故障分布饼图
    updateFont: function(){
      var fs = resizeFontSize()
      this.series[0].label.rich.s1.fontSize = fs;
      this.series[0].label.rich.s2.fontSize = fs;
    },
    textStyle: textStyle,
    color: ['#A8CBFF', '#8BB9FF', '#5D89CC', '#4D7ABD', '#CFE2FF'],
    grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    series: [
        {
            type: 'pie',
            radius: '65%',
            center: ['50%', '53%'],
            label: {
              formatter: '{s1|{b}} {s2|{d}%}',
              rich: {
                s1: {
                  color: textColor,
                  fontSize: 10
                },
                s2:{
                  color: 'rgba(0,106,233,1)',
                  fontSize: 10
                }
              },
              position: 'outer',
              alignTo: 'edge',
              margin: 0
            },
            labelLine: {
              length2: '5%'
            },
            data: []
        }
    ]
}

var data = [
    [[1,77,40],[2,77.4,10],[3,68,13],[4,74.7,2],[5,75,65],[6,77.1,13],[7,75.4,12],[8,78.1,2],[9,57.7,5]],
    [[10,81.8,5],[11.4,81.7,5],[13.4,76.9,5],[14.7,78.5,5],[15,80.8,15],[16.5,81.9,5],[17.8,81.1,5],[18,82.8,17],[19,66.8,2]],
    [[20,81.8,5],[21.4,81.7,5],[23.4,76.9,5],[24.7,78.5,5],[25,80.8,15],[26.5,81.9,5],[27.8,81.1,5],[28,82.8,17],[29,66.8,12]]
];

export const scatterOpt =  {
    updateFont: function(){
      var fs = resizeFontSize()
      this.textStyle = textStyle;
      this.grid = {
          left: 3.2*fs,
          right: 1.2*fs,
          top: 1.8*fs,
          bottom: 2.1*fs
      }
      if(fs>10){
        this.legend.bottom = -2
      }else{
        this.legend.bottom = -5
      }
    },
    textStyle: textStyle,
    legend: {
        itemWidth: 0,
        itemHeight: 0,
        left: 'center',
        bottom: -5,
        data: ['车型1', '车型2', '车型3']
    },
    grid: {
        left: 32,
        right: 12,
        top: 18,
        bottom: 21
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        return '数值：' + params.data[2];
      }
    },
    xAxis: {
        axisLabel:{ show: false },
        splitLine: {
            lineStyle: { color: splitLineColor }
        },
        axisLine: {
            lineStyle: { color: splitLineColor }
        }
    },
    yAxis: {
        type: 'value',
        name: '%',
        nameGap: 3,
        nameTextStyle: {
          align: 'right',
          padding: [0,8,3,0],
          color: axisLabelColor
        },
        min: 20,
        interval: 20,
        axisLabel:{
          interval: 0,
          color: axisLabelColor,
          padding: [2,0,0,0]
        },
        splitLine: {
            lineStyle: { color: splitLineColor }
        },
        axisLine: {
            lineStyle: { color: splitLineColor }
        },
        scale: true
    },
    series: [{
        name: '车型1',
        data: data[0],
        type: 'scatter',
        symbolSize: (value, params) => {
          return 10;
        },
        emphasis: {
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.13)',
            shadowOffsetY: 5,
            color: {
                type: 'radial',
                x: 0.4,
                y: 0.3,
                r: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(251, 118, 123)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(204, 46, 72)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }
        }
    }, {
        name: '车型2',
        data: data[1],
        type: 'scatter',
        // symbolSize: function (data) {
        //     return Math.sqrt(data[2]) / 5e2;
        // },
        emphasis: {
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.13)',
            shadowOffsetY: 5,
            color: {
                type: 'radial',
                x: 0.4,
                y: 0.3,
                r: 1,
                colorStops: [{
                    offset: 0, color: 'rgb(129, 227, 238)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgb(25, 183, 207)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }
        }
    },
    {
        name: '车型3',
        data: data[2],
        type: 'scatter',
        // symbolSize: function (data) {
        //     return Math.sqrt(data[2]) / 5e2;
        // },
        emphasis: {
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.13)',
            shadowOffsetY: 5,
            color: {
                type: 'radial',
                x: 0.4,
                y: 0.3,
                r: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(68,198,142,0.55)' // 0% 处的颜色
                }, {
                    offset: 1, color: 'rgba(68,198,142,0.85)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }
        }
    }]
};

export const utilizeOpt = deepClone(scatterOpt);
