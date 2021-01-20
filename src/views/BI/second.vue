<template>
  <div class="bi-2">
    <div class="bi-2-title">
      <img src="./images/bi2/logo@2x.png" alt="">
      <div class="bi-2-title-text">
        示范评价及验证平台
      </div>
    </div>
    <div class="bi-2-top">
      <div class="bi-2-page">
        <div
          class="triangle-left"
          @click="changePage('/views/first')"
        />
        2
        <div
          class="triangle-right"
          @click="changePage('/views/third')"
        />
      </div>
      <div class="bi-2-date">
        {{ date | formatDate }}
      </div>
    </div>

    <div class="bi-2-main">
      <div class="bi-2-left">
        <div class="bi-2-left-item">
          <div class="bi-2-main-title">
            <img
              src="./images/bi2/left@2x.png"
              alt=""
            >
            <label for="">全网运行车站统计</label>
            <img
              src="./images/bi2/right@2x.png"
              alt=""
            >
          </div>
          <div class="bi-2-left-main">
            <div class="bi-2-left-box">
              <div class="title-1">
                车辆统计
              </div>
              <div class="cltj-box">
                <div class="total">
                  <div class="title-2">
                    车辆总数
                  </div>
                  <div class="value-1">
                    {{ mydata.totalCar.num }}
                  </div>
                </div>
                <div class="classify">
                  <div class="val-num">
                    <div class="val-num-box">
                      <div class="title-2">
                        纯氢里程
                      </div>
                      <div class="value-2 green">
                        {{ mydata.totalCar.fcvKm }}km
                      </div>
                    </div>
                    <div class="val-num-box">
                      <div class="title-2">
                        总里程
                      </div>
                      <div class="value-3">
                        {{ mydata.totalCar.totalKm }}km
                      </div>
                    </div>
                  </div>
                  <div class="val-bar">
                    <img
                      src="./images/bi2/kedu@2x.png"
                      alt=""
                    >
                    <el-progress
                      :show-text="false"
                      :stroke-width="11"
                      :percentage="totalPercent"
                      :color="color_green"
                    />
                  </div>
                </div>
              </div>
              <div class="cltj-box">
                <div class="total">
                  <div class="title-2">
                    乘用车
                  </div>
                  <div class="value-1">
                    {{ mydata.cyc.num }}
                  </div>
                </div>
                <div class="classify">
                  <div class="val-num">
                    <div class="val-num-box">
                      <div class="title-2">
                        纯氢里程
                      </div>
                      <div class="value-2 blue">
                        {{ mydata.cyc.fcvKm }}km
                      </div>
                    </div>
                    <div class="val-num-box">
                      <div class="title-2">
                        总里程
                      </div>
                      <div class="value-3">
                        {{ mydata.cyc.totalKm }}km
                      </div>
                    </div>
                  </div>
                  <div class="val-bar">
                    <img
                      src="./images/bi2/kedu@2x.png"
                      alt=""
                    >
                    <el-progress
                      :show-text="false"
                      :stroke-width="11"
                      :percentage="cycPercent"
                      :color="color_blue"
                    />
                  </div>
                </div>
              </div>
              <div class="cltj-box">
                <div class="total">
                  <div class="title-2">
                    商用车
                  </div>
                  <div class="value-1">
                    {{ mydata.syc.num }}
                  </div>
                </div>
                <div class="classify">
                  <div class="val-num">
                    <div class="val-num-box">
                      <div class="title-2">
                        纯氢里程
                      </div>
                      <div class="value-2 yellow">
                        {{ mydata.syc.fcvKm }}km
                      </div>
                    </div>
                    <div class="val-num-box">
                      <div class="title-2">
                        总里程
                      </div>
                      <div class="value-3">
                        {{ mydata.syc.totalKm }}km
                      </div>
                    </div>
                  </div>
                  <div class="val-bar">
                    <img
                      src="./images/bi2/kedu@2x.png"
                      alt=""
                    >
                    <el-progress
                      :show-text="false"
                      :stroke-width="11"
                      :percentage="sycPercent"
                      :color="color_yellow"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-2-left-box">
              <div class="title-1">
                加氢站统计
              </div>
              <div class="jqztj-box">
                <img
                  src="./images/bi2/jqz@2x.png"
                  alt=""
                >
                <div class="jqztj-value">
                  <div class="value-box">
                    <div class="title-3">
                      总数量
                    </div>
                    <div class="value-4">
                      {{ mydata.jqz.totalNum }}<label class="title-3">个</label>
                    </div>
                  </div>
                  <div class="value-box">
                    <div class="title-3">
                      总加氢量
                    </div>
                    <div class="value-4">
                      {{ mydata.jqz.totalFcv }}<label class="title-3">kg</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jqztj-box">
                <img
                  src="./images/bi2/35mpa@2x.png"
                  alt=""
                >
                <div class="jqztj-value">
                  <div class="value-box">
                    <div class="title-3">
                      数量
                    </div>
                    <div class="value-4">
                      {{ mydata.Mpa35.totalNum }}<label class="title-3">个</label>
                    </div>
                  </div>
                  <div class="value-box">
                    <div class="title-3">
                      加氢量
                    </div>
                    <div class="value-4">
                      {{ mydata.Mpa35.totalFcv }}<label class="title-3">kg</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jqztj-box">
                <img
                  src="./images/bi2/70mpa@2x.png"
                  alt=""
                >
                <div class="jqztj-value">
                  <div class="value-box">
                    <div class="title-3">
                      数量
                    </div>
                    <div class="value-4">
                      {{ mydata.Mpa70.totalNum }}<label class="title-3">个</label>
                    </div>
                  </div>
                  <div class="value-box">
                    <div class="title-3">
                      加氢量
                    </div>
                    <div class="value-4">
                      {{ mydata.Mpa70.totalFcv }}<label class="title-3">kg</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bi-2-left-box">
              <div class="title-1">
                <label class="right20">全国FCV热力图</label>
                <el-button-group>
                  <el-button
                    :type="is_yunying==true?'primary':''"
                    @click="changeYunying(true)"
                  >
                    运营车辆
                  </el-button>
                  <el-button
                    :type="is_yunying==true?'':'primary'"
                    @click="changeYunying(false)"
                  >
                    纯氢里程
                  </el-button>
                </el-button-group>
              </div>
              <div
                id="hotMap_FCV"
                class="hotmap-box"
              />
            </div>
            <div class="bi-2-left-box">
              <div class="title-1">
                <label class="right4">全国加氢站热力图</label>
                <el-button-group>
                  <el-button
                    :type="is_35Mpa==true?'primary':''"
                    @click="change35Mpa(true)"
                  >
                    35Mpa
                  </el-button>
                  <el-button
                    :type="is_35Mpa==true?'':'primary'"
                    @click="change35Mpa(false)"
                  >
                    70mpa
                  </el-button>
                </el-button-group>
              </div>
              <div
                id="hotMap_JQZ"
                class="hotmap-box"
              />
            </div>
          </div>
        </div>
        <div class="bi-2-left-item">
          <div class="bi-2-main-title">
            <img
              src="./images/bi2/left@2x.png"
              alt=""
            >
            <label for="">全网产业链统计</label>
            <img
              src="./images/bi2/right@2x.png"
              alt=""
            >
          </div>
          <div class="bi-2-left-main2">
            <div
              v-if="fc"
              class="car-module car-module-left30"
            >
              <div class="num-show">
                <div
                  class="show-left"
                  @click="drawChinaMap('fc')"
                >
                  整车企业：<label class="val-num">{{ mydata.cyltj.zcqy }}</label>家
                </div>
                <div
                  class="show-right"
                  @click="drawChinaMap('dd')"
                >
                  电堆：<label class="val-num">{{ mydata.cyltj.dd }}</label>家
                </div>
              </div>
              <div class="module-box">
                <img src="./images/bi2/arrow@2x.png">
                <div
                  class="shine left345"
                  @click="changefc"
                />
              </div>
            </div>
            <div
              v-if="!fc"
              class="car-module car-module-left60"
            >
              <img
                class="fanhui"
                src="./images/bi2/fanhui-2@2x.png"
                @click="changefc"
              >
              <div class="num-show top30">
                <div
                  class="show-left2"
                  @click="drawChinaMap('zzjhm')"
                >
                  质子交换膜：<label class="val-num">{{ mydata.cyltj.zzjhm }}</label>家
                </div>
                <div
                  class="show-right2"
                  @click="drawChinaMap('mea')"
                >
                  MEA：<label class="val-num">{{ mydata.cyltj.MEA }}</label>家
                </div>
              </div>
              <div class="module-box2">
                <div class="module-box-flex">
                  <div class="module-box-tips1">
                    <img
                      class="arrow"
                      src="./images/bi2/arrow@2x.png"
                    >
                    <!--                    <div class="shine" />-->
                  </div>
                  <div class="module-box-tips2">
                    <img
                      class="arrow"
                      src="./images/bi2/arrow@2x.png"
                    >
                    <!--                    <div class="shine" />-->
                  </div>
                </div>
                <div class="module-box-flex2">
                  <div
                    class="show-bottom"
                    @click="drawChinaMap('sjb')"
                  >
                    双极板：<label class="val-num">{{ mydata.cyltj.sjb }}</label>家
                  </div>
                  <img
                    class="arrow car-module-left30"
                    src="./images/bi2/arrow@2x.png"
                  >
                  <!--                  <div class="shine car-module-left30" />-->
                </div>
              </div>
            </div>
            <div
              id="chinaMap"
              :class="fc == true?'china-map':'china-map2'"
            />
          </div>
        </div>
      </div>
      <div class="bi-2-right">
        <div class="bi-2-main-title">
          <img
            src="./images/bi2/left@2x.png"
            alt=""
          >
          <label for="">全网积分统计</label>
          <img
            src="./images/bi2/right@2x.png"
            alt=""
          >
        </div>
        <div class="bi-2-right-main">
          <div
            id="myChart1"
            class="bi-2-right-box"
          />
          <div
            id="myChart2"
            class="bi-2-right-box"
          />
          <div
            id="myChart3"
            class="bi-2-right-box"
          />
          <div
            id="myChart4"
            class="bi-2-right-box"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MapLoader from '@/assets/js/AMap.js'
  import { formatTimeToStr } from '@/assets/js/date.js'
  // import 'lib-flexible/flexible'
  import '@/assets/js/flexible.js'

  import { EleResize } from '@/assets/js/esresize.js'

  export default {
    filters: {
      formatDate: function (time) { // 时间过滤器，用于格式化时间
        if (time != null && time != '') {
          var date = new Date(time)
          return formatTimeToStr(date, 'yyyy/MM/dd hh:mm')
        } else {
          return ''
        }
      }
    },
    data () {
      return {
        mydata: {},
        color_green: '#8EDB48',
        color_blue: '#00BCFD',
        color_yellow: '#FCC224',
        date: new Date(),
        fc: true, // 车辆与电堆显示状态
        is_yunying: true, // 全国FCV热力图显示状态
        is_35Mpa: true // 全国加氢站热力图显示状态
      }
    },
    computed: {
      totalPercent: function () {
        let p = this.mydata.totalCar.fcvKm / this.mydata.totalCar.totalKm
        return 100 * p
      },
      cycPercent: function () {
        let p = this.mydata.cyc.fcvKm / this.mydata.cyc.totalKm
        return 100 * p
      },
      sycPercent: function () {
        let p = this.mydata.syc.fcvKm / this.mydata.syc.totalKm
        return 100 * p
      }
    },
    beforeMount () {
      this.mydata = require('../../mock/bi2-data.json') // 加载基础数据
    },
    mounted () {
      let that = this
      this.timer = setInterval(() => {
        that.date = new Date()
      }, 1000) // 设置时间定时器

      this.timer2 = setInterval(() => {
        that.is_yunying = !that.is_yunying
        that.changeYunying(that.is_yunying)
        that.is_35Mpa = !that.is_35Mpa
        that.change35Mpa(that.is_35Mpa)
      }, 5000) // 设置时间定时器

      this.initHeatMap() // 初始化热力图
      this.loadHotMap_FCV('yunying') // 加载FCV热力图
      this.loadHotMap_JQZ(35) // 加载加氢站热力图
      this.drawBar1() // 加载地区榜
      this.drawBar2() // 加载车企榜
      this.drawBar3() // 加载零部件企业榜
      this.drawBar4() // 加载加氢站排行榜
      this.initChinaMap() // 初始化中国地图
      this.drawChinaMap('fc') // 加载中国地图数据
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除定时器
      }
      if (this.timer2) {
        clearInterval(this.timer2) // 在Vue实例销毁前，清除定时器
      }
    },
    methods: {
      changePage (path) {
        this.$router.push(path)
      },
      changefc () { // 切换车辆与电堆显示
        this.fc = !this.fc
        if (this.fc) {
          this.drawChinaMap('fc')
        } else {
          this.drawChinaMap('dd')
        }
      },
      changeYunying (state) { // 切换全国FCV热力图显示
        this.is_yunying = state
        if (this.is_yunying) {
          this.loadHotMap_FCV('yunying')
        } else {
          this.loadHotMap_FCV('chunqing')
        }
      },
      change35Mpa (state) { // 切换全国加氢站热力图显示
        this.is_35Mpa = state
        if (this.is_35Mpa) {
          this.loadHotMap_JQZ(35)
        } else {
          this.loadHotMap_JQZ(70)
        }
      },
      buttonType (flag) { // 全国FCV热力图，全国加氢站热力图按钮效果
        if (flag == 1) { return 'primary' } else {
          return 'info'
        }
      },
      initHeatMap () {
        let that = this
        MapLoader().then(AMap => {
          that.hotMap_FCV = new AMap.Map('hotMap_FCV', {
            center: [114.298572, 30.584355],
            zoom: 3,
            resizeEnable: true
          })
          that.hotMap_JQZ = new AMap.Map('hotMap_JQZ', {
            center: [114.298572, 30.584355],
            zoom: 3,
            resizeEnable: true
          })
        }, e => {
          console.log('地图加载失败', e)
        })
      },
      loadHotMap_FCV (DataType) { // 根据显示类型加载全国FCV热力图
        let that = this
        MapLoader().then(AMap => {
          let heatmap
          var heatmapData = require('../../mock/heatmapData-' + DataType + '.json') // 加载热力图数据
          that.hotMap_FCV.plugin(['AMap.Heatmap'], function () {
            // 初始化heatmap对象
            heatmap = new AMap.Heatmap(that.hotMap_FCV, {
              radius: 20, // 给定半径
              opacity: [0, 0.8]
            })
            // 设置数据集
            heatmap.setDataSet({
              data: heatmapData,
              max: 100
            })
          })
        }, e => {
          console.log('地图加载失败', e)
        })
      },
      loadHotMap_JQZ (DataType) { // 根据显示类型加载全国加氢站热力图
        let that = this
        MapLoader().then(AMap => {
          let heatmap2
          var heatmapData2 = require('../../mock/heatmapData-' + DataType + 'Mpa.json') // 加载热力图数据
          that.hotMap_JQZ.plugin(['AMap.Heatmap'], function () {
            // 初始化heatmap对象
            heatmap2 = new AMap.Heatmap(that.hotMap_JQZ, {
              radius: 20, // 给定半径
              opacity: [0, 0.8]
            })
            // 设置数据集
            heatmap2.setDataSet({
              data: heatmapData2,
              max: 100
            })
          })
        }, e => {
          console.log('地图加载失败', e)
        })
      },
      remSize (res) { // px转rem
        let docEl = document.documentElement
        let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (!clientWidth) return
        let fontSize = clientWidth / 1366
        return res * fontSize
      },
      drawBar1 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart1Div = document.getElementById('myChart1')
        let myChart1 = this.$echarts.init(myChart1Div)
        // 绘制图表
        myChart1.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '7%',
            bottom:'4%',
            y: this.remSize(30),
            y2: this.remSize(1),
            containLabel: true
          },
          legend: {
            data: ['地区榜'],
            x: this.remSize(227),
            y: this.remSize(4),
            itemWidth: this.remSize(9), // 图例的宽度
            itemHeight: this.remSize(9), // 图例的高度
            textStyle: {
              color: '#6DB3FF',
              fontSize: this.remSize(12)
            }
          },
          xAxis: [
          {
              type: 'value',
              max: 1000,
              min: 0,
              splitNumber: 5,
              nameTextStyle: {
                color: 'rgba(102,102,102,1)',
                fontSize: this.remSize(10),
                fontFamily: 'monospace'
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(10)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(4,183,253,0.3)'
                }
              }
            }

          ],
          yAxis: [
            {
              type: 'category',
              name: '积分',
              width:'50%',
              nameTextStyle: {
                color: 'rgba(102,102,102,1)',
                fontSize: this.remSize(10),
                fontFamily: 'monospace',
                padding:[0,0,-4,0],
              },
              data: this.mydata.dqb.xArr,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                rotate: 0, // 倾斜度 -90 至 90 默认为0
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(9)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              }
            }
          ],
          series: [
            {
              name: '地区榜',
              type: 'bar',
              barWidth: '30%',
              data: this.mydata.dqb.yArr,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#00BAFD' },
                      { offset: 1, color: '#249EFD' }
                    ]
                  ),
                  barBorderRadius: [0, this.remSize(6), this.remSize(6), 0]
                }
              },
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'rgba(1,184,252,1)',
                  fontSize: this.remSize(10)
                }
              }
            }
          ]
        })
        EleResize.on(myChart1Div, function () { myChart1.resize() }) // 在div上绑定对应resize方法
      },
      drawBar2 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart2Div = document.getElementById('myChart2')
        let myChart2 = this.$echarts.init(myChart2Div)
        // 绘制图表
        myChart2.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '7%',
            bottom:'4%',
            y: this.remSize(30),
            y2: this.remSize(1),
            containLabel: true
          },
          legend: {
            data: ['车企榜'],
            x: this.remSize(227),
            y: this.remSize(4),
            itemWidth: this.remSize(9), // 图例的宽度
            itemHeight: this.remSize(9), // 图例的高度
            textStyle: {
              color: '#6DB3FF',
              fontSize: this.remSize(12)
            }
          },
          xAxis: [
            {
              type: 'value',
              max: 1000,
              min: 0,
              splitNumber: 5,
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(10)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(4,183,253,0.3)'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: this.mydata.cqb.xArr,
              name: '积分',
              nameTextStyle: {
                color: 'rgba(102,102,102,1)',
                fontSize: this.remSize(10),
                fontFamily: 'monospace',
                padding:[0,0,-4,0]
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                rotate: 0, // 倾斜度 -90 至 90 默认为0
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(9)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              }
            }

          ],
          series: [
            {
              name: '车企榜',
              type: 'bar',
              barWidth: '30%',
              data: this.mydata.cqb.yArr,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      { offset: 0, color: '#DBD910' },
                      { offset: 1, color: '#00BAFD' },
                    ]
                  ),

                  barBorderRadius: [0, this.remSize(6), this.remSize(6), 0]
                }
              },
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'rgba(1,184,252,1)',
                  fontSize: this.remSize(10)
                }
              }
            }
          ]
        })
        EleResize.on(myChart2Div, function () { myChart2.resize() }) // 在div上绑定对应resize方法
      },
      drawBar3 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart3Div = document.getElementById('myChart3')
        let myChart3 = this.$echarts.init(myChart3Div)
        // 绘制图表
        myChart3.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '7%',
            bottom:'4%',
            y: this.remSize(30),
            y2: this.remSize(1),
            containLabel: true
          },
          legend: {
            data: ['零部件企业榜'],
            x: this.remSize(190),
            y: this.remSize(4),
            itemWidth: this.remSize(9), // 图例的宽度
            itemHeight: this.remSize(9), // 图例的高度
            textStyle: {
              color: '#6DB3FF',
              fontSize: this.remSize(12)
            }
          },
          xAxis: [
            {
              type: 'value',
              max: 1000,
              min: 0,
              splitNumber: 5,
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(10)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(4,183,253,0.3)'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: this.mydata.lbjqyb.xArr,
              name: '积分',
              nameTextStyle: {
                color: 'rgba(102,102,102,1)',
                fontSize: this.remSize(10),
                fontFamily: 'monospace',
                padding:[0,0,-4,0]
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                rotate: 0, // 倾斜度 -90 至 90 默认为0
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(9)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              }
            }
          ],
          series: [
            {
              name: '零部件企业榜',
              type: 'bar',
              barWidth: '30%',
              data: this.mydata.lbjqyb.yArr,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      { offset: 0, color: '#00BAFD' },
                      { offset: 1, color: '#249EFD' }
                    ]
                  ),
                  barBorderRadius: [0, this.remSize(6), this.remSize(6), 0]
                }
              },
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'rgba(1,184,252,1)',
                  fontSize: this.remSize(10)
                }
              }
            }
          ]
        })
        EleResize.on(myChart3Div, function () { myChart3.resize() }) // 在div上绑定对应resize方法
      },
      drawBar4 () {
        // 基于准备好的dom，初始化echarts实例
        let myChart4Div = document.getElementById('myChart4')
        let myChart4 = this.$echarts.init(myChart4Div)
        // 绘制图表
        myChart4.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '7%',
            bottom:'4%',
            y: this.remSize(30),
            y2: this.remSize(1),
            containLabel: true
          },
          legend: {
            data: ['加氢站排行榜'],
            x: this.remSize(190),
            y: this.remSize(4),
            itemWidth: this.remSize(9), // 图例的宽度
            itemHeight: this.remSize(9), // 图例的高度
            textStyle: {
              color: '#6DB3FF',
              fontSize: this.remSize(12)
            }
          },
          xAxis: [
            {
              type: 'value',
              max: 1000,
              min: 0,
              splitNumber: 5,
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(10)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(4,183,253,0.3)'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: this.mydata.jqzphb.xArr,
              name: '积分',
              nameTextStyle: {
                color: 'rgba(102,102,102,1)',
                fontSize: this.remSize(10),
                fontFamily: 'monospace',
                padding:[0,0,-4,0]
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                rotate: 0, // 倾斜度 -90 至 90 默认为0
                textStyle: {
                  color: 'rgba(102,102,102,1)',
                  fontSize: this.remSize(9)
                }
              },
              axisLine: {
                lineStyle: { color: 'rgba(4,183,253,1)' }
              }
            }

          ],
          series: [
            {
              name: '加氢站排行榜',
              type: 'bar',
              barWidth: '30%',
              data: this.mydata.jqzphb.yArr,
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      { offset: 0, color: '#DBD910' },
                      { offset: 1, color: '#00BAFD' }
                    ]
                  ),
                  barBorderRadius: [0, this.remSize(6), this.remSize(6), 0]
                }
              },
              label: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'rgba(1,184,252,1)',
                  fontSize: this.remSize(10)
                }
              }
            }
          ]
        })
        EleResize.on(myChart4Div, function () { myChart4.resize() }) // 在div上绑定对应resize方法
      },
      initChinaMap () { // 初始化中国地图
        this.chinaMap = this.$echarts.init(document.getElementById('chinaMap'))
      },

      drawChinaMap (dataName) { // 绘制中国地图，并加载对应数据
        var dataList = require('../../mock/chinaMapData-' + dataName + '.json')
        var mapFeatures = this.$echarts.getMap('china').geoJson.features
        var geoCoordMap = {}
        mapFeatures.forEach(function (v) {
          // 地区名称
          var name = v.properties.name
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp
        })
        var max = 480
        var min = 9
        var maxSize4Pin = 80
        var minSize4Pin = 20

        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          return res
        }

        this.chinaMap.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var toolTiphtml = ''
              for (var i = 0; i < dataList.length; i++) {
                if (params.name == dataList[i].name) {
                  toolTiphtml += dataList[i].name + '：' + dataList[i].value
                }
              }
              return toolTiphtml
            }
          },
          visualMap: {
            min: 0,
            max: 100,
            splitList: [
              { start: 400 },
              { start: 300, end: 400, label: '300~400' },
              { start: 200, end: 300, label: '200~300' },
              { start: 100, end: 200, label: '100~200' },
              { start: 0, end: 100, label: '0~100' }
            ],
            right:'5%',
            top: 'middle',
            seriesIndex: [0],
            inRange: {
              color: ['#D1F6FD', '#86CDFF', '#0089EA', '#0462BD', '#215096']// 取值范围的颜色
            },
            show: true, // 图注
            calculable: false,
            itemHeight:'10'
          },
          geo: {
            show: true,
            map: 'china',
            left:'150vw',
            roam: false, // 不开启缩放和平移
            zoom: 1.23, // 视角缩放比例
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#D1F6FD',
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: '#F3B329', // 鼠标选择区域颜色
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              name: '企业',
              type: 'map',
              geoIndex: 0,
              data: dataList
            },
            {
              name: '气泡',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin', // 气泡
              symbolSize: function (val) {
                // var a = (maxSize4Pin - minSize4Pin) / (max - min);
                // var b = minSize4Pin - a * min;
                // b = maxSize4Pin - a * max;
                // return a * val[2] + b;
                return 50
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#003F8D' // 标志颜色
                }
              },
              encode: { // 可以定义 data 的哪个维度被编码成什么
                label: 2 // 表示 label 使用维度 3。
              },
              zlevel: 5,
              data: convertData(dataList)
            },
            {
              name: '扩散效果',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(dataList),
              symbolSize: function (val) {
                // return val[2] / 20;
                return 10
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  color: '#333333',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'yellow'
                }
              },
              zlevel: 1
            }
          ]
        })
        let chinaMapDiv = document.getElementById('chinaMap')
        let that = this
        EleResize.on(chinaMapDiv, function () { that.chinaMap.resize() }) // 在div上绑定对应resize方法
      }
    }
  }
