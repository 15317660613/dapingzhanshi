<template>
  <div class="content">
    <div class="table-wrapper">
      <div class="tool-btn-group">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleCreate">新建</el-button>
        <!--        <el-button size="mini">批量操作</el-button>-->
        <el-button size="mini" type="primary" plain @click="startProcess">提交</el-button>
        <el-button size="mini" @click="recall">撤销</el-button>
        <el-button size="mini" type="danger" plain @click="handleDelete">删除</el-button>
        <div style="float: right">
          <el-input placeholder="请输入内容" v-model="vehicleNum" class="input-with-select" size="mini">
            <el-button slot="append" icon="el-icon-search" size="mini" type="primary" @click="handleFilter">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="lineBlock">
        <div style="padding-left:3%"><img src="@/assets/img/shape.png"> 已选择 <span style="color:#1890FF">{{selitme}}</span> 项</div>
      </div>
      <el-table :data="tableData" border style="width: 100%" stripe class="table-fixed" @selection-change="handleSelectionChange" :max-height="tableHeight">
        <el-table-column label="" type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="tenantName" label="车企" align="center"></el-table-column>
        <el-table-column prop="vehicleNum" label="车牌号" align="center"></el-table-column>
        <el-table-column prop="vehicleModel" label="车型" align="center"></el-table-column>
        <el-table-column prop="vin" label="车辆VIN码" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <span class="statusCircle" v-if="row.status==='0'" style="background-color: #B6B6B6"></span>
            <span class="statusCircle" v-if="row.status==='1'" style="background-color: #00B589"></span>
            <span class="statusCircle" v-if="row.status==='2'" style="background-color: #FD472B"></span>
            <span class="statusCircle" v-if="row.status==='3'" style="background-color: #3391EC"></span>
            {{row.status | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="viewDetail(scope.$index, scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="queryObj.page.current" :limit.sync="queryObj.page.size"
                  @pagination="getLBJList()"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" v-if="dialogVisible" :visible.sync="dialogVisible" width="741px" :modal-append-to-body="false">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" style="margin:0 20px;" :disabled="dialogStatus==='view'">
        <div class="modelInput">
          <div style="margin-right: 12px;display: inline-block;border-left: 2px solid #2B60A6;padding-left: 10px;"><span style="color:red">* </span>车型信息</div>
          <el-select v-model="temp.vehicleModelId" placeholder="请选择" @change="modelChange">
            <el-option v-for="(item, index) in modelList" :label="item.model" :value="item.id"></el-option>
          </el-select>
          <div class="partsDetail" v-if="modelInfo.length>0">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <el-row style="width: 100%">
                    <el-col :span="12">
                      {{modelInfo[0].name + ' : ' + modelInfo[0].value}}
                    </el-col>
                  </el-row>
                </template>
                <el-row>
                  <el-col style="margin-bottom: 5px" :span="12" v-for="(item, index) in modelInfo" v-if="item.value">
                    {{item.name + ' : ' + item.value}}
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <el-divider></el-divider>
        <div v-for="(item, index) in temp.properties">
          <div class="titleInfo">{{item.name}}</div>
          <el-row :gutter="20">
            <el-col :span="12" v-if="item.id==='201'">
              <el-form-item label="车辆VIN码" required>
                <el-input v-model="temp.vin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="item.id==='201'">
              <el-form-item label="车辆牌照" required>
                <el-input v-model="temp.vehicleNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="item.id==='204'">
              <el-form-item label="终端编号" required>
                <el-input v-model="temp.terminalId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :class="item.id==='2' ? 'fullWidthInput' : ''" :span="item1.type==='4' ? 24 : 12" v-for="(item1, index1) in item.children">
              <el-form-item :label="item1.name">
                <el-input v-if="item1.type==='0'" v-model="item1.value"></el-input>
                <el-select v-else-if="item1.type==='1'" v-model="item1.value" placeholder="请选择">
                  <el-option v-for="(item2, index2) in item1.dropDownData.split('-')" :label="item2" :value="item2"></el-option>
                </el-select>
                <div v-if="item1.type==='4'">
                  <span class="fileName" v-if="item1.value">{{item1.value.split(";")[1]}}</span>
                  <el-upload class="upload-demo" action="/api-server/upload" style="margin-left: 10px" :on-success="uploadSuccess"
                             :multiple="false" :show-file-list="false" :beforeUpload="beforeAvatarUpload">
                    <el-button size="mini" icon="el-icon-upload2" type="info" style="background-color: rgba(41,194,147,0.27);border: #18C392;color: #29C293"
                               @click="changeUploadFileId(item1.id)">上传
                    </el-button>
                    <!--                  <div v-if="temp.property[index + 1]['value'] !== ''"><i class="el-icon-document"></i> {{temp.property[index + 1]['value'].split(';')[1]}}</div>-->
                  </el-upload>
                  <el-button size="mini" icon="el-icon-delete" type="danger" plain style="margin: 0 10px;" @click="deleteUploadFile(item1)">删除</el-button>
                  <span style="color:#999999">支持jpg，png，pdf</span>
                </div>
                <el-date-picker v-if="item1.type==='5'" v-model="item1.value" placeholder="选择日期" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addVehicle():updateVehicle()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {
        getVehicleField,
        getVehicleListByPage,
        getModelListByPage,
        getModelDetail,
        addVehicle,
        editVehicle,
        getVehicleDetail,
        deleteVehicle
    } from '@/assets/api/stationDeclaration'
    import {startProcessBatch, vehicleRecall} from '@/assets/api/process'
    import Pagination from '@/components/common/Pagination'

    export default {
        name: "vehicle",
        filters: {
            statusFilter(type) {
                const keyValue = {
                    0: '草稿',
                    1: '批准',
                    2: '拒绝',
                    3: '审批中'
                };
                return keyValue[type]
            }
        },
        components: {
            Pagination
        },
        data() {
            return {
                istrue: 0,
                total: 0,
                tableData: [],
                tableHeader: [],
                vehicleNum: '',
                queryObj: {
                    page: {
                        current: 1,
                        size: 10
                    },
                    querys: [
                        {
                            like: {
                                vehicleNum: ""
                            }
                        }
                    ]
                },
                temp: {
                    id: '',
                    properties: [],
                    vehicleNum: '',
                    vin: '',
                    vehicleModelId: '',
                    terminalId: ''
                },
                dialogVisible: false,
                uploadFlag: '',
                modelList: [],
                modelInfo: [],
                dialogStatus: '',
                textMap: {
                    update: '修改车辆',
                    create: '新增车辆',
                    view: '查看车辆详情'
                },
                multipleSelection: [],
                selitme: 0,
                tableHeight: window.innerHeight - 337
            }
        },
        mounted() {
            this.init();
            this.$nextTick(function () {
                // 监听窗口大小变化
                let self = this;
                window.onresize = function () {
                    self.tableHeight = window.innerHeight - 337
                }
            })
        },
        methods: {
            init() {
                this.getTableHeader();
                this.getLBJList();
                this.getModelList();
            },
            getModelList() {
                getModelListByPage({querys: [{eq: {status: 1}}]}).then((res) => {
                    this.modelList = res.data.records;
                })
            },
            getTableHeader(data) {
                getVehicleField(data).then((res) => {
                    this.temp.properties = [];
                    for (let i = 0; i < res.data.properties.length; i++) {
                        this.temp.properties.push({
                            id: res.data.properties[i].id, value: '', name: res.data.properties[i].name, defaultValue: res.data.properties[i].defaultValue,
                            children: res.data.properties[i].children
                        })
                        if (res.data.properties[i].id === '2') {
                            for (let j = 0; j < res.data.properties[i].children.length; j++) {
                                res.data.properties[i].children[j].dataSources && this.getFieldList(res.data.properties[i].children[j].dataSources)
                            }
                        }
                    }
                })
            },
            handleFilter() {
                this.queryObj.page.current = 1;
                this.queryObj.querys[0].like.vehicleNum = this.vehicleNum;
                this.getLBJList()
            },
            getLBJList() {
                this.tableData = [];
                getVehicleListByPage(this.queryObj).then((res) => {
                    this.tableData = res.data.records;
                    this.total = parseInt(res.data.total);
                })
            },
            handleCreate() {
                this.dialogVisible = true;
                this.dialogStatus = 'create';
                this.temp.vehicleNum = '';
                this.temp.vin = '';
                this.temp.vehicleModelId = '';
                this.temp.terminalId = '';
                this.modelInfo = [];
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        this.temp.properties[i].children[j].value = '';
                    }
                }
            },
            isUpload(id) {
                if (id === 'LBJ_FDJPRODUCT' || id === 'LBJ_FDJMODE' || id === 'LBJ_FDJSTARTTEMPRETURE' || id === 'LBJ_FDJRATEDPOWER' || id === 'LBJ_FDJDENITY') {
                    return true;
                } else {
                    return false;
                }
            },
            addVehicle() {
                if (this.temp.vehicleModelId === '' || this.temp.vehicleModelId === null) {
                    return this.$message.error('车型信息不能为空')
                }
                if (this.temp.vehicleNum === '' || this.temp.vehicleNum === null) {
                    return this.$message.error('车辆牌照不能为空')
                }
                if (this.temp.vin === '' || this.temp.vin === null) {
                    return this.$message.error('车辆VIN码不能为空')
                }
                if (this.temp.terminalId === '' || this.temp.terminalId === null) {
                    return this.$message.error('终端编号不能为空')
                }
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        if (this.temp.properties[i].children[j].value === '' || this.temp.properties[i].children[j].value === null) {
                            return this.$message.error(this.temp.properties[i].children[j].name + '不能为空')
                        }
                    }
                }
                addVehicle(this.temp).then(() => {
                    this.getLBJList();
                    this.dialogVisible = false;
                    return this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                })
            },
            uploadSuccess(res, file, fileList) {
                if (res.ok) {
                    this.$message.success("上传成功")
                    for (let i = 0; i < this.temp.properties.length; i++) {
                        for (let j = 0; i < this.temp.properties[i].children.length; j++) {
                            if (this.temp.properties[i].children[j].id === this.uploadFlag) {
                                this.temp.properties[i].children[j].value = res.data.id + ';' + res.data.name;
                            }
                        }
                    }
                } else {
                    this.$message.error(res.message)
                }
            },
            changeUploadFileId(id) {
                this.uploadFlag = id;
            },
            deleteUploadFile(item1) {
                item1.value = ''
            },
            modelChange(val) {
                this.modelInfo = [];
                getModelDetail(val).then((res) => {
                    for (let i = 0; i < res.data.properties.length; i++) {
                        this.modelInfo = this.modelInfo.concat(res.data.properties[i].children)
                    }
                })
            },
            async handleEdit(index, row) {
                this.dialogStatus = 'update';
                await getVehicleDetail(row.id).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.vehicleModelId = res.data.vehicleModelId;
                    this.temp.vehicleNum = res.data.vehicleNum;
                    this.temp.vin = res.data.vin;
                    this.temp.terminalId = res.data.terminalId;
                    this.temp.properties = res.data.properties;
                    this.temp.model = res.data.model;
                })
                this.modelChange(this.temp.vehicleModelId);
            },
            updateVehicle() {
                if (this.temp.vehicleModelId === '' || this.temp.vehicleModelId === null) {
                    return this.$message.error('车型信息不能为空')
                }
                if (this.temp.vehicleNum === '' || this.temp.vehicleNum === null) {
                    return this.$message.error('车辆牌照不能为空')
                }
                if (this.temp.vin === '' || this.temp.vin === null) {
                    return this.$message.error('车辆VIN码不能为空')
                }
                if (this.temp.terminalId === '' || this.temp.terminalId === null) {
                    return this.$message.error('终端编号不能为空')
                }
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        if (this.temp.properties[i].children[j].value === '' || this.temp.properties[i].children[j].value === null) {
                            return this.$message.error(this.temp.properties[i].children[j].name + '不能为空')
                        }
                    }
                }
                let params = Object.assign({}, this.temp);
                params.properties = [];
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        params.properties.push(this.temp.properties[i].children[j])
                    }
                }
                console.log(params)
                editVehicle(params).then(() => {
                    // this.resetQuery();
                    this.getLBJList();
                    this.dialogVisible = false;
                    return this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
            },
            async viewDetail(index, row) {
                this.dialogStatus = 'view';
                await getVehicleDetail(row.id).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.vehicleModelId = res.data.vehicleModelId;
                    this.temp.vehicleNum = res.data.vehicleNum;
                    this.temp.vin = res.data.vin;
                    this.temp.terminalId = res.data.terminalId;
                    this.temp.properties = res.data.properties;
                    this.temp.model = res.data.model;
                })
                this.modelChange(this.temp.vehicleModelId);
            },
            handleSelectionChange: function (val) {
                this.selitme = val.length;
                this.multipleSelection = val;
            },
            handleDelete() {
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status === '3' || this.multipleSelection[i].status === '1') {
                        return this.$message({
                            message: '选中数据中包含已提交或审批通过的数据，请重新选择',
                            type: 'warning'
                        });
                    }
                    ids.push(this.multipleSelection[i].id);
                }
                this.$confirm('是否确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteVehicle(ids).then(() => {
                        this.getLBJList();
                        return this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    })
                })
            },
            startProcess() {
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status === '3' || this.multipleSelection[i].status === '1') {
                        return this.$message({
                            message: '选中数据中包含已提交或审批通过的数据，请重新选择',
                            type: 'warning'
                        });
                    }
                    ids.push(this.multipleSelection[i].id);
                }
                this.$confirm('是否确认提交', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    startProcessBatch('VEHICLE_REGIST', {businessKeyArray: ids}).then(() => {
                        this.getLBJList();
                        return this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                    })
                })
            },
            beforeAvatarUpload(file) {
                // if ((file.size / 1024) / 1024 > 150) {
                //     this.$message.error('上传文件不能超过150M');
                //     return false;
                // }
                let isJPG;
                isJPG = (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png');
                // const isLt2M = file.size / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('文件类型错误，上传图片只能是PDF/JPG/PNG格式');
                }
                return isJPG;
            },
            recall() {
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].status !== '3') {
                        return this.$message({
                            message: '选中数据中包含未提交或已审批的数据，请重新选择',
                            type: 'warning'
                        });
                    }
                    ids.push(this.multipleSelection[i].transcationId);
                }
                this.$confirm('是否确认撤销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vehicleRecall({processInstanceIdList: ids}).then(() => {
                        this.getLBJList();
                        return this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .content {
    margin: 10px;
    background-color: #FFF;
    height: calc(100% - 70px);
    /*padding: 20px 30px;*/
    position: relative;
  }

  .table-wrapper {
    padding: 30px;
  }

  .table-wrapper .tool-btn-group {
    margin-bottom: 10px;
  }

  .table-fixed /deep/ .el-table__fixed-right {
    height: 100% !important;
  }

  .table-fixed /deep/ .el-table__fixed {
    height: 100% !important;
  }

  .upload-demo {
    display: inline-block;
  }

  /deep/ .el-dialog__footer {
    text-align: center;
  }

  .input-with-select /deep/ .el-input-group__append {
    background-color: #4A90E2;
    color: #FFF;
  }

  .statusCircle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff0000;
  }

  .titleInfo {
    border-left: 2px solid #2B60A6;
    padding-left: 10px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  /deep/ .el-form-item {
    display: flex;
  }

  /deep/ .el-form-item__label-wrap {
    width: auto !important;
    margin-left: 0 !important;
    white-space: nowrap;
  }

  /deep/ .el-form-item__content {
    margin-left: 0 !important;
    flex: 1;
  }

  .fullWidthInput /deep/ .el-form-item__content {
    flex: none;
  }

  /deep/ .el-form-item__content .el-select {
    width: 100%;
  }

  .modelInput {
    margin-bottom: 10px;
  }

  .partsDetail {
    background-color: rgba(211, 217, 226, 0.16);
    padding: 0 15px;
    margin: 20px 0;
  }

  .partsDetail /deep/ .el-collapse, .partsDetail /deep/ .el-collapse-item__header {
    border: none;
  }

  .partsDetail /deep/ .el-collapse-item__header, .partsDetail /deep/ .el-collapse-item__wrap {
    background-color: transparent;
  }

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  .fileName {
    text-align: center;
    display: inline-block;
    border: 1px solid #DDDDDD;
    background-color: #F5F5F5;
    line-height: 1;
    font-size: 12px;
    padding: 6px 15px;
    border-radius: 3px;
  }

  .lineBlock {
    background-color: #E6F7FF;
    border: #BAE7FF solid 1px;
    padding: 10px 0;
    border-radius: 5px;
    margin: 15px 0;
  }
</style>
