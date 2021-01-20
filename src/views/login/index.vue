<template>
  <div class="login" >
    <div class="login_header">
      <img class="logo" src="@/assets/img/login/logo_word.png" alt="logo">
    </div>
    <div class="login_content" :style="{ backgroundImage: 'url('+bgImg+')'}">
      <img class="leftImg" src="@/assets/img/login/left.png" alt="left">
      <div class="container">
        <div class="tit">
          登录
        </div>
        <div class="line" />
        <el-form
          ref="form"
          :model="form" class="login_form"
          :class="[screenV ? 'topS' : 'topL']"
          :label-position="labelPosition"
        >
          <el-form-item
            label="用户名"
            prop="loginName"
            class="loginNameStyle"
          >
            <el-input
              v-model="form.loginName"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="cipher" label="密码" class="loginNameStyle">
            <el-input
              v-model="form.cipher"
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="login"
            />
          </el-form-item>
          <!--<el-form-item prop="verify" v-show="loginCodeShow">
            <el-row :gutter="10">
              <el-col :span="13">
                <el-input
                  v-model="form.verify"
                  auto-complete="off"
                  placeholder="请输入验证码"
                  class="loginNameStyle"
                  size
                  @keyup.enter.native="login"
                ></el-input>
              </el-col>
              <el-col :span="11">
                <img @click="getVerify" class="identifyCode" :src="identifyCode" alt />-->
          <!--<div class="login-code" @click="refreshCode">-->
          <!--验证码组件-->
          <!-- <s-identify :identifyCode="identifyCode"></s-identify> -->
          <!--</div>-->
          <!--</el-col>
            </el-row>
          </el-form-item>-->
          <!--<el-checkbox
            v-model="form.rememberMe"
            checked
            class="m10"
          >
            记住我
          </el-checkbox>-->
          <el-form-item style="margin-bottom:0;" label=" ">
            <el-button
              v-loading="loading"
              type="primary"
              class="login-btn"
              :disabled="loading"
              @click="login"
            >
              {{ loginName }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="12">
                <span class="linkButtton" @click="goR">注册</span>
              </el-col>
              <el-col :span="12">
                <span class="linkButtton" style="float: right;">忘记密码</span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="login_footer">
      版权所有：中国汽车技术研究中心数据资源中心 版本号：V1.0.0
    </div>

<!--    <div class="copyright">-->
<!--      版权所有：中国汽车技术研究中心数据资源中心 版本号：V1.0.0-->
<!--    </div>-->
  </div>
</template>

<script>
import { resetRouter } from '../../router'
import { JSEncrypt } from 'jsencrypt'
import cryptoJs from 'crypto-js'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      rsa: '',
      form: {
        loginName: '',
        cipher: '',
        verify: '',
        rememberMe: false
      },
      uuid: '',
      publicDer: '',
      privateDer: '',
      num: 0,
      loginCodeShow: true, // 验证码登录是否显示
      checked: true, // 是否选中记住密码 true为选中
      disabled: false,
      loginName: '登录',
      identifyCode: '',
      screenV: this.GLOBAL.screenfun(),
      bgImg: require("@/assets/img/login/bg.png"),
      labelPosition: 'top'
    }
  },
  created () {
    this.checkLogin()
    this.getVerify()
  },
  methods: {
    /**
     * 时间:2019/10/15
     * 作者:yuanbotao
     * 功能:点击登录
     * @param null
     */
    login () {
      if (!this.form.loginName) {
        this.$message.error('用户名不可为空')
        return
      }
      if (!this.form.cipher) {
        this.$message.error('密码不可为空')
        return
      }
      /* if (this.loginCodeShow) {
        if (!this.form.verify || this.form.verify.length !== 4) {
          this.$message.error("请正确输入验证码");
          return;
        }
      } */
      if (!this.$regexp.loginName.test(this.form.loginName)) {
        this.$message.error('用户名和密码格式错误，请输入正确的用户名和密码')
        return
      }
      if (!this.$regexp.cipher.test(this.form.cipher)) {
        this.$message.error('用户名和密码格式错误，请输入正确的用户名和密码')
        return
      }
      this.uuid = this.get_uuid()
      // this.getServePublic(this.uuid);
      this.loginHttp()

      // this.loginName = "登录中...";
      // this.loading = true;
      // this.$api["getMenuData"](
      //   {},
      //   res => {
      //     if (res.code === "1") {
      //       let saveMenuData = this.$common.assemblingComponents(res.data);
      //       localStorage.setItem("routeMenuData", JSON.stringify(saveMenuData));

      //       this.$store.commit("changeloginName", this.form.loginName);
      //       resetRouter();
      //       this.$router.addRoutes(saveMenuData);
      //       this.$message.success("登录成功");
      //       this.$router.push({
      //         path: "/",
      //         name: "home"
      //       });
      //     }
      //     this.loginName = "登录";
      //     this.loading = false;
      //   },
      //   error => {
      //     this.loginName = "登录";
      //     this.loading = false;
      //   }
      // );
    },
    loginHttp () {
      let userInfo
      let der = cryptoJs
        .MD5(this.uuid)
        .toString()
        .substr(0, 16)
      let pubKey = cryptoJs.AES.decrypt(
        cryptoJs.enc.Base64.stringify(cryptoJs.enc.Hex.parse(this.rsa)),
        cryptoJs.enc.Utf8.parse(der),
        {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7
        }
      ).toString(cryptoJs.enc.Utf8)
      // let Encrypt = new JSEncrypt();
      // Encrypt.setPublicKey(pubKey);
      // let cipher = Encrypt.encrypt(this.form.cipher);
      let cipher = this.form.cipher
      if (this.loginCodeShow == true) {
        userInfo = {
          loginName: this.form.loginName,
          cipher: cipher,
          rememberMe: this.form.rememberMe,
          verify: this.form.verify
        }
      } else {
        userInfo = {
          loginName: this.form.loginName,
          cipher: cipher,
          rememberMe: this.form.rememberMe
        }
      }

      this.$http.post('/login', userInfo).then(({ data }) => {
        if (
          data.code == 'Auth_001' ||
          data.code == 'Auth_002' ||
          this.num > 2
        ) {
          this.loginCodeShow = true
          this.form.verify = ''
          this.getVerify()
        }
        if (data.code == '200') {
          this.num = 0
          localStorage.setItem('isLogin', JSON.stringify(data.data.loginName))
          this.$store.commit('changeMenu', data.data.permissionTree)
          this.$store.commit('tagsStore/initWorkTags')
          this.$store.commit('changeTenantCode', data.data.tenantCode)
          this.$store.commit('changeUsername', data.data.userName)
          this.$store.commit('clearMonitorVehicles')
          this.$store.commit('changeUserId', data.data.usid)
          let saveMenuData = this.$common.assemblingComponents(
            data.data.permissionTree
          )
          resetRouter(saveMenuData)
          this.$router.addRoutes(saveMenuData)

          this.$nextTick(() => {
            // 判断首页是否存在进行跳转
            let permissionTree = data.data.permissionTree
            for (let i = 0; i < permissionTree.length; i++) {
              if (permissionTree[i].node.component == 'Home') {
                this.$router.push({
                  path: '/',
                  name: 'Home'
                })
                return false
              } else {
                // 路由对象传入vuex
                this.$store.dispatch('tagsStore/workTagsRemove', {
                  tag: {
                    path: '/',
                    name: 'Home'
                  },
                  router: this.$router
                })
                this.$router.push({
                  path: permissionTree[i].children[0].node.path,
                  name: permissionTree[i].children[0].node.component
                })
                return false
              }
            }
          })
        } else {
          this.num++
          if (this.num == 3) {
            this.loginCodeShow = true
            this.form.verify = ''
            this.getVerify()
          }
          this.$message.error(data.msg)
        }
      })
    },
    // 获取服务器公钥
    /* getServePublic(cpk) {
      this.$http({
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        url: "/rsa",
        data: cpk
      }).then(({ data }) => {
        if (data.code == "200") {
          this.rsa = data.data;
          this.loginHttp();
        } else {
          this.$message.error(data.msg);
        }
      });
    }, */
    getServePublic (cpk) {
      this.$http({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        url: '/rsa',
        data: cpk
      }).then(({ data }) => {
        if (data.code == '200') {
          this.rsa = data.data
          this.loginHttp()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    get_uuid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0
        var v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    // 获取验证码
    getVerify () {
      let that = this
      this.$http
        .get('/verify', { responseType: 'arraybuffer' })
        .then(function (response) {
          return (
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          )
        })
        .then(function (data) {
          // 接收转换后的Base64图片
          that.identifyCode = data
        })
        .catch(function (err) {})
    },
    checkLogin () {
      this.$http.get('/login/check').then(({ data }) => {
        if (data.code == '200') {
          localStorage.setItem('isLogin', JSON.stringify(data.data.loginName))
          this.$store.commit('changeMenu', data.data.permissionTree)
          this.$store.commit('tagsStore/initWorkTags')
          this.$store.commit('changeTenantCode', data.data.tenantCode)
          this.$store.commit('changeUsername', data.data.usname)
          this.$store.commit('clearMonitorVehicles')
          this.$store.commit('changeUserId', data.data.usid)
          let saveMenuData = this.$common.assemblingComponents(
            data.data.permissionTree
          )
          resetRouter(saveMenuData)
          this.$router.addRoutes(saveMenuData)

          this.$nextTick(() => {
            // 判断首页是否存在进行跳转
            let permissionTree = data.data.permissionTree
            for (let i = 0; i < permissionTree.length; i++) {
              if (permissionTree[i].node.component == 'Home') {
                this.$router.push({
                  path: '/',
                  name: 'Home'
                })
                return false
              } else {
                // 路由对象传入vuex
                this.$store.dispatch('tagsStore/workTagsRemove', {
                  tag: {
                    path: '/',
                    name: 'Home'
                  },
                  router: this.$router
                })
                this.$router.push({
                  path: permissionTree[i].children[0].node.path,
                  name: permissionTree[i].children[0].node.component
                })
                return false
              }
            }
          })
        } else if (data.code == 'Auth_401') {
        } else {
          this.$message.error(data.msg)
        }
      })
    },

    goR () {
      var myurl = window.location.origin + '/register.html'
      window.open(myurl, '_self')
    }
  }
}
</script>
<style>


</style>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .login_header{
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
  .login_content{
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
    .container {
      border-radius: 6px;
      position: absolute;
      top: 23%;
      right: 9%;
      width: 360px;
      background:rgba(255,255,255,0.2);
      border:1px solid rgba(219,219,219,0.2);
      .line{
        width: 100%;
        height: 1px;
        background-color: #DBDBDB;
        margin-bottom: 10px;
      }
      .tit{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size:20px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(255,255,255,1);
      }
      .login_form{
        padding: 0px 25px 15px 25px;
      }
      .login-btn{
        background:rgba(56,154,255,1);
        border-radius:2px;
        width: 100%;
        margin-bottom: 0px;
      }
      .linkButtton{
        font-weight:500;
        color:rgba(255,255,255,0.85);
        cursor: pointer;
      }

      .loginNameStyle{
        margin-bottom: 0;
      }
    }

  }

  .login_footer{
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
   .loginNameStyle /deep/.el-form-item__label{
    color:rgba(255,255,255,0.85);
  }
  .login_content /deep/.el-form--label-top .el-form-item__label{
    padding: 0;
  }

@media screen and (min-width: 1900px) {
  .login_content {
    height: 83%;
    .leftImg{
      width: 883px;
      height: 615px;
      margin-left: 110px;
      margin-top: 88px;
    }
  }
}
</style>
