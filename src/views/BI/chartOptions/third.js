import $ from 'jquery'
import { deepClone } from '@/utils/index';

const splitLineColor = 'rgba(102,102,102,0.1)'  //图表背景网格线的颜色
const axisLabelColor = 'rgba(102,102,102,1)'    //刻度文字的颜色

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

export const barOption = {
  updateFont: function(){
    var fs = resizeFontSize()
    this.textStyle = textStyle
    this.grid = {
        left: 4.6*fs,
        right: 3.2*fs,
        top: 2.3*fs,
        bottom: 2.1*fs
    }
    // 调整x轴名字位置
    if(fs>10){
      this.xAxis[0].nameTextStyle.padding[0] = 28
      this.xAxis[0].nameGap = 15
    }else{
      this.xAxis[0].nameTextStyle.padding[0] = 25
      this.xAxis[0].nameGap = 10
    }
  },
  color: ['#3398DB'],
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
  },
  grid: {
      left: 46,
      right: 32,
      top: 23,
      bottom: 21
  },
  yAxis: [
      {
          type: 'category',
          name: '车型',
          nameGap: 2,
          nameTextStyle: {
            align: 'right',
            padding: [0,10,3,0],
            color: axisLabelColor
          },
          data: ['乘用车','物流车','大巴车'],
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
              lineStyle:{color:'rgba(4,183,253,1)'}
          },
          axisTick:{
              show:false
          },
          splitLine:{
              show:true,
              lineStyle:{
                  color: splitLineColor
              }
          }
      }
  ],
  xAxis: [
      {
          type: 'value',
          splitNumber : 5,
          name: '(kg)',
          nameGap: 10,
          nameTextStyle: {
            align: 'left',
            padding: [25,0,0,0],
            color: axisLabelColor
          },
          axisLabel: {
              show: true,
              textStyle: {
              color: axisLabelColor
              }
          },
          axisLine:{
              lineStyle:{color:'rgba(4,183,253,1)'}
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
          type: 'bar',
          barWidth: '30%',
          data: [],
          label: {
              show: true,
              position: 'right',
              textStyle:{
                  color:'rgba(1,184,252,1)'
              }
          },
          itemStyle: {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: '#249EFD' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#00BAFD' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                barBorderRadius: [0,6,6,0]
            }
          }
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
      this.textStyle = textStyle
      this.grid = {
          left: 3.2*fs,
          right: 1.2*fs,
          top: 2.3*fs,
          bottom: 2.1*fs
      }
      if(fs>10){
        this.legend.bottom = -2
      }else{
        this.legend.bottom = -5
      }
    },
    legend: {
        itemWidth: 8,
        itemHeight: 8,
        left: 'center',
        bottom: -5,
        data: ['车型1', '车型2', '车型3']
    },
    grid: {
        left: 32,
        right: 12,
        top: 23,
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
        name: '(kw)',
        nameGap: 5,
        nameTextStyle: {
          align: 'right',
          padding: [0,8,3,0],
          color: axisLabelColor
        },
        min: 20,
        minInterval: 20,
        axisLabel:{ interval: 20, color: axisLabelColor },
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

var bgdata1 = [[10,77,40],[200,77.4,10],[300,68,13],[400,74.7,2],[500,75,65],[600,77.1,13],[700,75.4,12],[800,78.1,2],[900,57.7,5],
            [18,77,40],[250,77.4,10],[320,68,13],[460,74.7,2],[510,75,65],[680,77.1,13],[760,75.4,12],[810,78.1,2],[980,57.7,5]];
var bgdata2 = [[10,77,40],[200,77.4,10],[300,68,13],[400,74.7,2],[500,75,65],[600,77.1,13],[700,75.4,12],[800,78.1,2],[900,57.7,5],
            [18,77,40],[250,77.4,10],[320,68,13],[460,74.7,2],[510,75,65],[680,77.1,13],[760,75.4,12],[810,78.1,2],[980,57.7,5]];
export const scatterOptBg =  {
    updateFont: function(){
      var fs = resizeFontSize()
      this.textStyle = textStyle
      this.grid = {
          left: 3.2*fs,
          right: 3.8*fs,
          top: 2.3*fs,
          bottom: 2.1*fs
      }
      this.xAxis.nameGap = 1.5*fs;
      if(fs>10)
        this.xAxis.nameTextStyle.padding[0] = 28;
      else
        this.xAxis.nameTextStyle.padding[0] = 25;
    },
    grid: {
        left: 32,
        right: 38,
        top: 23,
        bottom: 21
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        return '数值：' + params.data[2];
      }
    },
    xAxis: {
        type: 'value',
        splitNumber : 5,
        name: '(kg)',
        nameGap: 15,
        nameTextStyle: {
          align: 'left',
          padding: [25,0,0,0],
          color: axisLabelColor
        },
        axisLabel: {
            show: true,
            textStyle: {
              color: axisLabelColor
            }
        },
        splitLine: {
            lineStyle: { color: splitLineColor }
        },
        axisLine: {
            lineStyle: { color: splitLineColor }
        }
    },
    yAxis: {
        name: '(kw)',
        nameGap: 5,
        nameTextStyle: {
          align: 'right',
          padding: [0,8,3,0],
          color: axisLabelColor
        },
        min: 0,
        minInterval: 20,
        axisLabel:{ color: axisLabelColor },
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
        data: bgdata1,
        type: 'scatter',
        symbolSize: (value, params) => {
          return 5;
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
            color: '#00A0E9'
        }
    }]
};
