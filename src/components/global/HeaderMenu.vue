 <template>
  <!-- 没有二级菜单 -->
    <el-menu-item v-if="!route.children" :key="route.node.path" :index="route.node.path">
      <i :class="route.node.icon"></i>
      <span slot="title">{{route.name}}</span>
    </el-menu-item>
    <!-- 包含二级菜单 -->
    <el-submenu v-else :key="route.node.path" :index="route.node.path">
      <i class="jiantou"></i>
      <template slot="title">
        <i :class="route.node.icon"></i>
        <span>{{route.name}}</span>
      </template>
      <el-menu-item
        :index="childItem.node.path"
        :key="childIndex"
        v-for="(childItem,childIndex) in route.children"
      >
        <span class="level2">{{childItem.name}}</span>
        <template v-if="level3Menu(route.children)">
          <div class="level3">
            <div>
              <span v-if="!childItem.children">无</span>
              <router-link
                v-for="(item,index) in childItem.children"
                :to="item.node.path"
                :key="index"
              >{{item.name}}</router-link>
            </div>
          </div>
        </template>
      </el-menu-item>
    </el-submenu>
</template>
<script>
export default {
  name: "HeaderMenu",
  props: ["route"],
  methods: {
    level3Menu(children) {
      return children.some((item) => {
        return item.children;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.menuContent{
  overflow: hidden;
}
.jiantou {
  display: inline-block;
  height: 0;
  width: 0;
  border-width: 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent #ffffff;
  position: absolute;
  top: -10px;
  left: 5px;
}
.el-submenu__title i {
  color: #ffffff;
}
.el-menu-item i {
  color: #ffffff;
}
.is-active .el-submenu__title i {
  color: rgb(54, 168, 255);
}
.level2 {
  display: inline-block;
  min-width: 100px;
  vertical-align: baseline;
}
.level3 {
  display: inline-block;
  padding-left: 10px;
  position: relative;
  > div {
    display: flex;
    flex-wrap: wrap;
    > a {
      width: 50%;
    }
  }
}
.level3::after {
  content: "";
  border: inherit;
  height: 10px;
  width: 1px;
  background: #909399;
  display: block;
  position: absolute;
  top: 14px;
  left: -10px;
}
</style>