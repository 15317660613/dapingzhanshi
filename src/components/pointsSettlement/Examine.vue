<template>
  <div class="Examine">
    <div class="exmineDemonstrationArea">
      <div class="areaInfo">
        <div>
          <div class="title">示范地区</div>
          <el-form ref="ntvpForm" :model="condition" label-width="100px" class="form-inline">
            <el-form-item label="地区：">
              <el-select v-model="condition.provinceId" placeholder="请选择" @change="provinceChange">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年份">
              <el-date-picker
                v-model="condition.year"
                type="year"
                @change="yearChange"
                value-format="yyyy"
                placeholder="选择年"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <div class="content-item">
                <span>氢能供给保障</span>
                <el-button>
                  <img src="@/assets/img/pointsSettlement/file.png" alt />氢能供给保障证明材料附件详情
                </el-button>
                <span style="margin-left:50px;">打分</span>
                <el-input v-model="hEnergySupply" placeholder="请输入"></el-input>
                <span>500～800</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="content-item">
                <span>政策支持体系证明材料附件详情</span>
                <el-button>
                  <img src="@/assets/img/pointsSettlement/file.png" alt />政策支持体系证明材料附件详情
                </el-button>
                <span style="margin-left:50px;">打分</span>
                <el-input v-model="pREnvironment" placeholder="请输入"></el-input>
                <span>500～800</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="newTechnology_vp">
      <div class="vpc_header">
        <span>车辆生产企业</span>
        <div class="batch_module">
          <el-button class="agree" @click="vpcBatchHandle">同意</el-button>
          <el-button class="monitorVehicle" @click="vpcBatchHandle">不同意</el-button>
        </div>
      </div>
      <div class="vpc_content">
        <div class="vpcTable">
          <el-table
            :data="vpcTableData"
            tooltip-effect="dark"
            :row-class-name="tableRowClassName"
            size="mini"
            :cell-style="{height:'35px',padding:'5px 0px'}"
            style="width: 100%"
            :header-cell-style="{background:'#f8f8f9'}"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              width="100"
              prop="company"
              align="center"
              label="车辆生产企业"
              show-overflow-tooltip
            />
            <el-table-column prop="vin" align="center" label="车辆VIN码" show-overflow-tooltip />
            <el-table-column prop="plateNumber" align="center" label="车辆牌照" show-overflow-tooltip />
            <el-table-column prop="model" align="center" label="车辆型号" show-overflow-tooltip />
            <el-table-column prop="buyCity" align="center" label="购买城市" show-overflow-tooltip />
            <el-table-column prop="type" align="center" label="车辆种类" show-overflow-tooltip />
            <el-table-column
              width="100"
              prop="invoice"
              align="center"
              label="车辆发票号"
              show-overflow-tooltip
            />
            <el-table-column width="100" label="车辆发票图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column width="100" label="行驶证图片" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              prop="maxDesignWeight"
              align="center"
              label="最大设计重量"
              show-overflow-tooltip
            />
            <el-table-column
              width="100"
              prop="yqxslc"
              align="center"
              label="用氢行驶里程"
              show-overflow-tooltip
            />
            <el-table-column width="100" label="质保证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
                <!-- <el-button size="mini" @click="handleSee(scope.$index, scope.row)">点查附件</el-button> -->
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              prop="qddjxh"
              align="center"
              label="驱动电机型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="qddjscqy"
              align="center"
              label="驱动点击生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="qddjedgl"
              align="center"
              label="驱动电机额定功率"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="rldcxh"
              align="center"
              label="燃料电池型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="rldcscqy"
              align="center"
              label="燃料电池生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="rldcedgl"
              align="center"
              label="燃料电池额定功率"
              show-overflow-tooltip
            />
            <el-table-column
              width="100"
              prop="cqxhlc"
              align="center"
              label="纯氢续驶里程"
              show-overflow-tooltip
            />
            <el-table-column
              width="150"
              prop="qrldcfdjxh"
              align="center"
              label="氢燃料电池发动机型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="170"
              prop="qrldcfdjscqy"
              align="center"
              label="氢燃料电池发动机生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="120"
              prop="rldcqdwd"
              align="center"
              label="燃料电池启动温度"
              show-overflow-tooltip
            />
            <el-table-column
              width="110"
              prop="dcdglmd"
              align="center"
              label="电池堆功率密度"
              show-overflow-tooltip
            />

            <el-table-column
              width="100"
              prop="xtglmd"
              align="center"
              label="系统功率密度"
              show-overflow-tooltip
            />
            <el-table-column
              width="110"
              prop="zzjhmxh"
              align="center"
              label="质子交换膜型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="130"
              prop="zzjhmscqy"
              align="center"
              label="质子交换膜生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="110"
              prop="kqysjxh"
              align="center"
              label="空气压缩机型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="130"
              prop="kqysjscqy"
              align="center"
              label="空气压缩机生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="110"
              prop="qqxhbxh"
              align="center"
              label="氢气循环泵型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="130"
              prop="qqxhbcsqy"
              align="center"
              label="氢气循环泵生产企业"
              show-overflow-tooltip
            />
            <el-table-column
              width="80"
              prop="qpxh"
              align="center"
              label="气瓶型号"
              show-overflow-tooltip
            />
            <el-table-column
              width="100"
              prop="qpscqy"
              align="center"
              label="气瓶生产企业"
              show-overflow-tooltip
            />
            <el-table-column label="详情" align="center">
              <template slot-scope="scope">
                <div class="tableBtn" @click="handleSee(scope.$index, scope.row)">点击查看</div>
              </template>
            </el-table-column>
            <el-table-column label="积分" align="center" prop="jifen" show-overflow-tooltip />
          </el-table>
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
            <el-select v-model="hscsForm.companyName" filterable placeholder="请选择">
              <el-option
                v-for="item in companyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" class="search" @click="hscsSearch">搜索</el-button>
          <div class="batch_module">
            <el-button class="agree" @click="vpcBatchHandle">同意</el-button>
            <el-button class="monitorVehicle" @click="vpcBatchHandle">不同意</el-button>
          </div>
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
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="city" align="center" label="城市" show-overflow-tooltip />
            <el-table-column
              prop="hydrogenation"
              align="center"
              label="加氢站能力"
              show-overflow-tooltip
            />
            <el-table-column prop="companyName" align="center" label="企业名称" show-overflow-tooltip />
            <el-table-column prop="file" align="center" label="附件" show-overflow-tooltip />
            <el-table-column label="行驶证图片" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
                <!-- <el-button size="mini" @click="handleSee(scope.$index, scope.row)">点查附件</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="spareParts_cy">
      <div class="spcy_header">
        <span>零部件企业</span>
      </div>
      <div class="spcy_content">
        <el-form ref="spcyForm" :model="spcyForm" label-width="100px" class="form-inline">
          <el-form-item label="企业名称：">
            <el-select v-model="spcyForm.companyName" filterable placeholder="请选择">
              <el-option
                v-for="item in companyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" class="search" @click="hscsSearch">搜索</el-button>
        </el-form>
        <div class="spcyTable">
          <el-table
            :data="spcyTableData"
            :row-class-name="tableRowClassName"
            tooltip-effect="dark"
            height="232"
            size="mini"
            :cell-style="{height:'35px',padding:'5px 0px'}"
            style="width: 100%"
            :header-cell-style="{background:'#f8f8f9'}"
          >
            <el-table-column type="index" width="55" align="center" />
            <el-table-column
              width="150"
              prop="city"
              align="center"
              label="零部件企业基本信息"
              show-overflow-tooltip
            />
            <el-table-column
              width="150"
              prop="hydrogenation"
              align="center"
              label="氢燃料电池发动机型号"
              show-overflow-tooltip
            />
            <el-table-column width="190" label="氢燃料电池发动机创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              width="120"
              align="center"
              label="燃料电池堆型号"
              show-overflow-tooltip
            />
            <el-table-column width="160" label="燃料电池堆创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              width="120"
              align="center"
              label="质子交换膜型号"
              show-overflow-tooltip
            />
            <el-table-column width="160" label="质子交换膜创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              width="120"
              align="center"
              label="空气压缩机型号"
              show-overflow-tooltip
            />
            <el-table-column width="160" label="空气压缩机创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              width="120"
              align="center"
              label="氢气循环泵型号"
              show-overflow-tooltip
            />
            <el-table-column width="160" label="氢气循环泵创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              width="120"
              align="center"
              label="气瓶型号"
              show-overflow-tooltip
            />
            <el-table-column width="160" label="气瓶创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column width="160" label="气瓶创新证明材料" align="center">
              <template slot-scope="scope">
                <img
                  style="height:20px;width:22px;"
                  src="@/assets/img/pointsSettlement/file.png"
                  alt
                  @click="handleSee(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column width="220" fixed="right" class="jifen" label="积分" align="center">
              <template slot-scope="scope">
                <div class="approval">
                  <el-input placeholder="请输入分值" v-model="scope.row.jifen"></el-input>
                  <span style="margin-left:10px">500～1000</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 30px;">
            <el-pagination
              background
              :page-sizes="[5, 10, 15,20, 30]"
              layout="total, sizes, prev, pager, next,jumper"
              :total="total"
              :current-page="spcy_currentPage"
              @current-change="spcy_current_change"
              @size-change="spcy_size_change"
            />
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="审批积分" :visible.sync="dialogVisible" width="360px" :modal="false">
      <div>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="审批意见">
              <el-input type="text" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="车辆运行得分">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="车辆推广得分">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { getFileInfo } from "@/assets/api/examine.js";
