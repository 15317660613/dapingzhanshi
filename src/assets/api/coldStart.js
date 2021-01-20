import request from '@/utils/http'

/* 
 EngineAdmin
  */

//低温冷启动
export function getLowTemperatureStartUp() {
  return request({
    url: '/baseinfo/vehicleChart/lowTemperatureStartUp',
    method: 'get'
  })
}


