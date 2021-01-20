<template>
<div class="bi-2">
    <div class="bi-2-title">
        <img src="./images/bi2/logo@2x.png" alt="">
        <div class="bi-2-title-text">示范评价及验证平台</div>
    </div>
    <div class="bi-2-top">
        <div class="bi-2-page">
            <div class="triangle-left" @click="changePage(-1)"></div>
            4
            <div class="triangle-right" @click="changePage(1)"></div></div>
        <div class="bi-2-date">{{date | formatDate}}</div>
    </div>

    <div class="bi-2-main">
        <div class="bi-2-left">
            <div class="bi-2-left-item">
                <div class="bi-2-main-title">
                    <img src="./images/bi2/left@2x.png" alt="">
                    <label for="">单类技术情况</label>
                    <img src="./images/bi2/right@2x.png" alt="">
                    <div style="position: absolute; right: 6px;top: 8%;">
                      <el-button-group>
                        <el-button class="btn-car-type" :class="{'btn-car-type-active':carType==1}" @click="changeCarType(1)">乘用车</el-button>
                        <el-button class="btn-car-type" :class="{'btn-car-type-active':carType==2}" @click="changeCarType(2)">货车</el-button>
                        <el-button class="btn-car-type" :class="{'btn-car-type-active':carType==3}" @click="changeCarType(3)">客车</el-button>
                      </el-button-group>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">基本参数</div>
                    <div class="box-container">
                      <el-table :key="'111'" :data="paramList" row-key="num" :header-cell-style="headStyle" :cell-style="cellStyle" style="border-color:rgba(198,223,255,1);" stripe border fit>
                        <!-- <el-table-column label="序号" width="55" align="center" type="index" :index="i => i+1" /> -->
                        <el-table-column label="序号" width="60" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.num }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="企业" min-width="100" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.ent }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="城市" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.city }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="车型" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.vmodel }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="零部件" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.part }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="型号" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.version }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="是否已抽检" width="110" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.check }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">节能性</div>
                    <div class="box-container">
                      <div class="chart-box grey-bg" style="width:43.82716%; flex:initial;">
                        <div class="value-group-box">
                            <div class="text-area">
                              <div class="value-box">
                                <div class="title">氢行驶里程</div>
                                <div class="value">{{energySave.HMileage}}<label class="value-unit"> km</label></div>
                              </div>
                              <div class="value-box">
                                <div class="title">电行驶里程</div>
                                <div class="value">{{energySave.EMileage}}<label class="value-unit"> km</label></div>
                              </div>
                            </div>
                        </div>
                        <div class="progress-bar">
                          <div class="prog-head" :style="{width: HPercent + '%'}">
                            {{ HPercent }}%
                          </div>
                          <div class="prog-tail">
                            {{ 100 - HPercent }}%
                          </div>
                        </div>
                        <div class="divide-line"></div>
                        <div class="box-bottom">
                          <img src="./images/bi4/icon-star.png" alt="">
                          <span>总行驶里程 {{energySave.HMileage + energySave.EMileage}} km</span>
                        </div>
                      </div>
                      <div class="chart-box chart-box-cols">
                        <div class="chart-box grey-bg">
                          <div class="value-group-box">
                              <img src="./images/bi4/icon1.png" alt="">
                              <div class="text-area">
                                <div class="value-box">
                                  <div class="title">纯氢续驶里程</div>
                                  <div class="value">{{energySave.pureHMileage}}<label class="value-unit"> km</label></div>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div class="chart-box grey-bg">
                          <div class="value-group-box">
                              <img src="./images/bi4/icon3.png" alt="">
                              <div class="text-area">
                                <div class="value-box">
                                  <div class="title">百公里电耗</div>
                                  <div class="value">{{energySave.E100km}}<label class="value-unit"> kw</label></div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div class="chart-box chart-box-cols">
                        <div class="chart-box grey-bg">
                          <div class="value-group-box">
                              <img src="./images/bi4/icon2.png" alt="">
                              <div class="text-area">
                                <div class="value-box">
                                  <div class="title">百公里氢耗</div>
                                  <div class="value">{{energySave.H100km}}<label class="value-unit"> kg</label></div>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div class="chart-box grey-bg">
                          <div class="value-group-box">
                              <img src="./images/bi4/icon4.png" alt="">
                              <div class="text-area">
                                <div class="value-box">
                                  <div class="title">氢利用率</div>
                                  <div class="value">{{energySave.HUtilizeRate}}<label class="value-unit"> %</label></div>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">耐久性</div>
                    <div class="box-container">
                      <div class="chart-box">
                        <div class="chart-title">电堆性能衰减情况</div>
                        <v-chart ref="lineChart1" :autoresize="true" :judge-width="true" :options="perfOpt" class="chart-plot"/>
                      </div>
                      <div class="chart-box">
                        <div class="chart-title">电堆电压衰减情况</div>
                        <v-chart ref="lineChart2" :autoresize="true" :judge-width="true" :options="voltOpt" class="chart-plot"/>
                      </div>
                      <div class="chart-box">
                        <div class="chart-title">电堆功率分布饼图</div>
                        <v-chart ref="pieChart" :autoresize="true" :judge-width="true" :options="powerOpt" class="chart-plot"/>
                      </div>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">安全性</div>
                    <div class="box-container">
                      <div class="chart-box chart-box-cols">
                        <div class="security-row1">
                          <div class="text-banner">
                            <img src="./images/bi4/holyicon1.png" alt="">
                            <div class="banner-title">首次故障里程数</div>
                            <div class="banner-content">{{firstFaultMileage}}<label class="value-unit"> km</label></div>
                          </div>
                          <div class="text-banner">
                            <img src="./images/bi4/holyicon2.png" alt="">
                            <div class="banner-title">平均故障里程数</div>
                            <div class="banner-content">{{averageFaultMileage}}<label class="value-unit"> km</label></div>
                          </div>
                        </div>
                        <div class="security-row2">
                          <div class="chart-box">
                            <div class="chart-title">故障分布</div>
                            <v-chart ref="pieChartFault" :autoresize="true" :judge-width="true" :options="faultOpt" class="chart-plot"/>
                          </div>
                          <div class="chart-box">
                            <div class="chart-title">氢探头数值分布</div>
                            <v-chart ref="scatterChart1" :autoresize="true" :judge-width="true" :options="hvalOpt" class="chart-plot"/>
                          </div>
                          <div class="chart-box">
                            <div class="chart-title">氢利用率分布</div>
                            <v-chart ref="scatterChart2" :autoresize="true" :judge-width="true" :options="utilizeOpt" class="chart-plot"/>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">重点关注</div>
                    <div class="box-container">
                      <el-table :key="'2'" :data="showFocusList" row-key="num" :header-cell-style="headStyle" :cell-style="cellStyle" style="border-color:rgba(198,223,255,1);" stripe border fit>
                        <!-- <el-table-column label="序号" width="55" align="center" type="index" :index="i => i+1" /> -->
                        <el-table-column label="序号" width="60" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.num }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="VIN" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.vin }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="城市" width="80" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.city }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="车牌" width="120" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.plate }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="类型" align="center">
                          <template slot-scope="{ row }">
                            <img :src="focusTypeIcons[row.type]" class="focus-type-icon" alt="">
                            <span>{{ row.typeName }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                </div>
                <div class="row-box row-box-half">
                    <div class="box-title1">最新报警</div>
                    <div class="box-container">
                      <el-table :key="'3'" :data="showAlertList" row-key="num" :header-cell-style="headStyle" :cell-style="cellStyle" style="border-color:rgba(198,223,255,1);" stripe border fit>
                        <!-- <el-table-column label="序号" width="55" align="center" type="index" :index="i => i+1" /> -->
                        <el-table-column label="序号" width="60" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.num }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="警报详情" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.detail }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="级别" width="130" align="center">
                          <template slot-scope="{ row }">
                            <el-rate
                              v-model="row.level"
                              disabled
                              disabled-void-color="transparent"
                              show-score
                              text-color="#FF9C5A">
                            </el-rate>
                          </template>
                        </el-table-column>
                        <el-table-column label="时间" width="120" align="center">
                          <template slot-scope="{ row }">
                            <span>{{ row.time }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
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
    /** 引入http **/
    import http from '@/http/http';
    import { perfOpt, voltOpt, powerOpt, faultOpt, scatterOpt, utilizeOpt } from './chartOptions/fourth.js'

    import ecStat from 'echarts-stat' // echarts的统计工具，画拟合线用的
    import $ from 'jquery'

    export default {
    data() {
        return {
            date: new Date(),
            carType: 1,
            headStyle: {
              'background-color': 'rgba(71,158,248,0.9)',
              'color': 'white',
              'font-size': '14rem',
              'padding': '0',
              'height': '3.77604vh'
            },
            //用于显示的数据
            paramList: [], //基本参数表格
            energySave: { // 节能性数据
              "HMileage": 4, //  氢行驶里程
              "EMileage": 6, //  电行驶里程
              "pureHMileage": 0,  //  纯氢续驶里程
              "H100km": 0,  //  百公里氢耗
              "E100km": 0,  //  百公里电耗
              "HUtilizeRate": 0  //  氢利用率
            },
            firstFaultMileage: 0, //  首次故障里程
            averageFaultMileage: 0, //  平均故障里程
            focusList: [],  // 重点关注列表
            alertList: [],  // 最新报警列表
            startRoll: false, // 是否滚动显示
            tableRollTick: 0, // 列表滚动计数
            focusTypeIcons: [ // 重点关注的icon数组
              null,
              require("./images/bi4/focus1.png"),
              require("./images/bi4/focus2.png"),
              require("./images/bi4/focus3.png")
            ],
            perfOpt: perfOpt, // 性能图
            voltOpt: voltOpt, // 电压图
            powerOpt: powerOpt, // 功率图
            faultOpt: faultOpt, // 故障分布图
            hvalOpt: scatterOpt,  // 散点图
            utilizeOpt: utilizeOpt  // 利用率图
        };
    },
    beforeCreate(){

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

        this.rollTimer = setInterval(() => {
          that.startRoll && that.tableRollTick++;
        },2000);

        this.carTypeTimer = setInterval(() => {
          that.changeCarType( that.carType % 3 + 1 );
        },20000);

        $(window).resize(function(){
            that.resizeCharts();
        });
        this.resizeCharts()
    },
    methods: {
        // 左上角切换页面
        changePage(step){
          if(step>0){
            this.$router.push('/views/first')
            $('html').removeClass('rem-pix'); // 删除页面全局定制样式
          }else{
            this.$router.push('/views/third')
          }
        },
        // 右上角切换车型
        changeCarType(carType){
          this.carType = carType;
          this.pullData(true);
        },
        // 表格内容样式
        cellStyle({row,rowIndex}){
          let style = 'font-size: 12rem;padding: 0;height: 3.77604vh;border-color:rgba(198,223,255,1);';
          if(rowIndex%2==1) style += 'background:rgba(236,249,255,1)';
          return style;
        },
        // 获取后端数据并渲染
        pullData(isResetRoll){
          var carType = this.carType;
          var jsonPath = '/devBi/db/fourth.json';
          if(carType == 2) jsonPath = '/devBi/db/fourth-2.json';
          if(carType == 3) jsonPath = '/devBi/db/fourth-3.json';
          http.get(location.protocol + '//' + location.host + jsonPath,{}).then(res=>{
            /** 基本参数start **/
            var basicData = res.basicParam;
            this.paramList = basicData.data;

            /** 节能性start **/
            this.energySave = res.energySaveData;

            /** 耐久数据start **/
            var resistData = res.resistData;
            // 第一个，折线图
            this.perfOpt.series[0].data = resistData.lineChart1.data[0]
            this.perfOpt.series[1].data = resistData.lineChart1.data[1]
            this.perfOpt.series[2].data = resistData.lineChart1.data[2]
            this.perfOpt.series[3].data = resistData.lineChart1.data[3]
            // 第二个，折线图
            var voltData = resistData.lineChart2.data
            this.voltOpt.series[0].data = voltData
            var regression = ecStat.regression('linear', voltData);
            this.voltOpt.series[1].data = regression.points;
            // 第三个，饼图
            this.powerOpt.series[0].data = resistData.pieChart.data

            /** 安全性数据start **/
            var securityData = res.securityData;
            this.firstFaultMileage = securityData.firstFaultMileage;
            this.averageFaultMileage = securityData.averageFaultMileage;
            // 第1个，故障分布饼图
            this.faultOpt.series[0].data = securityData.pieChart.data
            // 第2个，氢探头数值分布
            this.hvalOpt.legend.data = securityData.scatterChart1.models;
            for(var i in securityData.scatterChart1.models){
              if(this.hvalOpt.series[i]){
                //计算散点大小
                var vs = securityData.scatterChart1.values[i];
                let min = 0, max = 0, maxRadius = 14;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.hvalOpt.series[i].name = securityData.scatterChart1.models[i];
                this.hvalOpt.series[i].data = vs;
                this.hvalOpt.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }
            // 第2个，氢利用率分布
            this.utilizeOpt.legend.data = securityData.scatterChart2.models;
            for(var i in securityData.scatterChart2.models){
              if(this.utilizeOpt.series[i]){
                //计算散点大小
                var vs = securityData.scatterChart2.values[i];
                let min = 0, max = 0, maxRadius = 14;
                for(let j in vs){
                  min = vs[j][2] > min ? min : vs[j][2];
                  max = vs[j][2] < max ? max : vs[j][2];
                }
                this.utilizeOpt.series[i].name = securityData.scatterChart2.models[i];
                this.utilizeOpt.series[i].data = vs;
                this.utilizeOpt.series[i].symbolSize = (function(min,max,maxRadius){
                  return function(data){
                    if(data[2] == min) return 2;
                    return maxRadius * (data[2] - min) / (max - min);
                  }
                })(min,max,maxRadius);
              }
            }

            /** 重点关注start **/
            this.focusList = res.focusData.data;

            /** 最新报警start **/
            this.alertList = res.alertData.data;

            // 开始滚动
            this.startRoll = true;
            isResetRoll && (this.tableRollTick = 0);
          }).catch(err=>{
            console.log(err)
          })
        },
        // 根据屏幕大小调整echarts内部字体大小
        resizeCharts(){
          this.perfOpt.updateFont();
          this.voltOpt.updateFont();
          this.powerOpt.updateFont();
          this.faultOpt.updateFont();
          this.hvalOpt.updateFont();
          this.utilizeOpt.updateFont();
        }
    },
    computed: {
      // 氢占比
      HPercent(){
        return parseInt(this.energySave.HMileage / (this.energySave.HMileage + this.energySave.EMileage) * 100)
      },
      // 重点关注列表显示数据
      showFocusList: function(){
        var dataLength = this.focusList.length;
        if(dataLength <=5) return this.focusList;

        var list = [];
        var offset = this.tableRollTick % dataLength;
        for(var i=offset; i<offset+5; i++){
          let index = i % dataLength;
          list.push(this.focusList[index]);
        }
        return list;
      },
      // 警报列表显示数据
      showAlertList: function(){
        var dataLength = this.alertList.length;
        if(dataLength <=5) return this.alertList;

        var list = [];
        var offset = this.tableRollTick % dataLength;
        for(var i=offset; i<offset+5; i++){
          let index = i % dataLength;
          list.push(this.alertList[index]);
        }
        return list;
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
        if (this.rollTimer) {
          clearInterval(this.rollTimer); // 在Vue实例销毁前，清除定时器
        }
        if (this.carTypeTimer) {
          clearInterval(this.carTypeTimer); // 在Vue实例销毁前，清除定时器
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
        font-size: 1.692708vh;
        /*font-size: 13rem;*/
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
        padding-right: 0;
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
              padding: 0 6px;
              box-sizing: border-box;
              display: flex;
              justify-content: space-around;
              .chart-box{
                flex: 1;
                height: 100%;
                background:white;
                border:1px solid rgba(205,231,255,1);
                border-radius:2px;
                padding: 1.1vh 1.30208333vh;
                margin-right: 6px;
                box-sizing: border-box;
                &:hover{
                  background:rgba(249,249,249,1);
                }
                &:nth-last-child(1){
                  margin-right: 0;
                }
                &.chart-box-cols{
                  border: none;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 0;
                  .chart-box{
                    margin: 0;
                    height: calc(50% - 3px);
                    flex: initial;
                    .value-group-box{
                      height: 100%;
                      .value-box{
                        flex: 1;
                      }
                    }
                  }
                  .security-row1{
                    margin-bottom: 6px;
                    display: flex;
                    justify-content: space-between;
                    .text-banner{
                      height: 4.6875vh;
                      display: flex;
                      align-items: center;
                      flex: 1;
                      margin-right: 6px;
                      background-image: url(./images/bi4/text-banner.png);
                      background-size: 100% 100%;
                      &:last-child{
                        margin-right: 0;
                      }
                      img {
                        width: 2.86458vh;
                        margin: 0 0.9516837vw;
                      }
                      .banner-title{
                        font-size:14rem;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(57,152,255,1);
                        margin-right: 2.7086vw;
                      }
                      .banner-content{
                        font-size:18rem;
                        font-weight: bold;
                        color:rgba(4,124,255,1);
                      }
                    }
                  }
                  .security-row2{
                    height: 16.927vh;
                    display: flex;
                    justify-content: space-between;
                    .chart-box{
                      flex: 1;
                      height: 100%;
                      margin-right: 6px;
                      padding: 0.78125vh 1.30208vh;
                      &:last-child{
                        margin-right: 0;
                      }
                    }
                  }
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
                  width: 100%;
                  // margin-left: -0.30208333vw;
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
        .row-box-half{
          width: calc(50% - 8px);
          margin-bottom: 0;
          float: left;
          margin-right: 6px;
          margin-bottom: 0.78125vh;
          &:nth-last-child(1){
            margin-bottom: 0;
          }
          &:nth-last-child(2){
            margin-bottom: 0;
          }
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
    .el-table::before, .el-table::after {
        background-color: rgba(198,223,255,1);
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
        margin-top: 1.30208333vh;
        margin-left: 0;
        margin-right: 0.88565vw;
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
              margin-top: 1.6vh;
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
    .grey-bg{
      background:rgba(249,249,249,1)!important;
    }
    .value-unit{
      font-size:14rem;
      color:rgba(96,165,255,1);
    }
    img.focus-type-icon{
      width: 14px;
      height: 14px;
      margin: 0px 5px 0 0;
      vertical-align: middle;
    }
    .btn-car-type{
      width: 4.09956vw;
      height: 3.125vh;
      min-height: 22px;
      font-size: 12rem;
      padding: 0;
      background:rgba(247,252,255,1);
      color: #6DB3FF;
      border:1px solid rgba(109,179,255,1);
    }
    .btn-car-type-active, .btn-car-type-active:focus{
      color: white;
      background: #1786FF;
    }
</style>
