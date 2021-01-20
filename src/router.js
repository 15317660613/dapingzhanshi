import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

/** 登录页面 **/
import Register from './views/register'
import Login from './views/login/index.vue'


/** 404页面 **/
import NotFound from './views/NotFound.vue'
/** 引入全局js **/
import common from './assets/js/common'

import First from './views/BI/first.vue'
import Second from './views/BI/second.vue'
import Third from './views/BI/third.vue'
import Fourth from './views/BI/fourth.vue'

Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const createRouter = () => new Router({
  /** 去掉项目中的url的# **/
  mode: process.env.NODE_ENV === 'development' ? 'history' : '',
  base: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : '',
  routes: [
    /**
    * 时间:2019/10/11
    * 作者:yuanbotao
    * 功能:登录页
    */
    {
      path: '/',
      redirect: '/views/first'
    },
    {
      path: '/views/Login',
      name: 'Login',
      component: Login,
      meta: {
        loginCheck: false

      }
    },
    {
      path: '/views/register',
      name: 'Register',
      component: Register
    },
    // {
    //   path: '/views/ce',
    //   name: 'ce',
    //   component: ce
    // },
    {
      path: '/views/404',
      name: 'NotFound',
      component: NotFound
    },
    /* 详情  */
    {
      path: '/views/first',
      name: 'First',
      component: First
    },
    {
      path: '/views/second',
      name: 'Second',
      component: Second
    },
    {
      path: '/views/third',
      name: 'Third',
      component: Third
    },
    {
      path: '/views/fourth',
      name: 'Fourth',
      component: Fourth
    }, {
      path: '*', // 此处需特别注意置于最底部
      redirect: '/views/404'
    }
    // {
    //   path: '/industryService/vehicleSampleCheck',
    //   name: 'VehicleSampleCheck',
    //   component: VehicleSampleCheck
    // }
  ]
})

const router = createRouter()
const commonJs = new common()
const newRouter = createRouter()
router.matcher = newRouter.matcher
const newMenu = commonJs.assemblingComponents(store.state.menu)
router.addRoutes(newMenu)

/**
 * 时间:2019/10/11
 * 作者:yuanbotao
 * 功能:路由守卫（初始登录以及非法登录跳转到登录页）
 */
router.beforeEach((to, from, next) => {
  // 登录页存入的登录用户信息
  let isLogin = JSON.parse(localStorage.getItem('isLogin'))
  if (to.meta.tagname) {
    // 判断tagname是否存在，存在则激活workTagsRoute
    store.dispatch('tagsStore/workTagsRoute', {
      name: to.name,
      tagname: to.meta.tagname,
      path: to.path
    })
  }
  if (to.name) {
    if (to.meta.loginCheck && !isLogin) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    if (!isLogin) {
      next({
        name: 'Login'
      })
    } else {
      next({
        name: 'home'
      })
    }
  }
})

export default router

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
