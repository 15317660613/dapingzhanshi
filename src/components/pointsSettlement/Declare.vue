<template>
  <div class="declareContent">
    <div class="area">
      <div class="title">示范地区</div>
      <el-form ref="ntvpForm" :model="condition" label-width="100px" class="form-inline">
        <el-form-item label="地区：">
          <el-select v-model="condition.provinceId" placeholder="请选择" @change="provinceChange">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份">
          <el-date-picker
            v-model="condition.year"
            @change="yearChange"
            value-format="yyyy"
            format="yyyy"
            type="year"
            placeholder="选择年"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="uploadContent">
      <div class="coreUpload">
        <div class="title">氢能供给保障</div>
        <div class="uploadBtn">
          <img src="@/assets/img/pointsSettlement/upload.png" alt />
          <div class="upName">核心材料上传</div>
          <div class="upTooltip">支持扩展名：.rar .zip .jpg...</div>
        </div>
      </div>
      <div class="policyUpload">
        <div class="title">政策法规环境</div>
        <div class="uploadBtn">
          <img src="@/assets/img/pointsSettlement/upload.png" alt />
          <div class="upName">核心材料上传</div>
          <div class="upTooltip">支持扩展名：.rar .zip .jpg...</div>
        </div>
      </div>
    </div>
    <div class="newTechnology_vp">
      <div class="ntvp_header">
        <span>应用新技术的车辆推广</span>
        <div class="ntvp_tabs">
          <el-button
            class="monitorVehicle"
            :class="{actived:tab == 1}"
            @click="handleTabMonitorVehicle"
          >监控车辆</el-button>
          <el-button class="toBeSettled" :class="{actived:tab == 2}" @click="handleTabSettled">
            待清算
            <span>+{{toBeSettledTotal}}</span>
          </el-button>
        </div>
      </div>
      <div class="ntvp_content">
        <el-form ref="ntvpForm" :model="ntvpForm" label-width="100px" class="form-inline">
          <el-form-item label="企业名称：">
            <el-select v-model="ntvpForm.tenantId">
              <el-option
                v-for="(item,index) in vehicleCompanyOptions"
                :key="index"
                :label="item.tenantName"
                :value="item.tenantId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆种类：">
            <el-select v-model="ntvpForm.vecClass">
              <el-option
                v-for="(item,index) in modelList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆型号：">
            <el-input v-model="ntvpForm.model" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="车辆VIN码：">
            <el-input v-model="ntvpForm.vehicle" placeholder="请填写"></el-input>
          </el-form-item>
          <el-button type="primary" class="search" @click="ntvpSearch">搜索</el-button>
          <el-button v-show="tab==1" class="ntvp_handle" @click="addSettled">加入待清算</el-button>
          <el-button v-show="tab==2" class="ntvp_handle" @click="cancelSettled">取消</el-button>
        </el-form>
        <div v-show="tab==1" class="ntvpTable">
          <el-table
            ref="ntvpTable"
            :data="ntvpTableData"
            tooltip-effect="dark"
            :height="ntvpTableHeight"
            :row-class-name="tableRowClassName"
            size="mini"
            style="width: 100%"
            :header-cell-style="{background:'#f8f8f9'}"
            @selection-change="ntvpSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              width="160"
              prop="tenantName"
              align="center"
              label="车辆生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              prop="vin"
              width="140"
              align="center"
              label="车辆VIN码"
              show-overflow-tooltip
            />
            <el-table-column prop="vehicleNum" align="center" label="车辆牌照" show-overflow-tooltip />
            <el-table-column prop="vehicleModel" align="center" label="车辆型号" show-overflow-tooltip />
            <el-table-column
              prop="vecClass"
              :formatter="vecClassFormatter"
              align="center"
              label="车辆种类"
              show-overflow-tooltip
            />
            <!-- <el-table-column width="100" label="车辆发票图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column width="100" label="行驶证图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>-->
            <el-table-column
              width="100"
              prop="odometer"
              align="center"
              label="用氢行驶里程"
              show-overflow-tooltip
            />
            <!-- <el-table-column width="100" label="质保证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>-->
            <el-table-column
              :key="index"
              v-for="(item,index) in ntvpTableColumn"
              :prop="item.prop"
              align="center"
              :label="item.label"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  v-if="isImage(scope.row,item.prop)"
                  class="tableBtn"
                  @click="handleSee(scope.$index, scope.row)"
                >点击查看</div>
                <template v-if="!isImage(scope.row,item.prop)">{{scope.row[item.prop]}}</template>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <pagination
              v-show="ntvpTotal>0"
              :total="ntvpTotal"
              :page.sync="ntvp_query.page.current"
              :limit.sync="ntvp_query.page.size"
              :pageSizes="[5,10,20,30]"
              @pagination="get_ntvp_list()"
            />
          </div>
        </div>
        <div v-show="tab==2" class="ntvpTable">
          <el-table
            :data="toBeSettledTableData"
            ref="toBeSettledTable"
            :height="ntvpTableHeight"
            tooltip-effect="dark"
            :row-class-name="tableRowClassName"
            size="mini"
            style="width: 100%"
            :header-cell-style="{background:'#f8f8f9'}"
            @selection-change="toBeSettledSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              width="160"
              prop="tenantName"
              align="center"
              label="车辆生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              prop="vin"
              width="140"
              align="center"
              label="车辆VIN码"
              show-overflow-tooltip
            />
            <el-table-column prop="vehicleNum" align="center" label="车辆牌照" show-overflow-tooltip />
            <el-table-column prop="vehicleModel" align="center" label="车辆型号" show-overflow-tooltip />
            <el-table-column
              prop="vecClass"
              :formatter="vecClassFormatter"
              align="center"
              label="车辆种类"
              show-overflow-tooltip
            />
            <!-- <el-table-column width="100" label="车辆发票图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column width="100" label="行驶证图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>-->
            <el-table-column
              width="100"
              prop="odometer"
              align="center"
              label="用氢行驶里程"
              show-overflow-tooltip
            />
            <!-- <el-table-column width="100" label="质保证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>-->
            <el-table-column
              :key="index"
              v-for="(item,index) in ntvpTableColumn"
              :prop="item.prop"
              align="center"
              :label="item.label"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  v-if="isImage(scope.row,item.prop)"
                  class="tableBtn"
                  @click="handleSee(scope.$index, scope.row)"
                >点击查看</div>
                <template v-if="!isImage(scope.row,item.prop)">{{scope.row[item.prop]}}</template>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <pagination
              v-show="toBeSettledTotal>0"
              :total="toBeSettledTotal"
              :page.sync="ntvp_query.page.current"
              :limit.sync="ntvp_query.page.size"
              :pageSizes="[5,10,20,30]"
              @pagination="get_ntvp_list()"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="hydrogenationStation_cs">
      <div class="hscs_header">
        <span>加氢站建设情况</span>
      </div>
      <div class="hscs_content">
        <el-form ref="hscsForm" :model="hscsForm" label-width="100px" class="form-inline">
          <el-form-item label="企业名称：">
            <el-select v-model="hscsForm.tenantId">
              <el-option
                v-for="(item,index) in siteCompanyOptions"
                :key="index"
                :label="item.tenantName"
                :value="item.tenantId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" class="search" @click="hscsSearch">搜索</el-button>
        </el-form>
        <div class="hscsTable">
          <el-table
            :data="hscsTableData"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
            height="232"
            size="mini"
            :cell-style="{height:'35px',padding:'5px 0px'}"
            style="width: 100%"
            :header-cell-style="{background:'#f8f8f9'}"
          >
            <el-table-column type="index" width="55" align="center" />
            <el-table-column prop="tenantCity" align="center" label="城市" show-overflow-tooltip />
            <el-table-column
              prop="hydrogenAbility"
              align="center"
              label="加氢站能力"
              show-overflow-tooltip
            />
            <el-table-column prop="tenantName" align="center" label="企业名称" show-overflow-tooltip />
            <el-table-column prop="file" align="center" label="附件" show-overflow-tooltip />
          </el-table>
          <div>
            <pagination
              v-show="hscsTotal>0"
              :total="hscsTotal"
              :page.sync="hscs_query.page.current"
              :limit.sync="hscs_query.page.size"
              :pageSizes="[5,10,20,30]"
              @pagination="get_hscs_list()"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="spareParts_cy">
      <div class="spcy_header">
        <span>零部件企业</span>
      </div>
      <div class="spcy_content">
        <el-form ref="spcyForm" :model="ntvpForm" label-width="100px" class="form-inline">
          <el-form-item label="企业名称：">
            <el-select v-model="ntvpForm.tenantId">
              <el-option
                v-for="(item,index) in partCompanyOptions"
                :key="index"
                :label="item.tenantName"
                :value="item.tenantId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" class="search" @click="hscsSearch">搜索</el-button>
        </el-form>
        <div class="spcyTable">
          <el-table
            ref="spcyTable"
            :data="spcyTableData"
            :height="spcyTableHeight"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
            size="mini"
            :header-cell-style="{background:'#f8f8f9'}"
          >
            <el-table-column type="index" width="55" align="center" />
            <el-table-column
              width="150"
              prop="tenantName"
              align="center"
              label="零部件企业名称"
              show-overflow-tooltip
            />
            <el-table-column
              :key="index"
              v-for="(item,index) in spcyTableColumn"
              :prop="item.prop"
              align="center"
              :label="item.label"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="isImage(scope.row,item.prop)">
                  <img
                    style="height:20px;width:22px;"
                    src="@/assets/img/pointsSettlement/file.png"
                    alt
                    @click="handleSee(scope.$index, scope.row)"
                  />
                </div>
                <template v-if="!isImage(scope.row,item.prop)">{{scope.row[item.prop]}}</template>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <pagination
              v-show="hscsTotal>0"
              :total="hscsTotal"
              :page.sync="ntvp_query.page.current"
              :limit.sync="ntvp_query.page.size"
              :pageSizes="[5,10,20,30]"
              @pagination="get_spcy_list()"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="companyChartsShow" class="liquidationSummaryCharts">
      <div class="companycharts">
        <div>
          <v-chart :autoresize="true" :options="vehicleCompay"></v-chart>
        </div>
        <div>
          <v-chart :autoresize="true" :options="hydrogenationStationCompay"></v-chart>
        </div>
      </div>
    </div>
    <div class="declareFooter">
      <el-button class="subStorage" @click="subStorage">暂 存</el-button>
      <el-button class="submit" @click="submit">提 交</el-button>
    </div>
  </div>
