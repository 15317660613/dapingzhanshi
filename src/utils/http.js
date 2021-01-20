/** 引用axios **/
import config from '@/assets/js/config.js'
import axios from 'axios'
import {Message, Loading} from 'element-ui'

let loading //loading动画服务实例
let index = 0 //正在载入的个数
const redirectHref = process.env.NODE_ENV === 'development' ? '/views/Login' : './'
/** 全局配置 **/
// axios.defaults.timeout = 180000;
// 配置token
if (localStorage.getItem('loginToken')) {
//   axios.defaults.headers.common['Authorization'] = localStorage.getItem('loginToken'); // 存储登录验证token
}
// create an axios instance
const service = axios.create({
  baseURL: config.API_CONFIG, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
/** 请求拦截器 **/
service.interceptors.request.use((config) => {
  // loading = Loading.service({
  //   lock: true,
  //   text: '载入中...',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.2)',
  //   customClass: ''
  // })
  // index++
  if (config.method == 'post' && !config.data instanceof FormData) {  //判断非上传文件
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

/** 响应拦截器 **/
service.interceptors.response.use((res) => {
  //拦截代码，根据业务需求自己写
  // 请求结束loadding动画
  // index--
  // if (index < 1) {
  //   loading.close()
  // }
 
  // eslint-disable-next-line eqeqeq
  if (res.data.code === 'Auth_401' && res.config.url.indexOf('/login/check') == -1) {
    window.location.href = redirectHref
    return res
  }
  if (res.status === 200 && res.data.ok) {
    return res.data
  } else {
    Message.error(res.data.msg);
    return Promise.reject(new Error(res.data.msg || 'Error'))
  }
}, (error) => {
  try {
    if (!error.response) {
      throw "请求超时";
    }
    if (error.response.data.msg) {
      throw error.response.data.msg;
    }
    if (!error.response.data.msg) {
      throw '服务器开小差了~';
    }
  } catch (e) {
    alert("接口调用失败:" + error.response.statusText + "\n" +
      "状态码:" + error.response.status)
  }
  switch (error.response.status) {
    case 404:
      //404处理
      break;
    case 500:
      //500处理
      break;
    default:
      break;
  }
  return Promise.reject(error.response.response);
});


export default service
