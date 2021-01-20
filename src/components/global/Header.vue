<template>
  <header class="header">
    <div class="main-function">
      <div class="logo">
        <div class="block">
          <img class="icon" src="@/assets/img/header/logo.png" />
        </div>
        <span class="info">示范评价及验证平台</span>
      </div>
      <div class="menu">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          active-text-color="#36A8FF"
          text-color="#ffffff"
          background-color="#275998"
          mode="horizontal"
          @select="selectMenu"
        >
          <Header-menu v-for="(route,index) in $store.state.menu" :route="route" :key="index"></Header-menu>
        </el-menu>
      </div>

      <div class="personal-information">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="userImg">
              <img src="@/assets/img/header/user.png" />
            </span>
            <span style="color:#ffffff;">{{$store.state.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="a">个人信息</el-dropdown-item> -->
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="z">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="400px"
      @close="closeDialog"
      :before-close="beforeCloseDialog"
    >
      <div class="dialog-content">
        <div class="content-box" v-if="dialogType == 'a'"></div>
        <div class="content-box" v-if="dialogType == 'b'">
          <el-form
            :model="formEdit"
            class="formEdit"
            ref="formEdit"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="旧密码" prop="ocipher">
              <el-input
                v-model="formEdit.ocipher"
                type="password"
                maxlength="200"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="ncipher">
              <el-input
                v-model="formEdit.ncipher"
                type="password"
                maxlength="200"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpd">
              <el-input v-model="formEdit.cpd" type="password" maxlength="200" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-box" v-if="dialogType == 'z'">
          <p style="text-align: center">是否退出登录?</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitButton">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import HeaderMenu from "@/components/global/HeaderMenu.vue";
export default {
  name: "Header",
  props: ["defaultActive", "isCollapse"],
  data() {
    return {
      /** 弹出层相关参数 **/
      // 弹出层显示（隐藏）绑定值
      dialogVisible: false,
      // 弹出层标题
      dialogTitle: "",
      // 操作类型参数
      dialogType: "",
    };
  },
  components: {
    HeaderMenu,
  },
  methods: {
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
    selectMenu(...params) {
      this.$router.push({
        path: params[0],
      });
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
    layoutLogin() {
      this.$http.get("./logout").then(({ data }) => {
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
  },
  created() {
    if (this.$route.name !== "Login") {
      let userInfo = JSON.parse(localStorage.getItem("isLogin"));
      this.$store.commit("changeUsername", userInfo.username);
    }
  },
};
</script>

<style scoped lang="less">
/*采用flex布局*/
.header {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  display: flex;
  .logo_contain {
    margin: 4px 0 4px 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .main-function {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1; // 剩余部分充满
    height: 100%;
    .el-dropdown {
      cursor: pointer;
      .el-dropdown-link {
        .userImg {
          display: inline-block;
          margin-right: 7px;
          width: 29px;
          height: 29px;
          line-height: 29px;
          text-align: center;
          img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
          }
        }
      }
    }
    .logo {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 29px;
      .icon {
        width: 19px;
        height: 18px;
      }
      .block {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        margin-right: 7px;
        width: 29px;
        height: 29px;
      }
    }
  }
}
</style>
