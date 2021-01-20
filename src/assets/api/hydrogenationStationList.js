import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 加氢站管理列表查询
export function getStationList(data) {
  return request({
    url: '/system/tenant/page',
    method: 'post',
    data
  })
}