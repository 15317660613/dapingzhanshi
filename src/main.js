import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import echarts from 'echarts'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import ECharts from 'vue-echarts/components/ECharts.vue'
import './shim.js'
import globalV from '@/assets/js/global_variable.js'

import 'echarts/map/js/china'
//引入v-chart组件
Vue.component('v-chart', ECharts)
/**
 * @Description:全局引入正则表达式
 * @author:yuanbotao
 * @Date:2019/10/11
 */
import regexp from "./assets/js/regexp";
Vue.prototype.$regexp = regexp;

import axios from 'axios'
import api from '@/http/api'
Vue.prototype.$http = axios
Vue.prototype.$api = api;

//JSON方法copy
Vue.prototype.$clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * @Description:全局引入jquery
 * @author:yuanbotao
 * @Date:2019/10/12
 */
import $ from 'jquery';

// 解决menu菜单问题引入文件
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

/**
 * @Description:导入全局js类
 * @author:ybt
 * @Date:2019/10/18
 * @explain:$common可在vue文件中全局使用，使用方法this.$common
 */
import commonJs from './assets/js/common.js'
let common = new commonJs();
Vue.prototype.$common = common;

import "./assets/js/ie/compatible";

Vue.config.productionTip = false;
Vue.use(Element);
//挂载echarts
Vue.prototype.$echarts = echarts
Vue.prototype.$specialCharValid = (rule, value, callback) => {
  if (/[\&\<\>\"\\]/.test(value)) {
    callback(new Error("不可输入特殊字符(半角&,<,>,\",\\)"));
  }else{
    callback();
  }
};

Vue.prototype.GLOBAL = globalV;


//千分位
Vue.filter('formatNumber', function(value = '0', currencyType = '') {
  let res;
  if (value.toString().indexOf('.') === -1) {
      res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  } else {
      let prev = value.toString().split('.')[0]
      let next = value.toString().split('.')[1] < 10 ? value.toString().split('.')[1] + '0' : value.toString().split('.')[1]
      res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next
  }
  return currencyType + res
});

// 全局指令
// 注册一个全局自定义指令 `不允许输入空格&*%等特殊字符`
// Vue.directive('filterSpecialChar', {
//   update: function (el, { value, modifiers }, vnode) {
//     try {
//       //此处可以debug看看el具体值是什么,这里演示的是原生控件input,如果是使用element中的<el-input />标签,需要通过 el.children[0] 拿到原生input.
//       if (!el.children[0].value||!/[\&\<\>]/g.test(el.children[0].value)) {
//         return false;
//       }
//       el.children[0].value = el.children[0].value.replace(/[\&\<\>\\]/g, "");
//       el.children[0].dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'))
//     } catch (e) {
//     }
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
