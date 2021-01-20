import request from '@/utils/http'

/* 
 EngineAdmin
  */

//耐久性
export function getVehicleDurabilityChart() {
  return request({
    url: '/baseinfo/vehicleChart/vehicleDurabilityChart',
    method: 'get'
  })
}


