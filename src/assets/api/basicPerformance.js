import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 查询车辆型号
// export function getModelList() {
//   return request({
//     url: '/baseinfo/vehicle-model/list',
//     method: 'post'
//   })
// }


//极化特性曲线
export function getBaseInformationChart() {
  return request({
    url: '/baseinfo/vehicleChart/baseInformationChart',
    method: 'get'
  })
}
