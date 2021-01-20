import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 发动机管理分页查询
export function getEnginePage(data) {
  return request({
    url: '/baseinfo/engine/page',
    method: 'post',
    data
  })
}
