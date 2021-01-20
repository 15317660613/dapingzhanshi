<template>
  <div class="content">
    <div class="nav">
      <div v-for='(item, index) in lbjList' :class="{active:istrue==index}" @click="toggleLBJ(index, item.id)">{{item.name}}</div>
    </div>
    <div class="table-wrapper">
      <div class="tool-btn-group">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="handleCreate">新建</el-button>
<!--        <el-button size="mini">批量操作</el-button>-->
        <el-button size="mini" type="primary" plain @click="startProcess">提交</el-button>
        <el-button size="mini" @click="recall">撤销</el-button>
        <el-button size="mini" type="danger" plain @click="handleDelete">删除</el-button>
        <div style="float: right">
          <el-input placeholder="请输入内容" v-model.trim="model" class="input-with-select" size="mini">
            <el-button slot="append" icon="el-icon-search" size="mini" type="primary" @click="handleFilter">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="lineBlock">
        <div style="padding-left:3%"><img src="@/assets/img/shape.png"> 已选择 <span style="color:#1890FF">{{selitme}}</span> 项</div>
      </div>
      <el-table :data="tableData" border style="width: 100%" stripe class="table-fixed" @selection-change="handleSelectionChange" :max-height="tableHeight">
        <el-table-column label="" type="selection" align="center" width="55"></el-table-column>
        <el-table-column v-for='(item, index) in tableHeader' :prop="item.id" :label="item.name" align="center" min-width="120"></el-table-column>
        <el-table-column label="状态" align="center" min-width="120" fixed="right">
          <template slot-scope="{row}">
            <span class="statusCircle" v-if="row.status===3" style="background-color: #B6B6B6"></span>
            <span class="statusCircle" v-if="row.status===1" style="background-color: #00B589"></span>
            <span class="statusCircle" v-if="row.status===2" style="background-color: #FD472B"></span>
            <span class="statusCircle" v-if="row.status===0" style="background-color: #3391EC"></span>
            {{row.status | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status===0 || scope.row.status===1">编辑</el-button>
            <el-button type="text" size="mini" @click="viewDetail(scope.$index, scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="queryObj.current" :limit.sync="queryObj.size"
                  @pagination="getLBJList()"/>
    </div>

    <el-dialog class="abow_dialog" :title="textMap[dialogStatus]" v-if="dialogVisible" :visible.sync="dialogVisible" width="741px" :modal-append-to-body="false">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="280px" :disabled="dialogStatus==='view'"
               style="margin:0 20px;">
        <el-form-item required v-for="(item, index) in componentTemp" :label="item.name" v-if="item.type!=='4'">
          <el-input maxlength="20" placeholder="请输入" v-if="!item.dropDownData" v-model="temp.property[index]['value']"/>
          <el-select v-else clearable class="filter-item" placeholder="请选择" v-model="temp.property[index]['value']">
            <el-option v-for="(item1, index1) in item.dropDownData.split('-')" :label="item1" :value="item1"/>
          </el-select>
          <el-upload class="upload-demo" action="/api-server/upload" v-if="isUpload(item)" style="margin-left: 10px" :on-success="uploadSuccess"
                     :multiple="false" :show-file-list="false">
            <el-button icon="el-icon-upload2" type="info" plain @click="changeUploadFileId(item.children[0].id)">上传校验报告</el-button>
            <div v-if="temp.property[index + 1]['value'] !== ''"><i class="el-icon-document"></i> {{temp.property[index + 1]['value'].split(';')[1]}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus!=='view'" @click="dialogStatus==='create'?addComponent():updateComponent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {
        getComponentType,
        getComponentListHeader,
        getComponentListByPage,
        addComponent,
        deleteComponent,
        getComponentDetail,
        editComponent
    } from '@/assets/api/stationDeclaration'
    import {startProcessBatch, componentRecall} from '@/assets/api/process'
    import Pagination from '@/components/common/Pagination'

    export default {
        name: "parts",
        components: {
            Pagination
        },
        filters: {
            statusFilter(type) {
                const keyValue = {
                    0: '待审核',
                    1: '批准',
                    2: '拒绝',
                    3: '草稿'
                };
                return keyValue[type]
            }
        },
        data() {
            return {
                istrue: 0,
                lbjList: [],
                tableData: [],
                tableHeader: [],
                componentTemp: [],
                total: 0,
                queryObj: {
                    current: 1,
                    size: 10,
                    pid: '',
                    searchName: ''
                },
                temp: {
                    id: '',
                    property: [],
                    type: ''
                },
                model: '',
                dialogVisible: false,
                uploadFlag: '',
                multipleSelection: [],
                selitme: 0,
                dialogStatus: '',
                textMap: {
                    update: '修改零部件',
                    create: '新增零部件',
                    view: '查看零部件详情'
                },
                tableHeight: window.innerHeight - 337,
                tableFixedHeight: ''
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
            async init() {
                await this.getComponentType();
                this.getTableHeader();
                this.getLBJList();
            },
            resetQuery() {
                this.queryObj.current = 1;
                this.queryObj.size = 10;
                this.queryObj.searchName = '';
            },
            handleFilter() {
                this.queryObj.current = 1;
                this.queryObj.searchName = this.model;
                this.getLBJList()
            },
            async getComponentType() {
                await getComponentType().then((res) => {
                    this.lbjList = res.data;
                    this.temp.type = res.data[0].id;
                    this.queryObj.pid = res.data[0].id;
                })
            },
            getTableHeader(data) {
                getComponentListHeader(this.queryObj.pid).then((res) => {
                    this.tableHeader = res.data.filter((item, index) => {
                        return item.type !== '4';
                    });
                    this.temp.property = [];
                    this.componentTemp = [];
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === '4') {
                            this.componentTemp[this.componentTemp.length - 1].children = [{id: res.data[i].id, value: '', name: res.data[i].name, type: res.data[i].type}]
                        }
                        this.componentTemp.push({id: res.data[i].id, value: '', name: res.data[i].name, type: res.data[i].type, dropDownData: res.data[i].dropDownData});
                        this.temp.property.push({id: res.data[i].id, value: '', name: res.data[i].name})
                    }
                })
            },
            getLBJList() {
                this.tableData = [];
                getComponentListByPage(this.queryObj).then((res) => {
                    this.total = parseInt(res.data.total);
                    if (res.data.records.length > 0) {
                        for (let i = 0; i < res.data.records.length; i++) {
                            let tableObj = {};
                            tableObj.id = res.data.records[i].id;
                            tableObj.transcationId = res.data.records[i].transcationId;
                            tableObj.status = res.data.records[i].status;
                            let tableObjItem = res.data.records[i]['property'];
                            if (tableObjItem.length > 0) {
                                for (let j = 0; j < tableObjItem.length; j++) {
                                    tableObj[tableObjItem[j]['id']] = tableObjItem[j]['value'];
                                }
                            }
                            this.tableData.push(tableObj);
                        }
                        setTimeout(()=>{
                            this.changeTableFiexdHeight();
                        },500)
                    }
                })
            },
            toggleLBJ(index, pid) {
                this.istrue = index;
                this.queryObj = {
                    current: 1,
                    size: 10,
                    pid: pid,
                    searchName: ''
                };
                this.temp.type = pid;
                this.tableData = [];
                this.getTableHeader({pid: pid});
                this.getLBJList();
            },
            handleCreate() {
                this.dialogVisible = true;
                this.dialogStatus = 'create';
                for (let i = 0; i < this.temp.property.length; i++) {
                    this.temp.property[i].value = '';
                }
            },
            isUpload(item) {
                if (item.children) {
                    return true;
                } else {
                    return false;
                }
            },
            addComponent() {
                for (let i = 0; i < this.temp.property.length; i++) {
                    if (this.temp.property[i].value === '') {
                        return this.$message.error(this.temp.property[i].name + '不能为空')
                    }
                }
                addComponent(this.temp).then(() => {
                    this.resetQuery();
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
                    for (let i = 0; i < this.temp.property.length; i++) {
                        if (this.temp.property[i].id === this.uploadFlag) {
                            this.temp.property[i].value = res.data.id + ';' + res.data.name;
                        }
                    }
                } else {
                    this.$message.error(res.message)
                }
            },
            changeUploadFileId(id) {
                this.uploadFlag = id;
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
                    if(this.multipleSelection[i].status === 0 || this.multipleSelection[i].status === 1){
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
                    deleteComponent(ids).then(() => {
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
                    if(this.multipleSelection[i].status === 0 || this.multipleSelection[i].status === 1){
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
                    startProcessBatch('PART_REGIST', {businessKeyArray: ids}).then(() => {
                        this.getLBJList();
                        return this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                    })
                })
            },
            handleEdit(index, row) {
                this.dialogStatus = 'update';
                getComponentDetail(row.id, this.queryObj.pid).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.property = res.data.property;
                    this.temp.type = res.data.type;
                    // debugger
                })
            },
            updateComponent() {
                for (let i = 0; i < this.temp.property.length; i++) {
                    if (this.temp.property[i].value === '') {
                        return this.$message.error(this.temp.property[i].name + '不能为空')
                    }
                }
                editComponent(this.temp).then(() => {
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
                getComponentDetail(row.id, this.queryObj.pid).then((res) => {
                    this.dialogVisible = true;
                    this.temp.id = res.data.id;
                    this.temp.property = res.data.property;
                    this.temp.type = res.data.type;
                    // debugger
                })
            },
            changeTableFiexdHeight(){
                let fixedHeaderHeight = document.getElementsByClassName("el-table--scrollable-x")[0].getElementsByClassName("el-table__fixed-body-wrapper")[0].offsetTop + 5;
                document.getElementsByClassName("el-table--scrollable-x")[0].getElementsByClassName("el-table__fixed-body-wrapper")[0].style.maxHeight =
                    "calc(100% - " + fixedHeaderHeight + "px)"
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
                    if(this.multipleSelection[i].status !== 0){
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
                    componentRecall(ids).then(() => {
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
    margin-left: 240px;
    padding-top: 30px;
    margin-right: 30px;
  }

  .table-wrapper .tool-btn-group {
    margin-bottom: 10px;
  }

  .nav {
    font-size: 14px;
    width: 200px;
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 10px;
    background-color: rgba(248, 248, 248, 0.4);
  }

  .nav div {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .nav .active {
    background: rgba(74, 144, 226, 0.1);
    border-right: 5px solid #4A90E2;
    color: #4A90E2;
  }

  .table-fixed /deep/ .el-table__fixed-right {
    height: 100% !important;
  }

  .table-fixed /deep/ .el-table__fixed {
    height: 100% !important;
  }

  .el-form .el-form-item {
    margin-bottom: 10px;
  }

  .el-form .el-form-item .el-input {
    vertical-align: top;
    width: 58%;
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

  .lineBlock {
    background-color: #E6F7FF;
    border: #BAE7FF solid 1px;
    padding: 10px 0;
    border-radius: 5px;
    margin: 15px 0;
  }

  /deep/ .el-upload-list.el-upload-list--text {
    width: 145px;
    overflow: hidden;
    text-overflow: ellipsis;
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
</style>
