import request from '@/utils/http'

/* 
 EngineAdmin
  */

//氢电里程
export function getHydrogenElectricMileageChart() {
  return request({
    url: '/baseinfo/vehicleChart/hydrogenElectricMileageChart',
    method: 'get'
  })
}

//氢耗电耗
export function getHydrogenAndPwoerConsumptionChart() {
  return request({
    url: '/baseinfo/vehicleChart/HydrogenAndPwoerConsumptionChart',
    method: 'get'
  })
}

//纯氢运行里程
export function getHydrogenMileage() {
  return request({
    url: '/baseinfo/vehicleChart/hydrogenMileage',
    method: 'get'
  })
}

//总计加氢
export function getTotalHydrotreating() {
  return request({
    url: '/baseinfo/vehicleChart/totalHydrotreating',
    method: 'get'
  })
}

//35MPa / 70MPa
export function getMpaNumber() {
  return request({
    url: '/baseinfo/vehicleChart/mpaNumber',
    method: 'get'
  })
}


