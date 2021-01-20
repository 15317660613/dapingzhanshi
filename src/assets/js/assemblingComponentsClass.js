/**
 * @Description:动态组件component拼装以防止刷新空白的bug
 * @author:ybt
 * @Date:2019/10/18
 * @params:[0]对象源
 * @return:null
 */
const components = {}
components.Home = () => import('@/views/Home.vue')
const routers = []
/* 异步引入，懒加载 */

// information 信息管理
// components.EngineAdmin = () => import('@/views/information/EngineAdmin.vue')

export default class {
  assemblingComponents (params) {
    params.forEach((value, key) => {
      if (value.children) {
        if (value.children.length > 1) {
          value.children.sort(function (a, b) {
            return Number(a.node.sort) - Number(b.node.sort)
          })
        }
        value.children.forEach((value, key) => {
          if (value.children) {
            value.children.forEach((value, key) => {
              routers.push({
                path: value.node.path,
                name: value.node.component,
                meta: {
                  tagname: value.node.name
                },
                component: components[value.node.component]
              })
            })
          } else {
            routers.push({
              path: value.node.path,
              name: value.node.component,
              meta: {
                tagname: value.node.name
              },
              component: components[value.node.component]
            })
          }
        })
      } else {
        routers.push({
          path: value.node.path,
          name: value.node.component,
          meta: {
            tagname: value.node.name
          },
          component: components[value.node.component]
        })
      }
    })
    return routers
  }
}
