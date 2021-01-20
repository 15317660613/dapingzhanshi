import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 单车管理列表查询
export function getBicycleList(data) {
  return request({
    url: '/baseinfo/vehicle/page',
    method: 'post',
    data
  })
}