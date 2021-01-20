import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 发动机管理分页查询
export function getTree(data) {
  return request({
    url: `/baseinfo/VehicleMonitor/LeftTree`,
    method: 'post',
    data
  })
}