<template>
  <div class="liquidationSummary">
    <div class="liquidationSummaryTableForm">
      <div class="title">示范地区</div>
      <el-form ref="liquidationSummaryForm" :model="form" label-width="100px" class="form-inline">
        <el-form-item label="地区：">
          <el-select v-model="form.area" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份">
          <el-date-picker v-model="form.year" type="year" placeholder="选择年"></el-date-picker>
        </el-form-item>
        <el-button type="primary" class="search" @click="liquidationSummarySearch">查询</el-button>
        <el-button type="primary" class="import" @click="liquidationSummarySearch">导出</el-button>
      </el-form>
      <div class="liquidationSummaryTable">
        <el-table
          :data="liquidationSummaryTableData"
          :row-class-name="tableRowClassName"
          tooltip-effect="dark"
          size="mini"
          :cell-style="{height:'35px',padding:'5px 0px'}"
          style="width: 100%"
          :header-cell-style="{background:'#f8f8f9'}"
        >
          <el-table-column
            width="150"
            prop="city"
            align="center"
            label="示范地区"
            show-overflow-tooltip
          />
          <el-table-column
            width="150"
            prop="hydrogenation"
            align="center"
            label="总分"
            show-overflow-tooltip
          />
          <el-table-column
            width="190"
            prop="city"
            label="技术创新和产业链建设"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column prop="city" align="center" label="应用新技术的车辆推广" show-overflow-tooltip />
          <el-table-column
            prop="city"
            width="160"
            label="氢能供应和加氢站建设"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column prop="city" align="center" label="政策法规环境" show-overflow-tooltip />
        </el-table>
      </div>
    </div>
    <div class="liquidationSummaryCharts">
      <div class="demonstrationAreaChart">
        <v-chart :autoresize="true" :options="demonstrationAreaChartOption"></v-chart>
      </div>
      <div class="integralContribution">
        <div>
          <v-chart :autoresize="true" :options="vehicleCompay"></v-chart>
        </div>
        <div>
          <v-chart :autoresize="true" :options="hydrogenationStationCompay"></v-chart>
        </div>
        <div>
          <v-chart :autoresize="true" :options="partsManufacturers"></v-chart>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
export default {
  name: "LiquidationSummary",
  data() {
    return {
      form: {},
      options: [
        {
          name: "北京市",
          id: 11,
        },
        {
          name: "天津市",
          id: 12,
        },
        {
          name: "河北省",
          id: 13,
        },
        {
          name: "山西省",
          id: 14,
        },
        {
          name: "上海市",
          id: 31,
        },
        {
          name: "江苏省",
          id: 32,
        },
        {
          name: "山东省",
          id: 37,
        },
        {
          name: "广东省",
          id: 44,
        },
      ],
      demonstrationAreaChartOption: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          left: "center",
          text: "示范地区",
          top: 20,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["沧州", "北京", "湖北", "武汉", "十堰", "深圳", "厦门"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "积分",
          },
        ],
        series: [
          {
            name: "积分",
            type: "bar",
            barWidth: "60%",
            data: [3, 4, 2, 7, 5, 8, 9],
          },
        ],
      },
      vehicleCompay: {
        color: ["#FC6579"],
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          left: "center",
          text: "车辆生产企业",
          top: 20,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "长安汽车有限公司",
              "奇瑞汽车股份有限公司",
              "江淮汽车集团股份有限公司",
              "汽车股份有限公司",
            ],
            axisLabel: {
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 6; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              },
            },
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "积分",
            max: 10,
          },
        ],
        series: [
          {
            name: "积分",
            type: "bar",
            barWidth: "60%",
            data: [3, 4, 2, 7],
          },
        ],
      },
      hydrogenationStationCompay: {
        color: ["#16BBA2"],
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          left: "center",
          text: "加氢站公司",
          top: 20,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "长安汽车有限公司",
              "奇瑞汽车股份有限公司",
              "江淮汽车集团股份有限公司",
              "汽车股份有限公司",
            ],
            axisLabel: {
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 6; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              },
            },
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "积分",
            max: 10,
          },
        ],
        series: [
          {
            name: "积分",
            type: "bar",
            barWidth: "60%",
            data: [3, 4, 2, 7],
          },
        ],
      },
      partsManufacturers: {
        color: ["#55B7FF"],
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          left: "center",
          text: "零部件生产企业",
          top: 20,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "长安汽车有限公司",
              "奇瑞汽车股份有限公司",
              "江淮汽车集团股份有限公司",
              "汽车股份有限公司",
            ],
            axisLabel: {
              formatter: function (params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 6; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              },
            },
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "积分",
            max: 10,
          },
        ],
        series: [
          {
            name: "积分",
            type: "bar",
            barWidth: "60%",
            data: [3, 4, 2, 7],
          },
        ],
      },
      liquidationSummaryTableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
  methods: {
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "grey-row";
      } else {
        return "white-row";
      }
    },
    liquidationSummarySearch() {},
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table .grey-row {
  background: #fafafa;
}
/deep/.el-table .white-row {
  background: #ffffff;
}

.liquidationSummary {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .liquidationSummaryCharts {
    margin-top: 10px;
    flex-grow: 1;
    min-height: 277px;
    margin-bottom: 10px;
    display: flex;
    .echarts {
      height: 100%;
      width: 100%;
    }
    .demonstrationAreaChart {
      height: 100%;
      background-color: #ffffff;
      width: calc(30% - 5px);
    }
    .integralContribution {
      width: calc(70% - 5px);
      margin-left: 10px;
      height: 100%;
      background-color: #ffffff;
      flex-direction: column;
      > div {
        display: inline-block;
        width: 33.3%;
        height: 100%;
      }
    }
  }
  .liquidationSummaryTableForm {
    background-color: #ffffff;
    .title {
      color: #181818;
      font-weight: 600;
      margin-left: 15px;
      height: 40px;
      line-height: 40px;
    }
    .form-inline {
      .el-form-item {
        display: inline-block;
        .el-input {
          width: 200px;
        }
        .el-select {
          width: 200px;
        }
      }
    }
    .search {
      margin-left: 10px;
    }
    .import {
      color: #4a90e2;
      background-color: #f4fbff;
      border-color: #bee3ff;
    }
  }
}
</style>