</template>
<script>
import {
  getVehicleList,
  getSite,
  getComponent,
  getProvince,
  addAwaitSettlement,
  getCompanyNameOption,
  getToBeSettledVehicleList,
  cancelToBeSettledVehicleList,
  stash,
  submit,
} from "@/assets/api/declare.js";
import Pagination from "@/components/common/Pagination";
export default {
  name: "",
  data() {
    return {
      tab: 1,
      options: [],
      condition: {
        year: "",
        provinceId: "",
      },
      ntvpForm: {},
      hscsForm: {},

      ntvpSelectData: [], //选中的车辆数据
      toBeSettledSelectData: [], //选中待清算数据
      vehicleCompanyOptions: [],
      siteCompanyOptions: [],
      partCompanyOptions: [],
      modelList: [
        {
          name: "货车",
          id: "1",
          value: "货车",
        },
        {
          name: "乘用车",
          id: "2",
          value: "乘用车",
        },
        {
          name: "客车",
          id: "3",
          value: "客车",
        },
      ],
      ntvpTotal: 0,
      toBeSettledTotal: 0,
      hscsTotal: 0,
      // 车辆推广当前页
      ntvp_query: {
        page: {
          current: 1,
          size: 5,
        },
        querys: {},
      },
      companyChartsShow: false, //公司报表是否显示
      //加氢站建设情况
      hscs_query: {
        page: {
          current: 1,
          size: 5,
        },
        querys: {},
      },
      //零部件企业
      ntvp_query: {
        page: {
          current: 1,
          size: 5,
        },
        querys: {},
      },
      //应用推广车辆数据
      ntvpTableData: [],
      ntvpTableColumn: [],
      spcyTableColumn: [],
      //待清算数据
      toBeSettledTableData: [],
      // 加氢站建设情况
      hscsTableData: [],
      //零部件
      spcyTableData: [],
      ntvpTableHeight: 225,
      spcyTableHeight: 225,
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
            data: [],
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
            data: [],
          },
        ],
      },
      loaddingIndex:0,
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
            data: [],
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
            data: [],
          },
        ],
      },
    };
  },
  components: {
    Pagination,
  },
  methods: {
    isImage(row, key) {
      let str = row[key];
      if (str && (str.indexOf("jpg") !== -1 || str.indexOf("png") !== -1)) {
        return true;
      } else {
        return false;
      }
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "grey-row";
      } else {
        return "white-row";
      }
    },

    //格式化车型
    vecClassFormatter(row) {
      if (row.vecClass === "1") {
        return "货车";
      } else if (row.vecClass === "2") {
        return "乘用车";
      } else if (row.vecClass === "3") {
        return "客车";
      }
    },
    //车辆table表格选项改变
    ntvpSelectionChange(selection) {
      this.ntvpSelectData = selection;
    },
    //待清算选择
    toBeSettledSelectionChange(selection) {
      this.toBeSettledSelectData = selection;
    },
    getNoSelect(currentData, selection) {},
    addSettled() {
      if (this.ntvpSelectData.length > 0) {
        addAwaitSettlement(this.ntvpSelectData).then((res) => {
          if (res.ok) {
            this.$message.success("加入成功");
            this.getVehicleList();
            this.getToBeSettledVehicleList();
          }
        });
      } else {
        this.$message.warning("请选择加入待清算车辆信息");
      }
    },
    cancelSettled() {
      let ids = this.toBeSettledSelectData.map((item) => {
        return item.id;
      });
      let params = {
        ids: ids,
        year: this.condition.year,
      };
      cancelToBeSettledVehicleList(params).then((res) => {
        if (res.ok) {
          this.$message.success("取消成功");
          this.getVehicleList();
          this.getToBeSettledVehicleList();
        }
      });
    },
    provinceChange() {
      this.getVehicleList();
      this.getSite();
      this.getComponent();
      this.getToBeSettledVehicleList();
      this.getCompanyNameOption();
      this.companyChartsShow = false;
    },
    yearChange() {
      this.getVehicleList();
      this.getComponent();
      this.getToBeSettledVehicleList();
      this.companyChartsShow = false;
    },
    //获取新技术的车辆推广数据
    getVehicleList() {
      let params = {
        provinceId: this.condition.provinceId,
        year: this.condition.year,
        size: this.ntvp_query.page.size,
        current: this.ntvp_query.page.current,
      };
      params = Object.assign(params, this.vehicleSearchCondition);
      getVehicleList(params).then((res) => {
        this.ntvpStorageData = res.data.data;
        if (res.data.data.length > 0) {
          this.ntvpTableData = this.restructureVehicleList(
            res.data.data,
            "extras"
          );
          this.ntvpTableColumn = res.data.data[0].extras.map((item) => {
            return {
              label: item.name,
              prop: item.id,
            };
          });
          this.$nextTick(() => {
            this.$refs.ntvpTable.doLayout();
            let height = document.querySelectorAll(
              ".el-table__header-wrapper"
            )[0].offsetHeight;
            this.ntvpTableHeight = height + 215;
          });
        } else {
          this.ntvpTableData = [];
        }
        this.ntvpTotal = Number(res.data.total);
      });
    },
    restructureVehicleList(data, extras) {
      let newData = [];
      data.forEach((item) => {
        let obj = {};
        item[extras].forEach((itemChild) => {
          obj[itemChild.id] = itemChild.value;
        });
        newData.push(Object.assign(item, obj));
      });

      return newData;
    },
    //获取待清算推广数据
    getToBeSettledVehicleList() {
      let params = {
        provinceId: this.condition.provinceId,
        year: this.condition.year,
        size: this.ntvp_query.page.size,
        current: this.ntvp_query.page.current,
      };
      getToBeSettledVehicleList(params).then((res) => {
        this.toBeSettledTableData = this.restructureVehicleList(
          res.data.data,
          "extras"
        );
        this.toBeSettledTotal = Number(res.data.total);
      });
    },
    //获取加氢站列表
    getSite() {
      let params = {
        provinceId: this.condition.provinceId,
        size: this.hscs_query.page.size,
        current: this.hscs_query.page.current,
      };
      getSite(params).then((res) => {
        this.hscsTableData = res.data.data;
        this.hscsTotal = Number(res.data.total);
      });
    },
    getComponent() {
      let params = {
        provinceId: this.condition.provinceId,
        size: this.ntvp_query.page.size,
        current: this.ntvp_query.page.current,
        year: this.condition.year,
      };
      getComponent(params).then((res) => {
        if (res.data.data.length > 0) {
        }
        this.spcyTableData = this.restructureVehicleList(
          res.data.data,
          "properties"
        );
        this.spcyTableColumn = res.data.data[0].properties.map((item) => {
          return {
            label: item.name,
            prop: item.id,
          };
        });
        this.$nextTick(() => {
          this.$refs.spcyTable.doLayout();
          this.spcyTableHeight =
            document.querySelectorAll(".el-table__header-wrapper")[3]
              .offsetHeight + 220;
        });
      });
    },
    getCompanyNameOption() {
      let params1 = {
        provinceId: this.condition.provinceId,
        tenantType: 4,
      };
      getCompanyNameOption(params1).then((res) => {
        this.vehicleCompanyOptions = res.data;
      });
      let params3 = {
        provinceId: this.condition.provinceId,
        tenantType: 5,
      };
      getCompanyNameOption(params3).then((res) => {
        this.partCompanyOptions = res.data;
      });
      let params2 = {
        provinceId: this.condition.provinceId,
        tenantType: 6,
      };
      getCompanyNameOption(params2).then((res) => {
        this.siteCompanyOptions = res.data;
      });
    },
    // 暂存状态
    subStorage() {
      let params = {
        areaId: this.condition.provinceId,
        year: this.condition.year,
      };
      stash(params).then((res) => {
        if (res.ok) {
          let hDataName = [];
          let hData = [];
          let vDataName = [];
          let vData = [];
          this.companyChartsShow = true;
          res.data.hydrogenStationScores.forEach((item) => {
            hDataName.push(item.name);
            hData.push(item.score);
          });
          res.data.vehicleTenantScores.forEach((item) => {
            vDataName.push(item.name);
            vData.push(item.score);
          });
          this.vehicleCompay.xAxis[0].data = vDataName;
          this.vehicleCompay.series[0].data = vData;
          this.hydrogenationStationCompay.xAxis[0].data = hDataName;
          this.hydrogenationStationCompay.series[0].data = hData;
          this.$message.success("暂存成功");
        }
      });
    },
    //提交
    submit() {
      submit().then((res) => {
        if (res.ok) {
          this.$message.success("提交成功");
        }
      });
    },
    //应用新技术的车辆推广条件搜索
    ntvpSearch() {
      this.vehicleSearchCondition = JSON.parse(JSON.stringify(this.ntvpForm));
      this.getVehicleList();
    },
    get_ntvp_list() {},
    get_hscs_list() {},
    get_spcy_list() {},
    //点击查看图片
    handleSee() {},
    handleTabMonitorVehicle() {
      this.tab = 1;
    },
    handleTabSettled() {
      this.tab = 2;
    },
    // 车辆推广当前页改变
    ntvp_current_change() {},
    ntvp_size_change() {},
    hscsSearch() {},
    //加氢站分页改变
    hscs_current_change() {},
    hscs_size_change() {},
    //零部件分页改变
    spcy_current_change() {},
    spcy_size_change() {},
  },
  created() {
    getProvince().then((res) => {
      this.options = res.data;
      this.condition.provinceId = this.options[0].id;
      this.condition.year = new Date().getFullYear().toString();
      this.getVehicleList(); //获取车辆列表
      this.getToBeSettledVehicleList();
      this.getSite(); //获取加氢站
      this.getComponent(); //获取公司零部件
      this.getCompanyNameOption(); //获取公司名称列表
    });
  },
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1540px) {
  .form-inline {
    .el-form-item {
      display: inline-block;
      .el-input {
        width: 190px;
      }
      .el-select {
        width: 190px;
      }
    }
  }
}
/deep/.el-table .grey-row {
  background: #fafafa;
}
/deep/.el-table .white-row {
  background: #ffffff;
}

