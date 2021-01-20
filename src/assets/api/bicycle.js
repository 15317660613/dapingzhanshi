import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 单车管理详情页面静态数据查询
export function getBicycleStatic(data) {
  return request({
    url: '/monitor/staticInfo',
    method: 'get',
    params: {
      vin: data
    },
  })
}