</script>

<style scoped lang="scss">
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
    /*font-size: 0.951684vw;*/
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

  .bi-2-main{
    margin-left: 0.87848%;
    margin-right: 0.87848%;
    margin-top: 2.6vh;
    display: flex;
    height: 51.68375vh;
    display: flex;
    justify-content: space-between;
  }

  .bi-2-left{
    width: 7.554905rem;
    height: 90.294792vh;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
  }
  .bi-2-right{
    width: 2.196193rem;
    height: 90.294792vh;
    margin-left: 1.3107vh;
    background-color: rgba(247,252,255,1);
    border-radius:0.5243vh;
    padding: 0.7864vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bi-2-left-item{
    /* height: 2.459736rem; */
    background-color: rgba(247,252,255,1);
    border-radius:0.5243vh;
    padding: 0.78125vh;
    margin-bottom: 1.302vh;
  }
  .bi-2-main-title{
    /*height: .248902rem;*/
    height: 4.6875vh;
    display: flex;
    align-items: center;
  }
  .bi-2-main-title img{
    width: .424597rem;
    height: 2.0972vh;
  }
  .bi-2-main-title label{
    font-size:2.3594vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,106,233,1);
    line-height:5.8984vh;
    margin-left: 1.5729vh;
    margin-right: 1.5729vh;
  }
  .bi-2-left-main{
    display: flex;
    justify-content: space-between;
  }
  .bi-2-left-box{
    width: 1.81552rem;
    height: 39.3228vh;
    background:rgba(255,255,255,1);
    border:solid rgba(198,223,255,1);
    border-width: 0.1311vh;
    border-radius:0.5243vh;
  }

  .bi-2-left-box .title-1{
    font-size:1.835vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(57,152,255,1);
    margin-left: 1.5729vh;
    margin-top: 1vh;
    display: flex;
    align-items: center;
  }

  .bi-2-left-box .title-2{
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(57,152,255,1);
    margin-top: 1.5729vh;
  }

  .bi-2-left-box .title-3{
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(57,152,255,1);
    margin-top: 0.7864vh;
    margin-left: 0.1311vh;
  }

  .bi-2-left-box .value-1{
    font-size:2.6215vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,106,233,1);
    margin-top: 1.5729vh;
  }

  .bi-2-left-box .value-2{
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    margin-top: 0.7864vh;
  }

  .bi-2-left-box .green{
    color:#58B900;
  }

  .bi-2-left-box .blue{
    color:#00BCFD;
  }

  .bi-2-left-box .yellow{
    color:#FCC224;
  }

  .bi-2-left-box .value-3{
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(57,152,255,1);
    margin-top: 0.7864vh;
  }

  .bi-2-left-box .value-4{
    font-size:2.6215vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(0,106,233,1);
    margin-top: 1.0486vh;
  }

  .bi-2-left-box .right20{
    margin-right: 2.6215vh;
  }

  .bi-2-left-box .right4{
    margin-right: 0.5243vh;
  }

  .cltj-box{
    width: 2.093704rem;
    height: 10.8793vh;
    margin-left: 0.9175vh;
    margin-right: 0.9175vh;
    margin-top: 0.5864vh;
    display: flex;
  }
  .cltj-box .total{
    background-image: url(./images/bi2/bg1@2x.png);
    width: 10.8793vh;
    height: 10.8793vh;
    background-size: 100% 100%;
    margin-right: 2.2283vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cltj-box .classify{
    display: flex;
    flex-direction: column;
  }

  .cltj-box .classify .val-num{
    display: flex;
    justify-content: space-between;
    width: .959004rem;
    height: 6.1823vh;
  }

  .cltj-box .classify .val-bar{
    width: .922401rem;
    height: 1.4418vh;
  }

  .cltj-box .classify .val-bar img{
    width: .922401rem;
    height: 0.7864vh;
  }

  .cltj-box .classify .val-num-box{
    display: flex;
    flex-direction: column;
  }

  /* 加氢站统计 */
  .jqztj-box{
    display: flex;
    align-items: center;
    width: 1.727672rem;
    height:10.4860vh;
    margin-top: 1.1796vh;
    margin-left: 0.7864vh;
    background:rgba(244,244,244,0.5);
    border-radius:0.5243vh;
  }

  .jqztj-box img{
    width: 7.3402vh;
    height: 7.3402vh;
    margin-top: 0.5243vh;
    margin-left: 2.0972vh;
    margin-right: 1.0486vh;
  }

  .jqztj-box .value-box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .jqztj-box .jqztj-value{
    display: flex;
    width: 1.02489rem;
    justify-content: space-around;
  }

  /* 热力图 */
  .hotmap-box{
    width: 1.727672rem;
    height: 34.0797vh;
    background:rgb(138, 165, 224);
    border-radius:0.2621vh;
    margin: 0.7864vh;
  }

  .bi-2-left-main2{
    width:7.452416rem;
    height:38.0207vh;
    background:rgba(255,255,255,1);
    border:solid rgba(198,223,255,1);
    border-width: 0.1311vh;
    border-radius:0.5243vh;
    display: flex;
  }

  .car-module{
    height: 32.2447vh;
    width: 3.221083rem;
    margin-top: 4.9808vh;
  }

  .car-module-left30{
    margin-left: 3.9322vh;
  }

  .car-module-left60{
    margin-left:7.8645vh;
  }

  .fanhui{
    display: block;
    width: .102489rem;
    height: 1.835vh;
    margin-left: -6.6848vh;
    margin-top: -3.9322vh;
  }

  .car-module .num-show{
    display: flex;
    margin-bottom: 1.835vh;
    font-size:1.835vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(23,134,255,1);
  }

  .car-module .top30{
    margin-top: 3.9322vh;
  }

  .car-module .val-num{
    color:rgba(255,156,90,1);
  }

  .car-module .num-show .show-left{
    background-image: url(./images/bi2/bg2@2x.png);
    background-size: 100% 100%;
    width: 1.010249rem;
    height: 3.9322vh;
    margin-left: 4.1944vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .car-module .num-show .show-right{
    background-image: url(./images/bi2/bg2@2x.png);
    background-size: 100% 100%;
    width: .79063rem;
    height: 3.9322vh;
    margin-left: 21.9088vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .car-module .num-show .show-left2{
    background-image: url(./images/bi2/bg2@2x.png);
    background-size: 100% 100%;
    width: 1.098097rem;
    height: 3.9322vh;
    margin-left: 5.5052vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .car-module .num-show .show-right2{
    background-image: url(./images/bi2/bg2@2x.png);
    background-size: 100% 100%;
    width: .79063rem;
    height: 3.9322vh;
    margin-left: 4.8836vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .show-bottom{
    background-image: url(./images/bi2/bg2@2x.png);
    background-size: 100% 100%;
    width: .878477rem;
    height: 3.9322vh;
    margin-left: -4.9808vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:1.835vh;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(23,134,255,1);
  }

  .car-module .module-box{
    background-image: url(./images/bi2/FC1@2x.png);
    background-size: 100% 100%;
    width: 3.221083rem;
    height: 26.2152vh;
  }

  .car-module .module-box2{
    background-image: url(./images/bi2/DD1@2x.png);
    background-size: 100% 100%;
    width: 3.221083rem;
    height: 25.2152vh;
  }

  .module-box-flex{
    display: flex;
  }

  .module-box-flex2{
    display: flex;
    margin-top: 3.9322vh;
    align-items: center;
  }

  .module-box-flex2 img{
    transform: rotate(270deg);
  }

  .module-box-tips1{
    width: .146413rem;
    height: 12.3211vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-left: 18.8116vh;
    margin-top: -1.5729vh;
  }

  .module-box-tips2{
    width: .146413rem;
    height: 12.3211vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-left: 15.9913vh;
    margin-top: -1.5729vh;
  }

  .car-module .module-box img{
    width: .102489rem;
    height: 9.1753vh;
    margin-left: 25.743vw;
    margin-top: -1.5729vh;
  }

  .car-module .arrow{
    width: .102489rem;
    height: 9.1753vh;
  }

  .car-module .left345{
    margin-left: 25.543vw;
  }

  /*闪光点动画 0%开始，100%结束*/
  @keyframes scale{
    0%{transform:scale(1)}
    50%,75%{transform:scale(3)}
    78%,100%{opacity:0}
  }

  .shine{
    width: 2.6215vh;
    height: 2.6215vh;
    background-color: #FF9C5A;
    border-radius: 50%;
  }

  .shine:before {
    content: '';
    display:block;
    width: 2.6215vh;
    height: 2.6215vh;
    border-radius: 50%;
    opacity: .9;
    background-color: #FF9C5A;
    animation: scale 1.2s infinite cubic-bezier(0,0,.49,1.02);
    animation-delay: 200ms;
  }

  .china-map{
    width: 59.5924vw;
    height: 36.7013vh;
    margin-top: 0.8vh;
    margin-left: -3.3239vh;
  }

  .china-map2{
    width: 59.5924vw;
    height: 36.7013vh;
    margin-top: 0.8vh;
    margin-left: -7.2239vh;
  }

  .bi-2-right-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /*height: 4.831625rem;*/
    height: 86.71875vh;
  }
  .bi-2-right-box{
    width:2.093704rem;
    /*height:1.14202rem;*/
    height:20.572917vh;
    background:rgba(255,255,255,1);
    border:solid rgba(198,223,255,1);
    border-width: 0.1311vh;
    border-radius:0.5243vh;
  }

  .el-button {
    color: #6DB3FF;
    /*background-color: #1786FF;*/
    border-color: #1786FF;
    width: .409956rem;
    height: 2.6215vh;
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    padding: 0.2621vh;
  }

  .el-button--primary {
    color: #fff;
    background-color: #1786FF;
  }

  .el-button--info {
    color: #6DB3FF;
    background-color: #fff;
    border-color: #6DB3FF;
    width: .409956rem;
    height: 2.6215vh;
    font-size:1.5729vh;
    font-family:PingFang SC;
    font-weight:bold;
    padding: 0.2621vh;
  }
  @media screen and (max-width: 1367px) {
    .el-button{
      font-size:1.3020833vh;
      font-weight: normal;
      padding: 0vh;
      padding-bottom: 0.2vh
    }
  }

</style>
