<template>
<div class="bi-2">
    <div class="bi-2-title">
        <img src="./images/bi2/logo@2x.png" alt="">
        <div class="bi-2-title-text">示范评价及验证平台</div>
    </div>
    <div class="bi-2-top">
        <div class="bi-2-page">
            <div class="triangle-left" @click="changePage(-1)"></div>
            3
            <div class="triangle-right" @click="changePage(1)"></div></div>
        <div class="bi-2-date">{{date | formatDate}}</div>
    </div>

    <div class="bi-2-main">
        <div class="bi-2-left">
            <div class="bi-2-left-item">
                <div class="bi-2-main-title">
                    <img src="./images/bi2/left@2x.png" alt="">
                    <label for="">全网车辆监控技术 VS 全网车辆登记技术情况</label>
                    <img src="./images/bi2/right@2x.png" alt="">
                </div>
                <div class="row-box">
                  <div class="box-title1">全网车辆监控技术统计</div>
                  <div class="box-container">
                    <div class="chart-box">
                      <div class="value-group-box">
                          <img src="./images/bi3/icon1.png" alt="">
                          <div class="text-area">
                            <div class="value-box">
                              <div class="title">纯氢续驶里程</div>
                              <div class="value">{{ monitData.hmile }}<label class="value-unit"> km</label></div>
                            </div>
                            <div class="value-box">
                              <div class="title">纯电续驶里程</div>
                              <div class="value">{{ monitData.emile }}<label class="value-unit"> km</label></div>
                            </div>
                          </div>
                      </div>
                      <div class="progress-bar">
                        <div class="prog-head" :style="{width: monitHPercent + '%'}">
                          氢 {{ monitHPercent }}%
                        </div>
                        <div class="prog-tail">
                          电 {{ 100 - monitHPercent }}%
                        </div>
                      </div>
                      <div class="divide-line"></div>
                      <div class="box-bottom">
                        <img src="./images/bi3/icon-star.png" alt="">
                        <span>总行驶里程 {{monitData.emile + monitData.hmile}}km</span>
                      </div>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">百公里氢耗</div>
                      <v-chart ref="meterChart" :autoresize="true" :judge-width="true" :options="barOption" class="chart-plot"/>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">燃料电池系统额定功率分布</div>
                      <v-chart ref="scatter1" :autoresize="true" :judge-width="true" :options="scatterOpt" class="chart-plot"/>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">燃料电池堆额定功率分布</div>
                      <v-chart ref="scatter2" :autoresize="true" :judge-width="true" :options="scatterOpt2" class="chart-plot"/>
                    </div>
                  </div>
                </div>
                <div class="row-box row-box-bg">
                  <div class="box-title1">全网车辆登记技术统计</div>
                  <div class="box-container">
                    <div class="chart-box">
                      <div class="value-group-box">
                          <img src="./images/bi3/icon2.png" alt="">
                          <div class="text-area">
                            <div class="value-box">
                              <div class="title">纯氢续驶里程</div>
                              <div class="value">{{ regData.hmile }}<label class="value-unit"> km</label></div>
                            </div>
                            <div class="value-box">
                              <div class="title">纯电续驶里程</div>
                              <div class="value">{{ regData.emile }}<label class="value-unit"> km</label></div>
                            </div>
                          </div>
                      </div>
                      <div class="progress-bar progress-bar-blue">
                        <div class="prog-head" :style="{width: regHPercent + '%'}">
                          氢 {{ regHPercent }}%
                        </div>
                        <div class="prog-tail">
                          电 {{ 100 - regHPercent }}%
                        </div>
                      </div>
                      <div class="divide-line"></div>
                      <div class="box-bottom">
                        <img src="./images/bi3/icon-star.png" alt="">
                        <span>总行驶里程 {{regData.emile + regData.hmile}}km</span>
                      </div>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">百公里氢耗</div>
                      <v-chart ref="meterChart2" :autoresize="true" :judge-width="true" :options="barOption2" class="chart-plot"/>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">燃料电池系统额定功率分布</div>
                      <v-chart ref="scatter3" :autoresize="true" :judge-width="true" :options="scatterOpt3" class="chart-plot"/>
                    </div>
                    <div class="chart-box">
                      <div class="chart-title">燃料电池堆额定功率分布</div>
                      <v-chart ref="scatter4" :autoresize="true" :judge-width="true" :options="scatterOpt4" class="chart-plot"/>
                    </div>
                  </div>
                  <div class="box-container box-container-bg">
                    <div class="chart-box chart-box-bg">
                      <div class="chart-title">燃料电池系统质量密度分布</div>
                      <v-chart ref="scatter5" :autoresize="true" :judge-width="true" :options="scatterOptBg" class="chart-plot"/>
                    </div>
                    <div class="chart-box chart-box-bg">
                      <div class="chart-title">燃料电池堆体积功率密度分布</div>
                      <v-chart ref="scatter6" :autoresize="true" :judge-width="true" :options="scatterOptBg2" class="chart-plot"/>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
    import MapLoader from '@/assets/js/AMap.js'
    import {formatTimeToStr} from '@/assets/js/date.js';
    import { deepClone } from '@/utils/index';
    import { barOption, scatterOpt, scatterOptBg } from './chartOptions/third.js'

    /** 引入http **/
    import http from '@/http/http';
    import $ from 'jquery'

    const barOption2 = deepClone(barOption)
    barOption2.series[0].itemStyle = {
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
                    offset: 1, color: '#44C68E' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            },
            barBorderRadius: [0,6,6,0]
        }
    }

    const scatterOpt2 = deepClone(scatterOpt)
    const scatterOpt3 = deepClone(scatterOpt)
    const scatterOpt4 = deepClone(scatterOpt)

    const scatterOptBg2 = deepClone(scatterOptBg);
    scatterOptBg2.series[0].itemStyle.color = '#A876E9';
    scatterOptBg2.xAxis.name = '(L)'

    export default {
    data() {
        return {
            mydata: {},
            color_green: '#8EDB48',
            color_blue: '#00BCFD',
            color_yellow: '#FCC224',
            date: new Date(),
            monitData: { // 监控技术统计数据
              hmile: 1, // 氢里程数
              emile: 1  // 纯电里程数
            },
            regData: {  // 登记技术统计数据
              hmile: 1, // 氢里程数
              emile: 1  // 纯电里程数
            },
            barOption: barOption,
            barOption2: barOption2,
            scatterOpt: scatterOpt,
            scatterOpt2: scatterOpt2,
            scatterOpt3: scatterOpt3,
            scatterOpt4: scatterOpt4,
            scatterOptBg: scatterOptBg,
            scatterOptBg2: scatterOptBg2
        };
    },
    beforeMount(){
        $('html').addClass('rem-pix'); // 定制本页面的rem
        console.log('add rem pix')
    },
    mounted() {
        let that = this
        this.timer = setInterval(() => {
          that.date = new Date()
        }, 1000) //设置时间定时器
        this.pullData()
        this.dataTimer = setInterval(this.pullData, 10000) //设置时间定时器,每10秒刷新数据

        // 屏幕大小发生变化，调整echarts字体大小
        $(window).resize(function(){
            that.resizeCharts();
        });
        this.resizeCharts()
    },
    methods: {
        // 翻页，-1前一页，1后一页
        changePage(step){
            if(step>0){
              this.$router.push('/views/fourth')
            }else{
              this.$router.push('/views/second')
              $('html').removeClass('rem-pix'); // 删除页面全局定制样式
            }
        },
        // 从后台获取数据
        pullData(){
          http.get(location.protocol + '//' + location.host + '/devBi/db/third.json',{}).then(res=>{

            /** 监控技术统计start **/
            var monitData = res.monitData;
            // 文本显示
            this.monitData.hmile = monitData.HMileage;
            this.monitData.emile = monitData.EMileage;
            // 百公里里氢耗
            this.barOption.yAxis[0].data = monitData.barChart.models;
            this.barOption.series[0].data = monitData.barChart.values;
            // 燃料电池系统额定功率分布
            this.scatterOpt.legend.data = monitData.scatterChart1.models;
            for(var i in monitData.scatterChart1.models){
              if(this.scatterOpt.series[i]){
                //取出当前车型数据，计算散点大小
                var vs = monitData.scatterChart1.values[i];
                let min = 0, max = 0, maxRadius = 20;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.scatterOpt.series[i].name = monitData.scatterChart1.models[i];
                this.scatterOpt.series[i].data = vs;
                this.scatterOpt.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }
            // 燃料电池堆额定功率分布
            this.scatterOpt2.legend.data = monitData.scatterChart2.models;
            for(var i in monitData.scatterChart2.models){
              if(this.scatterOpt2.series[i]){
                //取出当前车型数据，计算散点大小
                var vs = monitData.scatterChart2.values[i];
                let min = 0, max = 0, maxRadius = 20;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.scatterOpt2.series[i].name = monitData.scatterChart2.models[i];
                this.scatterOpt2.series[i].data = vs;
                this.scatterOpt2.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }

            /** 登记技术统计start **/
            var regData = res.regData;
            // 文本显示
            this.regData.hmile = regData.HMileage;
            this.regData.emile = regData.EMileage;
            // 百公里里氢耗
            this.barOption2.yAxis[0].data = regData.barChart.models;
            this.barOption2.series[0].data = regData.barChart.values;
            // 燃料电池系统额定功率分布
            this.scatterOpt3.legend.data = regData.scatterChart1.models;
            for(var i in regData.scatterChart1.models){
              if(this.scatterOpt3.series[i]){
                //取出当前车型数据，计算散点大小
                var vs = regData.scatterChart1.values[i];
                let min = 0, max = 0, maxRadius = 20;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.scatterOpt3.series[i].name = regData.scatterChart1.models[i];
                this.scatterOpt3.series[i].data = vs;
                this.scatterOpt3.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }
            // 燃料电池堆额定功率分布
            this.scatterOpt4.legend.data = regData.scatterChart2.models;
            for(var i in regData.scatterChart2.models){
              if(this.scatterOpt4.series[i]){
                //取出当前车型数据，计算散点大小
                var vs = regData.scatterChart2.values[i];
                let min = 0, max = 0, maxRadius = 20;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.scatterOpt4.series[i].name = regData.scatterChart2.models[i];
                this.scatterOpt4.series[i].data = vs;
                this.scatterOpt4.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }
            //质量功率密度分布
            this.scatterOptBg.series[0].data = regData.massPowerDist;
            //体积功率密度分布
            this.scatterOptBg2.series[0].data = regData.volumePowerDist;
          }).catch(err=>{
            console.log(err)
          })
        },
        // 调整echarts内部的字体，根据屏幕大小
        resizeCharts(){
          this.barOption.updateFont();
          this.barOption2.updateFont();
          this.scatterOpt.updateFont();
          this.scatterOpt2.updateFont();
          this.scatterOpt3.updateFont();
          this.scatterOpt4.updateFont();
          this.scatterOptBg.updateFont();
          this.scatterOptBg2.updateFont();
        }
    },
    computed: {
      monitHPercent: function(){
        return parseInt(this.monitData.hmile / (this.monitData.hmile+this.monitData.emile)*100);
      },
      regHPercent: function(){
        return parseInt(this.regData.hmile / (this.regData.hmile+this.regData.emile)*100);
      }
    },
    filters: {
        formatDate: function(time) {  //时间过滤器，用于格式化时间
            if(time!=null&&time!="")
            {
                var date = new Date(time);
                return formatTimeToStr(date, "yyyy/MM/dd hh:mm");
            }else{
                return "";
            }
        }
    },
    beforeDestroy() {
        if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
        }
        if (this.dataTimer) {
          clearInterval(this.dataTimer); // 在Vue实例销毁前，清除定时器
        }
    }
  };
</script>
<style>
  html, body, #app{
    width: 100%;
    height: 100%;
  }
  html.rem-pix{
    font-size: 1px!important;
  }
  @media screen and (min-width: 1367px) {
      html.rem-pix {
          font-size: 1.25px!important;
      }
  }
</style>
<style lang="scss" scoped>
    html, body{
      font-size: 1px;
    }
      .bi-2{
          background-image: url(./images/bi2/bg@2x.png);
          background-size: 100% 100%;
          width: 100%;
          height: 100%;
          overflow: hidden;
      }
      .bi-2-title{
          height: 4.6875vh;
          display: flex;
          justify-content: center;
          align-items:flex-end;
      }
      .bi-2-title img{
          width: 3.125vh;
          height: 3.125vh;
          margin-right: 1.5625vh;
      }
      .bi-2-title-text{
          width: 25.130261266vh;
          height: 2.734389791vh;
          font-size: 2.734389791vh;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(0,99,207,1);
          line-height: 2.134389791vh;
      }

      .bi-2-top{
          margin-top: -4.6875vh;
          /*font-size: 13rem;*/
          font-size: 1.692708vh;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(12,128,255,1);
          line-height: 4.6875vh;
          height: 4.6875vh;
      }

      .bi-2-page{
          display: inline-flex;
          align-items: center;
          margin-left: 1.5em;
          float: left;
      }

      .triangle-left {
          display:inline-block;
          width:0;
          height:0;
          border-top: 6px solid transparent;
          border-right: 10px solid #0D77F9;
          border-bottom: 6px solid transparent;
          margin-right: 1vw;
          &:hover{
            cursor: pointer;
          }
      }

      .triangle-right {
          display:inline-block;
          width:0;
          height:0;
          border-top: 6px solid transparent;
          border-left: 10px solid #0D77F9;
          border-bottom: 6px solid transparent;
          margin-left: 1vw;
          &:hover{
            cursor: pointer;
          }
      }

      .bi-2-date{
          float: right;
          margin-right: 1.5em;
          height: 100%;
      }

      .bi-2-main-title{
          height: 4.6875vh;
          display: flex;
          align-items: center;
          position: relative;
      }
      .bi-2-main-title img{
          width: 7.552vh;
          height: 2.0833vh;
      }
      .bi-2-main-title label{
          font-size: 18rem;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(0,106,233,1);
          line-height:5.85938vh;
          margin-left: 0.7320644vw;
          margin-right: 0.7320644vw;
      }
      .bi-2-left{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content:space-between;
      }
      .bi-2-left-item{
          background-color: rgba(247,252,255,1);
          border-radius: 4px;
          padding: 0.78125vh;
      }
    .bi-2-main{
        height: 51.68375vh;
        margin-left: 0.87848%;
        margin-right: 0.87848%;
        margin-top: 2.6vh;
        display: flex;
        justify-content: space-between;
        .row-box{
            width: 100%;
            height: 27.8645833333vh;
            margin-bottom: 0.78125vh;
            background:rgba(255,255,255,1);
            border:1px solid rgba(198,223,255,1);
            border-radius: 4px;
            box-sizing: border-box;
            .box-title1{
              font-size: 14rem;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(57,152,255,1);
              margin: 0 0.7em;
              display: flex;
              align-items: center;
              height: 4.3vh;
            }
            .box-container{
              width: 100%;
              height: 22.65625vh;
              padding: 0 3px;
              box-sizing: border-box;
              display: flex;
              justify-content: space-around;
              .chart-box{
                width: calc(25% - 10px);
                height: 100%;
                background:white;
                border:1px solid rgba(205,231,255,1);
                border-radius:2px;
                padding: 1.1vh 1.30208333vh;
                box-sizing: border-box;
                &:hover{
                  background:rgba(249,249,249,1);
                }

                .chart-title{
                  font-size: 12rem;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color:rgba(13,129,255,1);
                }
                .chart-plot{
                  width: 100%;
                  height: calc(100% - 15px);
                }
                .divide-line{
                  background:rgba(198,223,255,1);
                  height: 1px;
                  width: 22.6939vw;
                  margin-left: -0.30208333vw;
                  margin-top: 1.5vh;
                }
                .box-bottom{
                  height: 5.8vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size:14rem;
                  font-family:PingFang SC;
                  font-weight:bold;
                  color:rgba(96,165,255,1);
                  img{
                    width: 2.86458vh;
                    height: 2.86458vh;
                    margin-right: 1.2vh;
                  }
                }
              }
            }
        }
        .row-box-bg{
          height: 56.5104166vh;
          margin-bottom: 0;
          .box-container-bg{
            height: 27.34375vh;
            margin-top: 1.171875vh;
            .chart-box-bg{
              width: calc(50% - 10px);
              height: 100%;
            }
          }
        }
    }

    /* icon - 文字组合 */
    .value-group-box{
      display: flex;
      align-items: center;
      width: 100%;
      height: 43%;
      img{
        width: 6.25vh;
        height: 6.25vh;
        margin-top: 1.63229vh;
        margin-left: 0.9177vw;
        margin-right: 1.5373vw;
      }
      .text-area{
        display: flex;
        flex: 1;
        justify-content: space-around;
        margin-top: 1.63229vh;
        .value-box{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-family:PingFang SC;
            font-weight:bold;

            .title, .value-unit{
              font-size:14rem;
              color:rgba(96,165,255,1);
            }
            .value{
              font-size:18rem;
              color:rgba(4,124,255,1);
              margin-top: 1.8vh;
            }
        }
      }
    }
    .progress-bar{
        height: 3.3854vh;
        width: 100%;
        overflow: hidden;
        background:rgba(206,168,248,1);
        border-radius: 1.6927vh;
        display: flex;
        font-size: 14rem;
        font-weight: 400;
        color:rgba(255,255,255,1);
        margin-top: 1.953125vh;

        .prog-head{
          width: 40%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prog-tail{
          flex: 1;
          background:rgba(168,118,233,1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.progress-bar-blue{
          background:rgba(98,174,255,1);
          .prog-head{
            width: 30%;
          }
          .prog-tail{
            background:rgba(70,146,228,1);
          }
        }
    }
</style>
