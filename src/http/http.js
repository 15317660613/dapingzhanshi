/** 引用axios **/
import config from '@/assets/js/config.js'
import axios from 'axios'
import { Loading } from 'element-ui'

const redirectHref = process.env.NODE_ENV === 'development' ? '/views/Login' : './'
/** 全局配置 **/
axios.defaults.timeout = 180000
/** 基础路径 **/
axios.defaults.baseURL = config.API_CONFIG
/** 请求拦截器 **/
let loading
let index = 0
let messageFlag = true
axios.interceptors.request.use(function (config) {
  // 请求发起loadding动画
  // loading = Loading.service({
  //   lock: true,
  //   text: 'Loading...',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.2)',
  //   customClass: ''
  // })
  // index++
  // 在发送请求之前添加时间戳
  // eslint-disable-next-line eqeqeq
  if (config.method == 'post') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
    // eslint-disable-next-line eqeqeq
  } else if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
/** 响应拦截器 **/
axios.interceptors.response.use((res) => {
  // 拦截代码，根据业务需求自己写
  // index--
  // if (index < 1) {
  //   loading.close()
  // }
  // 请求结束loadding动画
  // eslint-disable-next-line eqeqeq
  if (res.data.code === 'Auth_401' && res.config.url.indexOf('/login/check') == -1) {
    messageFlag = false
    window.location.href = redirectHref
    return res
  }
  if (messageFlag) {
    return res
  }
}, (error) => {
  try {
    if (!error.response) {
      // eslint-disable-next-line no-throw-literal
      throw '请求超时'
    }
    if (error.response.data.msg) {
      throw error.response.data.msg
    }
    if (!error.response.data.msg) {
      // eslint-disable-next-line no-throw-literal
      throw '服务器开小差了~'
    }
  } catch (e) {
    alert('error', e)
  }
  switch (error.response.status) {
    case 404:
      // 404处理
      break
    case 500:
      // 500处理
      break
    default:
      break
  }
  return Promise.reject(error.response.response)
})

/** 请求封装 **/
export default {
  get (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        params: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put (url, options) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: url,
        data: options
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
