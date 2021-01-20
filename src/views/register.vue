<template>
    <div class="register">
      <div class="register_header">
        <img class="logo" src="@/assets/img/login/logo_word.png" alt="logo">
      </div>
      <div class="register_content" :style="{ backgroundImage: 'url('+bgImg+')'}">
        <div class="container">
          <div class="container_header">
            <span class="tit">欢迎注册</span>
            <el-link :underline="false" href="/Login" type="primary" style="float: right;line-height: 70px;margin-right:20px; ">去登录 <i class="el-icon-arrow-right"></i> </el-link>
          </div>

          <div class="line" />
          <el-form ref="formEdit"
                   :model="formEdit"
                   class="register_form"
                   :disabled="formEditDisabled"
                   :rules="rules"
                   label-width="130px">
            <el-form-item label="企业名称" prop="tenantName">
              <el-input
                v-model="formEdit.tenantName"
                :title="formEdit.tenantName"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="企业性质">
              <el-select v-model="formEdit.tenantType" placeholder="请选择类别" class="elSelect">
                <el-option v-for="(item) in lbjList" :key="item.type" :label="item.name" :value="item.type" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市">
              <el-select v-model="formEdit.tenantCity" placeholder="请选择城市" class="elSelect">
                <el-option v-for="(item) in provinceList" :key="item.id" :label="item.name" :value="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input
                v-model="formEdit.contacts"
                :title="formEdit.contacts"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="formEdit.email"
                :title="formEdit.email"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="企业社会信用代码" prop="creditCode">
              <el-input
                v-model="formEdit.creditCode"
                :title="formEdit.creditCode"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="注册地">
              <el-col :span="8">
                <el-select
                  v-model="formEdit.provinceId"
                  class="areaClass"
                  filterable
                  placeholder="请选择省份"
                  @change="provinceChange"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="formEdit.cityId"
                  class="areaClass"
                  filterable
                  placeholder="请选择城市"
                  @change="cityChange"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="formEdit.areaId" class="areaClass" filterable placeholder="请选择区域">
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label prop="address">
              <el-input
                v-model="formEdit.address"
                :title="formEdit.address"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <div class="addressMap" id="addressMap"></div>
            </el-form-item>
            <el-form-item label="经营范围" prop="businessScope">
              <el-input
                v-model="formEdit.businessScope"
                :title="formEdit.businessScope"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="营业时间" prop="businessHours">
              <el-time-picker
                is-range
                v-model="fobu"
                :title="formEdit.businessHours"
                placeholder="选择时间"
                format="HH:mm"
                value-format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input
                v-model="formEdit.tel"
                :title="formEdit.tel"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="日加氢能力(kg)" prop="tel">
              <el-input
                v-model="formEdit.daily"
                :title="formEdit.daily"
                maxlength="200"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="类别" prop="category">
              <el-select v-model="formEdit.category" placeholder="请选择类别" class="elSelect">
                <el-option label="固定式加氢站" value="4">固定式加氢站</el-option>
                <el-option label="撬装式加氢站" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="加氢能力证明材料" prop="attachment">
              <el-input
                v-model="formEdit.attachment"
                :title="formEdit.attachment"
                v-show="false"
                maxlength="200"
                autocomplete="off"
              />
<!--              <div v-if="formEdit.tenantType==='6'">-->
                <span class="fileName" v-if="formEdit.attachment">{{formEdit.attachment.split(";")[1]}}</span>
                <el-upload class="upload-demo" action="/api-server/upload" style="margin-left: 10px" :on-success="uploadSuccess"
                           :multiple="false" :show-file-list="false" :beforeUpload="beforeAvatarUpload">
                  <el-button size="small" icon="el-icon-upload2" type="primary" plain @click="changeUploadFileId(formEdit.id)">上传</el-button>
                </el-upload>
                <el-button size="small" icon="el-icon-delete" type="danger" plain style="margin: 0 10px;" @click="deleteUploadFile(formEdit)">删除</el-button>
                <span style="color:#999999">支持jpg，png，pdf</span>
