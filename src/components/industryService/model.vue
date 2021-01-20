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
          <el-input placeholder="请输入内容" v-model="model" class="input-with-select" size="mini">
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
        <el-table-column prop="model" label="车辆型号" align="center"></el-table-column>
        <el-table-column prop="brand" label="厂牌品牌" align="center"></el-table-column>
        <el-table-column prop="business" label="整车生产企业" align="center"></el-table-column>
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

    <el-dialog :title="textMap[dialogStatus]" v-if="dialogVisible" :visible.sync="dialogVisible" width="741px" :modal-append-to-body="false"
               :close-on-click-modal="false" class="abow_dialog">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="auto" style="margin:0 20px;" :disabled="dialogStatus==='view'">
        <div v-for="(item, index) in temp.properties">
          <div class="titleInfo">{{item.name}}</div>
          <el-row :gutter="20">
            <el-col :span="12" v-if="item.id==='1'">
              <el-form-item label="车辆型号">
                <el-input v-model="temp.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="item.id==='1'">
              <el-form-item label="车辆类别">
                <el-select v-model="temp.vecClass" placeholder="请选择">
                  <el-option label="货车" :value="1"></el-option>
                  <el-option label="乘用车" :value="2"></el-option>
                  <el-option label="客车" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="item.id==='1'">
              <el-form-item label="MPA">
                <el-select v-model="temp.mpa" placeholder="请选择">
                  <el-option label="35" value="35"></el-option>
                  <el-option label="70" value="70"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :class="item.id==='2' ? 'fullWidthInput' : ''" :span="item.id==='2' ? 24 : 12" v-for="(item1, index1) in item.children">
              <el-form-item :label="item1.name">
                <el-input v-if="item1.type==='0'" v-model="item1.value"></el-input>
                <el-select v-else-if="item1.type==='1'" v-model="item1.value" placeholder="请选择">
                  <el-option v-for="(item2, index2) in item1.dropDownData.split('-')" :label="item2" :value="item2"></el-option>
                </el-select>
                <el-select v-else-if="item1.type==='3'" v-model="item1.value" placeholder="请选择" @change="partDetail(item1)">
                  <el-option v-for="(item2, index2) in fieldListLBJ[item1.dataSources?item1.dataSources.split('-')[1]: []]"
                             :label="item2.name" :value="item2.id"></el-option>
                </el-select>
              </el-form-item>
              <div v-if="item.id==='2' && item1.dataSources && componentId[item1.dataSources.split('-')[1]]" class="partsDetail">
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      <el-row style="width: 100%">
                        <el-col :span="12">
                          {{fieldIdListLBJ[item1.dataSources.split('-')[1]][componentId[item1.dataSources.split('-')[1]]]?fieldIdListLBJ[item1.dataSources.split
                          ('-')[1]][componentId[item1.dataSources.split('-')[1]]].property[0].name + ' : ' + fieldIdListLBJ[item1.dataSources.split
                          ('-')[1]][componentId[item1.dataSources.split('-')[1]]].property[0].value : ''}}
                        </el-col>
                      </el-row>
                    </template>
                    <el-row>
                      <el-col style="margin-bottom: 5px" :span="12" v-for="(item3, index3) in
                  fieldIdListLBJ[item1.dataSources.split('-')[1]][componentId[item1.dataSources.split('-')[1]]]?fieldIdListLBJ[item1.dataSources.split('-')[1]][componentId[item1.dataSources.split('-')[1]]].property:[]">
                        {{item3.name}} : {{item3.value}}
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?addModel():updateModel()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {getModelListByPage, getModelField, addModel, deleteModel, getComponentDetail, getModelDetail, editModel} from '@/assets/api/stationDeclaration'
    import {startProcessBatch, modelRecall} from '@/assets/api/process'
    import Pagination from '@/components/common/Pagination'

    export default {
        name: "model",
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
                total: 0,
                tableData: [],
                tableHeader: [],
                model: '',
                queryObj: {
                    page: {
                        current: 1,
                        size: 10
                    },
                    querys: [
                        {
                            like: {
                                model: ""
                            }
                        }
                    ]
                },
                temp: {
                    id: '',
                    properties: [],
                    model: '',
                    vecClass: '',
                    mpa: ''
                },
                dialogVisible: false,
                uploadFlag: '',
                fieldListLBJ: {},
                fieldIdListLBJ: {},
                selitme: 0,
                multipleSelection: [],
                componentId: {},
                dialogStatus: '',
                textMap: {
                    update: '修改车型',
                    create: '新增车型',
                    view: '查看车型详情'
                },
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
            },
            getTableHeader() {
                getModelField().then((res) => {
                    this.temp.properties = [];
                    for (let i = 0; i < res.data.properties.length; i++) {
                        this.temp.properties.push({
                            id: res.data.properties[i].id, value: '', name: res.data.properties[i].name, defaultValue: res.data.properties[i].defaultValue,
                            children: res.data.properties[i].children
                        });
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
                this.queryObj.querys[0].like.model = this.model;
                this.getLBJList()
            },
            getLBJList() {
                this.tableData = [];
                getModelListByPage(this.queryObj).then((res) => {
                    this.tableData = res.data.records;
                    this.total = parseInt(res.data.total);
                })
            },
            handleCreate() {
                this.dialogVisible = true;
                this.dialogStatus = 'create';
                this.temp.id = '';
                this.temp.model = '';
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        this.temp.properties[i].children[j].value = '';
                    }
                }
                console.log(this.temp.properties)
            },
            isUpload(id) {
                if (id === 'LBJ_FDJPRODUCT' || id === 'LBJ_FDJMODE' || id === 'LBJ_FDJSTARTTEMPRETURE' || id === 'LBJ_FDJRATEDPOWER' || id === 'LBJ_FDJDENITY') {
                    return true;
                } else {
                    return false;
                }
            },
            addModel() {
                if (this.temp.model === '' || this.temp.model === null) {
                    return this.$message.error('车辆型号不能为空')
                }
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        if ((this.temp.properties[i].children[j].value === '' || this.temp.properties[i].children[j].value === null) &&
                            this.temp.properties[i].children[j].id === '6') {
                            return this.$message.error(this.temp.properties[i].children[j].name + '不能为空')
                        }
                    }
                }
                addModel(this.temp).then(() => {
                    this.getLBJList();
                    this.dialogVisible = false;
                    return this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                })
            },
            changeUploadFileId(id) {
                this.uploadFlag = id;
            },
            async getFieldList(url) {
                let valueList = [];
                if (url) {
                    await this.$http.post(url.split("-")[0]).then(({data}) => {
                        if (data.code == "200") {
                            if (data.data.length > 0) {
                                for (let i = 0; i < data.data.length; i++) {
                                    if (i === 0) {
                                        this.fieldIdListLBJ[data.data[i].type] = {};
                                    }
                                    let tableObjItem = data.data[i]['property'];
                                    if (tableObjItem.length > 0) {
                                        for (let j = 0; j < tableObjItem.length; j++) {
                                            if (tableObjItem[j]['id'] === '93' || tableObjItem[j]['id'] === '107' || tableObjItem[j]['id'] === '119' || tableObjItem[j]['id'] ===
                                                '121' || tableObjItem[j]['id'] === '127') {
                                                valueList.push({name: tableObjItem[j]['value'], id: data.data[i].id})
                                                this.fieldIdListLBJ[data.data[i].type][data.data[i].id] = data.data[i]
                                            }
                                            // tableObj[tableObjItem[j]['id']] = tableObjItem[j]['value'];
                                        }
                                    }
                                }
                            }
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                }
                this.fieldListLBJ[url.split("-")[1]] = valueList;
                console.log(this.fieldIdListLBJ)
                // this.fieldIdListLBJ[url.split("-")[1]] = valueList1;
                // return valueList
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
                    deleteModel(ids).then(() => {
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
                    debugger
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
                    startProcessBatch('VEHICLE_MODEL_REGIST', {businessKeyArray: ids}).then(() => {
                        this.getLBJList();
                        return this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                    })
                })
            },
            partDetail(val) {
                this.componentId[val.dataSources.split("-")[1]] = val.value;
            },
            handleEdit(index, row) {
                this.dialogStatus = 'update';
                getModelDetail(row.id).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.properties = res.data.properties;
                    this.temp.model = res.data.model;
                    this.temp.vecClass = res.data.vecClass;
                    this.temp.mpa = res.data.mpa;
                    for (let i = 0; i < res.data.properties.length; i++) {
                        if (res.data.properties[i].id === '2') {
                            for (let j = 0; j < res.data.properties[i].children.length; j++) {
                                if (res.data.properties[i].children[j].dataSources) {
                                    this.componentId[res.data.properties[i].children[j].dataSources.split("-")[1]] = res.data.properties[i].children[j].value;
                                }
                            }
                        }
                    }
                })
            },
            updateModel() {
                if (this.temp.model === '' || this.temp.model === null) {
                    return this.$message.error('车辆型号不能为空')
                }
                for (let i = 0; i < this.temp.properties.length; i++) {
                    for (let j = 0; j < this.temp.properties[i].children.length; j++) {
                        if ((this.temp.properties[i].children[j].value === '' || this.temp.properties[i].children[j].value === null) &&
                            this.temp.properties[i].children[j].id === '6') {
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
                editModel(params).then(() => {
                    // this.resetQuery();
                    this.getLBJList();
                    this.dialogVisible = false;
                    return this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
            },
            viewDetail(index, row) {
                this.dialogStatus = 'view';
                getModelDetail(row.id).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.properties = res.data.properties;
                    this.temp.model = res.data.model;
                    this.temp.vecClass = res.data.vecClass;
                    this.temp.mpa = res.data.mpa;
                    for (let i = 0; i < res.data.properties.length; i++) {
                        if (res.data.properties[i].id === '2') {
                            for (let j = 0; j < res.data.properties[i].children.length; j++) {
                                if (res.data.properties[i].children[j].dataSources) {
                                    this.componentId[res.data.properties[i].children[j].dataSources.split("-")[1]] = res.data.properties[i].children[j].value;
                                }
                            }
                        }
                    }
                })
            },
            recall(){
                if (this.multipleSelection.length <= 0) {
                    return this.$message({
                        message: '请选择至少一条数据',
                        type: 'warning'
                    });
                }
                let ids = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if(this.multipleSelection[i].status !== '3'){
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
                    modelRecall(ids).then(() => {
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

  /*.el-form .el-form-item .el-input {*/
  /*  width: 58%;*/
  /*}*/

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

  .partsDetail {
    background-color: rgba(211, 217, 226, 0.16);
    padding: 0 15px;
    margin-bottom: 20px;
  }

  .partsDetail /deep/ .el-collapse, .partsDetail /deep/ .el-collapse-item__header {
    border: none;
  }

  .partsDetail /deep/ .el-collapse-item__header, .partsDetail /deep/ .el-collapse-item__wrap {
    background-color: transparent;
  }

  /deep/ .el-select {
    vertical-align: bottom !important;
  }

  /deep/ .el-select__input {

    vertical-align: baseline;

  }

  /deep/ .el-select span:focus-within {
    border: none;
    outline: none;
  }

  .abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
  }

  .abow_dialog /deep/ .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
  }

  .abow_dialog /deep/ .el-dialog .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto;
  }

  .dialog-footer {
    text-align: center;
    margin-bottom: 20px;
  }

  .lineBlock {
    background-color: #E6F7FF;
    border: #BAE7FF solid 1px;
    padding: 1% 0;
    border-radius: 5px;
    margin: 15px 0;
  }
</style>
