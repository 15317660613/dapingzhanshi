<template>
  <div id="app" class="white-skin">
    <!-- 登录注册页面 -->
    <!--    <router-view v-if="$route.name == 'Login'||$route.name == 'Register'" />-->
    <!-- 内容部分 -->
    <router-view />
    <div class="main-page">
      <!--头部页面开始-->
      <!--    <div class="global-header">
        <Gobal-Header
          :default-active="defaultActive"
          :is-collapse="isCollapse"
        />
      </div>-->
      <!--头部页面结束-->
      <div class="global-main">
        <!--需要时添加keep-alive-->
        <!-- <keep-alive :include="activePages">
          <router-view />
        </keep-alive>-->
      </div>
      <!--底部页面开始-->
      <!-- <div class="global-footer" v-if="footerItemType == '1'">
        <footer class="footer">
          <img class="logo_contain" src="./assets/img/login/logo.png" />
        </footer>
      </div>-->
      <!--底部页面结束-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { JSEncrypt } from "jsencrypt";
import cryptoJs from "crypto-js";
import { resetRouter } from "./router";
export default {
  name: "App",
  components: {
    // GobalHeader
  },
  data() {
    // 失去焦距的判断两次密码不止一次的校验规则
    let validPassWorld = (rule, value, callback) => {
      this.ncipherValid = true;
      if (this.formEdit.ncipher !== value && this.cpdValid) {
        callback(new Error("两次密码输入不一致"));
        return;
      }
      if (
        this.formEdit.ncipher.length >= 6 &&
        this.formEdit.ncipher.length <= 20
      ) {
        callback();
        this.$refs.formEdit.clearValidate("ncipher");
      }
    };
    // 失去焦距的判断两次密码不止一次的校验规则
    let validCpd = (rule, value, callback) => {
      this.cpdValid = true;
      if (this.formEdit.cpd !== value && this.cipherValid) {
        callback(new Error("两次密码输入不一致"));
        return;
      }

      callback();
      this.$refs.formEdit.clearValidate("cpd");
    };
    return {
      isCollapse: false,
      rsa: "",
      uuid: "",
      formEdit: {}, // 修改密码提交表单
      cipherValid: false, // 未获取过焦距，非提交不进行两次密码不一致校验
      cpdValid: false, // 未获取过焦距，非提交不进行两次密码不一致校验
      menu: [], // 菜单
      /** 弹出层相关参数 **/
      // 弹出层显示（隐藏）绑定值
      dialogVisible: false,
      // 弹出层标题
      dialogTitle: "",
      // 操作类型参数
      dialogType: "",
      rules: {
        ocipher: [{ required: true, message: "请输入旧密码" }],
        ncipher: [
          { required: true, message: "请输入新密码" },
          {
            pattern: this.$regexp.cipher,
            message: "密码仅为英文和数字最少6位，最长不超过20位",
            trigger: "blur",
          },
          {
            validator: validCpd,
            trigger: "blur",
          },
        ],
        cpd: [
          { required: true, message: "请输入确认密码" },
          { validator: validPassWorld, trigger: "blur" },
          {
            pattern: this.$regexp.cipher,
            message: "密码仅为英文和数字最少6位，最长不超过20位",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    /**
     * 时间:2019/10/16
     * 作者:yuanbotao
     * 功能:菜单伸缩
     * @param null
     */
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * 时间:2019/10/15
     * 作者:yuanbotao
     * 功能:操作用户信息
     * @param command：a-个人信息；b-修改密码；c-退出登录
     */
    handleCommand(command) {
      if (command != "c") {
        this.dialogVisible = true;
        this.dialogType = command;
      }
      if (command == "a") {
        this.dialogTitle = "个人信息";
      } else if (command == "b") {
        this.formEdit = {};
        this.$nextTick(() => {
          this.$refs.formEdit.clearValidate();
        });
        this.dialogTitle = "修改密码";
      } else if (command == "z") {
        this.dialogTitle = "退出登录";
      }
    },
    // 确认按钮
    commitButton() {
      if (this.dialogType == "a") {
      } else if (this.dialogType == "b") {
        this.cipherValid = true;
        this.cpdValid = true;
        this.$refs.formEdit.validate((valid) => {
          if (valid) {
            this.confirmSubmit(this.$clone(this.formEdit));
          } else {
            return false;
          }
        });
      } else if (this.dialogType == "z") {
        this.layoutLogin();
      }
    },
    changeCipher(data) {
      delete data.cpd;
      let newData = this.$clone(data);
      let der = cryptoJs.MD5(this.uuid).toString().substr(0, 16);
      let pubKey = cryptoJs.AES.decrypt(
        cryptoJs.enc.Base64.stringify(cryptoJs.enc.Hex.parse(this.rsa)),
        cryptoJs.enc.Utf8.parse(der),
        {
          mode: cryptoJs.mode.ECB,
          padding: cryptoJs.pad.Pkcs7,
        }
      ).toString(cryptoJs.enc.Utf8);
      let Encrypt = new JSEncrypt();
      Encrypt.setPublicKey(pubKey);
      newData.ocipher = Encrypt.encrypt(newData.ocipher);
      newData.ncipher = Encrypt.encrypt(newData.ncipher);
      this.$http.put("/system/user/change-cipher", newData).then(({ data }) => {
        if (data.code === "200") {
          this.dialogVisible = false;
          this.$message.success("修改成功");
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 获取公钥私钥
    confirmSubmit(data) {
      this.uuid = this.get_uuid();
      this.getServePublic(this.uuid, data);
    },
    // 获取服务器公钥
    getServePublic(cpk, formData) {
      this.$http({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "/rsa",
        data: cpk,
      }).then(({ data }) => {
        if (data.code == "200") {
          this.rsa = data.data;
          this.changeCipher(formData);
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    get_uuid: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0;
        var v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    // 关闭弹窗之前
    beforeCloseDialog(done) {
      this.formEdit = {};
      this.$refs.formEdit.clearValidate();
      done();
    },
    // 关闭对话框的回调
    closeDialog() {
      this.cipherValid = false;
      this.cpdValid = false;
    },
    /**
     * 时间:2019/10/16
     * 作者:yuanbotao
     * 功能:更换皮肤
     * @param row: 选中状态
     */
    changeSkin(row) {
      if (row == "1") {
        $("#app").removeClass("red-skin");
        $("#app").addClass("white-skin");
      } else if (row == "2") {
        $("#app").removeClass("white-skin");
        $("#app").addClass("red-skin");
      }
      localStorage.setItem("skinType", row);
    },

    /**
     * 时间:2019/10/18
     * 作者:yuanbotaod
     * 功能: 点击菜单跳转页面
     * @param params: 菜单数据
     */

    // 判断当前页签是否为被选中，改变样式
    currentSelectTags(tagname) {
      if (this.$store.state["tagsStore"].workTags.current.tagname == tagname) {
        return "active";
      } else {
        return "noActive";
      }
    },
    selectTag(tag) {
      // 路由对象传入vuex
      this.$router.push({
        path: tag.path,
      });
    },
    closeTag(tag) {
      if (tag.name == "OneVehicleMonitor") {
        this.$store.commit("clearMonitorVehicles");
      }
      // 路由对象传入vuex
      this.workTagsRemove({
        tag: tag,
        router: this.$router,
      });
    },
    layoutLogin() {
      this.$http.get("/logout").then(({ data }) => {
        if (data.code === "200") {
          localStorage.clear();
          sessionStorage.clear();
          this.dialogVisible = false;
          this.$router.push({
            path: "/views/Login",
            name: "Login",
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    checkLogin() {
      this.$http.get("/login/check").then(({ data }) => {
        if (data.code == "200") {
          localStorage.setItem("isLogin", JSON.stringify(data.data.loginName));
          this.$store.commit("changeMenu", data.data.permissionTree);
          this.$store.commit("tagsStore/initWorkTags");
          this.$store.commit("changeTenantCode", data.data.tenantCode);
          this.$store.commit("changeUsername", data.data.usname);
          this.$store.commit("clearMonitorVehicles");
          this.$store.commit("changeUserId", data.data.usid);
          let saveMenuData = this.$common.assemblingComponents(
            data.data.permissionTree
          );
          resetRouter(saveMenuData);
          this.$router.addRoutes(saveMenuData);
        } else if (data.code == "Auth_401") {
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // vuex辅助函数
    ...mapActions("tagsStore", ["workTagsRemove"]),
  },
  computed: {
    // 计算list改变
    workTags() {
      return this.$store.state["tagsStore"].workTags.list;
    },
    currentActiveTags() {
      return this.$store.state["tagsStore"].workTags.current;
    },
    activePages() {
      return this.$store.state["tagsStore"].activePages;
    },
    defaultActive() {
      return this.$route.path; // 当前激活的menu index
    },
  },
  watch: {
    "$store.state.menu": function (val) {
      this.menu = val;
    },
  },
  created() {},
};
</script>
<style lang="less">
html,
body,
#app,
.content {
  height: 100%;
  width: 100%;
}
</style>
