<template>
  <el-select
    ref="selecttree"
    v-model="valueTitle"
    :title="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
  >
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    // 配置项
    props: {
      type: Object,
      default: {
        value: "id", // ID字段名
        label: "title", // 显示名称
        children: "children" // 子级字段名
      }
    },

    // 选项列表数据(树形结构的对象数组)
    options: { type: Array, default: [] },

    // 初始值
    value: { default: null },

    // 可清空选项
    clearable: { type: Boolean, default: true },

    // 自动收起
    accordion: { type: Boolean, default: false }
  },
  data() {
    return {
      valueId: null,
      valueTitle: "",
      defaultExpandedKey: []
    };
  },
  mounted() {
    (this.valueId = this.value), // 初始值
      this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId && this.$refs.selectTree.getNode(this.valueId)) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      } else {
        this.clearHandle();
      }
      // this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        console.log(scrollBar);
        scrollBar.forEach(ele => (ele.style.width = 0));
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", this.valueId);
      this.defaultExpandedKey = [];
      this.$refs.selecttree.blur();
      this.$forceUpdate();
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
    },
    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach(element => element.classList.remove("is-current"));
    }
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    }
  }
};
</script>

<style lang="less" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li /deep/.el-tree .el-tree-node__content span:first-child {
  min-width: 20px !important;
}
ul li /deep/.el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree /deep/.is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}

.el-tree /deep/.is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