<!--              </div>-->
            </el-form-item>
          </el-form>
          <div v-if="dialogType!== 'see'" slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editFormConfirm" style="width: 300px;">提交</el-button>
          </div>
        </div>

      </div>
      <div class="register_footer">
        版权所有：中国汽车技术研究中心数据资源中心 版本号：V1.0.0
      </div>
    </div>
</template>

<script>
  import { getTenantType, getAreaList } from '@/assets/api/basicInformationEntry'
  import { getProgressImageData } from '@/assets/api/process'
  import AMap from "AMap";
  export default {
    name: 'register',
    data () {
      return {
        bgImg: require("@/assets/img/login/r_bg.png"),
        istrue: 0,
        lbjList: [],
        tableData: [],
        tableHeader: [],
        progressImageList: [],
        total: 0,
        queryObj: {
          page: {
            current: 1,
            size: 10,
            orders: [
              {
                asc: false,
                column: 'ID'
              }
            ]
          },
          querys: [
            {
              like: {
                tenantType: '',
                tenantName: ''
              }
            }
          ]
        },
        page: {
          current: 1,
          size: 10,
          orders: [
            {
              asc: false,
              column: 'ID'
            }
          ]
        },
        temp: {
          property: []
        },
        formEdit: {
          provinceId: ''
        },
        dialogType: 'register', // 弹框类型
        editFormVisible: false,
        formEditDisabled: false, // 是否禁用from表单中组件功能
        modelSearch: "",
        dialogVisible: false,
        provinceList: [],
        cityList: [],
        areaList: [],
        map: null,
        mapZoom: 11,
        marker: "",
        uploadFlag:'',
        rules: {
          // 校验规则
          tenantName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            {
              max: 200,
              message: "最多输入200个字符",
              trigger: "blur",
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          tenantShort: [
            { required: true, message: '请输入公司简称', trigger: 'blur' },
            {
              max: 200,
              message: '最多输入200个字符',
              trigger: 'blur'
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          tenantCode: [
            { required: true, message: '请输入公司代码', trigger: 'blur' },
            {
              pattern: /^[A-Za-z0-9]{3,10}$/,
              message: '允许输入3-10位英文与数字'
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          tel: [
            {
              max: 200,
              message: '最多输入200个字符',
              trigger: 'blur'
            },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确电话号',
              trigger: 'blur'
            }
          ],
          address: [
            {
              max: 200,
              message: '最多输入200个字符',
              trigger: 'blur'
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          web: [
            {
              max: 200,
              message: '最多输入200个字符',
              trigger: 'blur'
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          mail: [
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            },
            {
              max: 200,
              message: '最多输入200个字符',
              trigger: 'blur'
            },
            { validator: this.$specialCharValid, trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '请选择企业省份', trigger: 'change' }
          ],
          cityId: [
            { required: true, message: '请选择企业市区', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.init()
      // this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    },
    computed:{
      fobu() {
        if (this.formEdit.businessHours) {
          return this.formEdit.businessHours.split('-')
        } else {
          return ''
        }
      }
    },
    methods: {
      async init () {
        await this.getTenantType()
        await this.getProvinceList()
        await this.getCityList()
        await this.getRegionList()
        await this.mapInit()
      },
      // 获取企业类型
      async getTenantType () {
        await getTenantType().then((res) => {
          this.lbjList = res.data
          this.queryObj.querys[0].like.tenantType = res.data[0].type
        })
      },
      // 获取企业列表信息
      toggleLBJ (index, type) {
        this.istrue = index
        this.queryObj.querys = [{
          like: {
            tenantType: type
          }
        }]
        this.queryObj.page.current = 1
      },
      // 预览
      handleDetail (index, row) {
        this.formEditDisabled = true
        this.dialogType = 'see'
        this.dialogTitle = '预览企业信息'
        this.formEdit = row
        // this.formEdit.BusinessHours = this.formEdit.BusinessHours.split('-')
        // this.getCityList()
        this.editFormVisible = true;
        this.editFormVisible = true
        this.$nextTick(()=>{this.mapInit()})
      },
      // 编辑
      handleEdit(index, row) {
        this.formEditDisabled = false;
        this.dialogType = "edit";
        this.dialogTitle = "编辑企业信息";
        this.formEdit = row;
        this.editFormVisible = true;
        this.$nextTick(() => {
          this.mapInit();
        });
      },
      // 取消确认
      cancelEdit () {
        this.editFormVisible = false
        this.$refs.formEdit.clearValidate()
      },
      // 编辑公司方法
      confirmEidt (data) {
        this.$http.put('/system/tenant', data).then(({ data }) => {
          if (data.code === '200') {
            // 新增成功，关闭弹框,重置部分校验所需参数，刷新列表
            this.cancelEdit('formEdit')
            this.$message.success('编辑成功')
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 关闭前回调
      closeDialog (done) {
        this.$refs.formEdit.clearValidate()
        done()
      },
      // 提交新增或编辑
      editFormConfirm () {
        this.$refs.formEdit.validate(valid => {
          if (valid) {
            // if (this.dialogType === 'add') {
            //   this.confirmSubmit(this.formEdit)
            // } else
            if (this.dialogType === 'edit') {
              this.confirmEidt(this.formEdit)
              this.$refs.formEdit.clearValidate()
            }
          } else {
            return false
          }
        })
      },
      // 流程图绘制
      getProgressImageli (businessKey) {
        // processInstanceId
        let params = { businessKey: businessKey }
        getProgressImageData(params).then((res) => {
          if (res.ok === true) {
            this.progressImageList = res.data.reverse()
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // 获取省份列表
      getProvinceList () {
        let params = {};
        params.page = this.page;
        params.querys = [
          {
            eq: {
              areaLevel: 'A'
            }
          }
        ]
        console.log( params);
        getAreaList(params).then(({ data }) => {
          this.provinceList = data
        })
      },
      // 省份信息更新
      provinceChange(){
        console.log( 111);
        this.$set(this.formEdit,'cityId','')
        this.$set(this.formEdit,'areaId','')
        this.$nextTick(() => {
          this.$refs.formEdit.clearValidate('cityId')
          this.$refs.formEdit.clearValidate('areaId')
        })
        this.getCityList ()
      },
      // 获取城市列表
      getCityList () {
        let parentId = this.formEdit.provinceId
        let params = {};
        params.page = this.page;
        params.querys = [
          {
            eq: {
              parentId: parentId
            }
          }
        ]
        getAreaList(params)
          .then(({ data }) => {
            this.cityList = data
          })
      },
      // 市信息更新
      cityChange(){
        this.$set(this.formEdit,'areaId','')
        this.$nextTick(() => {
          this.$refs.formEdit.clearValidate('areaId')
        })
        this.getRegionList()
      },
      // 获取城市列表
      getRegionList () {
        let parentId = this.formEdit.cityId
        let params = {};
        params.page = this.page;
        params.querys = [
          {
            eq: {
              parentId: parentId
            }
          }
        ]
        getAreaList(params).then(({ data }) => {
          this.areaList = data
        })
      },
      // 地图初始化
      mapInit(){
        // this.$message('onCloseonCloseonClose')
        console.log( this.formEdit.lng)
        this.map = new AMap.Map('addressMap', {
          zoom:12,//级别
          floorControl: false, //是否显示楼层
          // center: [this.formEdit.lng,this.formEdit.lat], // 中心点坐标
          center: [117.209065,39.135184], // 中心点坐标
          resizeEnable: true
        });

        this.marker = new AMap.Marker();

        AMap.plugin(
          ["AMap.ToolBar", "AMap.Geolocation", "AMap.ControlBar"],
          () => {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            this.map.addControl(
              new AMap.ToolBar({
                // 简易缩放模式，默认为 false
                liteStyle: true,
                defaultType: 0,
                offset: new AMap.Pixel(14, 150),
                position: "RB",
              })
            );
            this.map.addControl(
              new AMap.Geolocation({
                buttonOffset: new AMap.Pixel(18, 170),
                buttonPosition: "RB",
              })
            );
            // 添加 3D 罗盘控制
            this.map.addControl(
              new AMap.ControlBar({
                showZoomBar: !1,
                showControlButton: !0,
                position: {
                  right: "0px",
                  bottom: "100px",
                },
              })
            );
          }
        );
      },
      autoSearch(){
        AMap.service(["AMap.Autocomplete"],function(){
          let autoOptions = {
            adcode: this.formEdit.provinceId,
            input:'address'
          }
          let autocomplete = new AMap.Autocomplete(autoOptions);
          AMap.event.addListener(autocomplete, "select", function (e) {
            let lnglat = e.poi.location;
            this.formEdit.lng = lnglat.lng;
            this.formEdit.lat = lnglat.lat
            this.marker.setPosition(e.poi.location);
            this.map.add(this.marker);
            this.map.setFitView(this.marker);
          });
        });

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
      isUpload(item) {
        if (item.children) {
          return true;
        } else {
          return false;
        }
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
      deleteUploadFile(item1) {
        item1.value = ''
      },
    }
  }
</script>

<style scoped lang="less">
  .register{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .register_header{
    height: 8%;
    min-height: 74px;
    width: 100%;
    img{
      position: absolute;
      left: 56px;
      top: 22px;
      width: 250px;
    }
  }
  .register_content{
    height: 74%;
    min-height: 490px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .leftImg{
      width: 637px;
      height: 439px;
      margin-left: 78px;
      margin-top: 36px;
    }
  }
  .container {
    border-radius: 6px;
    position: absolute;
    top: 16%;
    left: 28%;
    width: 560px;
    /*padding: 0px 25px 15px 25px;*/
    background:rgba(255,255,255,1);
    border:1px solid rgba(219,219,219,0.2);

    .container_header{
      text-align: center;
    }
    .line{
      width: 100%;
      height: 1px;
      background-color: #DBDBDB;
      margin-bottom: 10px;
    }
    .tit{
      height: 60px;
      line-height: 60px;
      margin-left: 40px;
      text-align: center;
      font-size:20px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(47,47,47,1);;
    }
    .register_form{
      padding: 0px 25px 15px 25px;
      overflow-y: scroll;
      height: 320px;
      .addressMap {
        width:374px; height: 200px;
      }
    }

    .dialog-footer{
      padding-top: 8px;
      padding-bottom: 16px;
    }
    .linkButtton{
      font-weight:500;
      color:rgba(255,255,255,0.85);
      cursor: pointer;
    }
    /deep/.el-form-item__label{
      color:rgba(96,98,102,1);
      font-size: 14px;
    }
    /deep/.el-form--label-top .el-form-item__label {
      padding: 0;
    }
    .areaClass /deep/ .el-input{
      width: 122px;
    }
    /deep/ .el-input{ width: 374px; }
    /deep/ .el-date-editor{
      width: 374px;
    }
    /deep/ .el-form-item{ margin-bottom: 8px; }
    .loginNameStyle{
      margin-bottom: 0;
    }
  }

  .register_footer{
    height: 8%;
    min-height: 60px;
    line-height: 60px;
    width: 100%;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(143,147,153,1);
    text-align: center;

  }

  .upload-demo {
    display: inline-block;
  }


  @media screen and (min-width: 1900px) {
    .register_content {
      height: 83%;
      .container {
        width: 600px;
        left: 35%;
        top: 14%;
        .register_form{
          height: 520px;
          .addressMap {
            width:398px;
          }
        }
        /deep/ .el-input{ width: 398px; }
        .areaClass /deep/ .el-input{width: 122px;}
        /deep/ .el-date-editor{width: 398px;}

      }

    }

  }
</style>