export default {
  name: "Examine",
  data() {
    return {
      radio: 1,
      form: {
        batchRadio: 1,
        desc: "",
      },
      ntvpForm: {},
      vpcForm: {},
      hscsForm: {},
      spcyForm: {},
      hEnergySupply: "",
      pREnvironment: "",
      condition: {
        year: "",
        provinceId: "",
      },
      dialogVisible: false,
      options: [
      ],
      companyOptions: [
        {
          name: "北京新能源汽车股份有限公司 ",
          id: 1,
        },
      ],
      modelList: [
        {
          name: "别克",
          id: "1",
          value: "别克",
        },
        {
          name: "SUV",
          id: "2",
          value: "SUV",
        },
        {
          name: "现代",
          id: "3",
          value: "现代",
        },
      ],
      total: 5,
      // 车辆推广当前页
      vpc_currentPage: 1,
      // 加氢站当前页
      hscs_currentPage: 1,
      //零部件
      spcy_currentPage: 1,
      //应用推广车辆数据
      vpcTableData: [{}, {}],
      // 加氢站建设情况
      hscsTableData: [{}, {}, {}, {}, {}],
      //零部件
      spcyTableData: [{}, {}, {}, {}],
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
    //地区变化
    provinceChange() {
      this.getFileInfo();
    },
    // 年度变化
    yearChange() {
      this.getFileInfo();
    },
    //获取打分附件
    getFileInfo() {},
    //车辆生产企业搜索
    vpcSearch() {},
    //点击查看图片
    handleSee() {},
    handleTabMonitorVehicle() {
      this.tab = 1;
    },
    handleTabSettled() {
      this.tab = 2;
    },
    //车辆生产企业当前页改变
    vpc_current_change() {},
    vpc_size_change() {},
    //车辆生产企业批量操作
    vpcBatchHandle() {
      this.dialogVisible = true;
    },
    hscsSearch() {},
    //加氢站分页改变
    hscs_current_change() {},
    hscs_size_change() {},
    //零部件分页改变
    spcy_current_change() {},
    spcy_size_change() {},
  },
  created() {},
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
.batch_module {
  position: absolute;
  right: 10px;
  top: 10px;
  .agree {
    background: #4a90e2;
    color: #ffffff;
  }
}
.dialog-footer {
  text-align: center;
}
.Examine {
  .exmineDemonstrationArea {
    background-color: #ffffff;
    .areaInfo {
      .title {
        color: #181818;
        font-weight: 600;
        margin-left: 15px;
        height: 40px;
        line-height: 40px;
      }
      .content {
        line-height: 72px;
        .content-item {
          background-color: #fafafa;
          margin-left: 10px;
          margin-right: 10px;
          margin-bottom: 13px;
          .el-input {
            width: 78px;
          }
          .el-button {
            background-color: #dcdfe6;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            img {
              width: 20px;
              height: 22px;
              vertical-align: top;
            }
          }
        }

        span {
          color: #9b9b9b;
          margin-left: 15px;
          margin-right: 15px;
        }
      }
    }
    .form-inline {
      .el-form-item {
        display: inline-block;
      }
      .search {
        margin-left: 10px;
      }
    }
    .demonstrationAreaHandleBox {
      width: 448px;
      border-left: 1px solid #ececec;
      line-height: 112px;
      padding-left: 20px;
      .el-input {
        width: 200px;
      }
    }
  }
  .newTechnology_vp {
    background-color: #ffffff;
    margin-top: 10px;
    .vpc_header {
      position: relative;
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
      font-weight: 600;

      .actived {
        color: #1989fa;
      }
    }
    .vpc_content {
      margin-top: 20px;
      padding-bottom: 10px;
      .tableBtn {
        color: #4a90e2;
        background-color: #f4fbff;
        border: 1px solid #bee3ff;
        border-radius: 5px;
      }
      .vpcTable {
        display: inline-block;
        margin-right: 0px;
        width: calc(100% - 68px);
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
    .tableBtn {
      color: #4a90e2;
      background-color: #f4fbff;
      border: 1px solid #bee3ff;
      border-radius: 5px;
    }
    .hscs_content {
      margin-top: 20px;
      padding-bottom: 10px;
      position: relative;
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
        .approval {
          .el-input {
            width: 105px;
            height: 26px;
            /deep/.el-input__inner {
              height: 26px;
            }
          }
        }
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
}
</style>