.declareContent {
  height: 100%;
  overflow: auto;
  .tableBtn {
    color: #4a90e2;
    background-color: #f4fbff;
    border: 1px solid #bee3ff;
    border-radius: 5px;
  }
  .area {
    background-color: #ffffff;
    margin-bottom: 10px;
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
      }
      .search {
        margin-left: 10px;
      }
    }
  }
  .policyUpload {
    margin-left: 10px;
  }
  .uploadContent {
    .title {
      font-size: 16px;
      font-weight: 600;
      margin-left: 15px;
      margin-top: 12px;
    }
    > div {
      display: inline-block;
      width: calc(50% - 5px);
      position: relative;
      background-color: #ffffff;
      height: 205px;
      .uploadBtn {
        width: 284px;
        height: 118px;
        position: absolute;
        top: 57px;
        left: 50%;
        transform: translateX(-50%);
        background: #fafafa;
        text-align: center;
        img {
          height: 38px;
          width: 38px;
          margin-top: 15px;
        }
        .upName {
          color: #333333;
          font-size: 14px;
          line-height: 24px;
        }
        .upTooltip {
          color: #999999;
          line-height: 22px;
          font-size: 14px;
        }
      }
    }
  }
  .newTechnology_vp {
    background-color: #ffffff;
    margin-top: 10px;
    .ntvp_header {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
      font-weight: 600;
      .ntvp_tabs {
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
      }
      .monitorVehicle {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        padding-top: 0;
        padding-bottom: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .toBeSettled {
        margin-left: -1px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        height: 40px;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 40px;
        text-align: center;
        span {
          display: inline-block;
          // height: 18px;
          // width: 18px;
          border-radius: 50%;
          font-size: 12px;
          background: #ff7168;
          padding-left: 3px;
          padding-right: 3px;
          color: #ffffff;
          line-height: 18px;
        }
      }
      .actived {
        color: #1989fa;
      }
    }
    .ntvp_content {
      margin-top: 20px;
      padding-bottom: 10px;
      .ntvpTable {
        margin: 0px 10px;
      }
      .form-inline {
        .el-form-item {
          display: inline-block;
        }
        .search {
          margin-left: 10px;
        }
        .ntvp_handle {
          margin-right: 10px;
          float: right;
          color: #4a90e2;
          background-color: #f4fbff;
          border-color: #bee3ff;
        }
      }
    }
  }
  .hydrogenationStation_cs {
    background-color: #ffffff;
    margin-top: 10px;
    .hscs_header {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
      font-weight: 600;
    }
    .hscs_content {
      margin-top: 20px;
      padding-bottom: 10px;
      .hscsTable {
        margin: 0px 10px;
      }
      .form-inline {
        .el-form-item {
          display: inline-block;
        }
        .search {
          margin-left: 10px;
        }
      }
    }
  }
  .spareParts_cy {
    background-color: #ffffff;
    margin-top: 10px;
    .spcy_header {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
      font-weight: 600;
    }
    .spcy_content {
      margin-top: 20px;
      padding-bottom: 10px;
      .spcyTable {
        margin: 0px 10px;
      }
      .form-inline {
        .el-form-item {
          display: inline-block;
        }
        .search {
          margin-left: 10px;
        }
      }
    }
  }
  .liquidationSummaryCharts {
    height: 337px;
    margin-bottom: 10px;
    background-color: #ffffff;
    margin-top: 10px;
    .echarts {
      height: 100%;
      width: 100%;
    }
    .companycharts {
      height: 100%;
      > div {
        display: inline-block;
        width: 50%;
        height: 100%;
      }
    }
  }
  .declareFooter {
    margin: 10px;
    text-align: center;
    .subStorage {
      background: #e3f3ff;
      border-color: #4a90e2;
      width: 184px;
      color: #4a90e2;
    }
    .submit {
      background: #0081d1;
      color: #ffffff;
      width: 184px;
    }
  }
}
</style>