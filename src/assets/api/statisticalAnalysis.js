import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 车辆耐久性分布
export function getDurability() {
  return request({
    url: '/statistics/vehicle/durability',
    method: 'get',
  })
}

//全国车辆累计纯氢续驶里程分布
export function getFuelDrivingOdometer() {
  return request({
    url: '/statistics/vehicle/fuelDrivingOdometer',
    method: 'get',
  })
}

//全国加氢站70MPa及35MPa加氢比例及值和总值
export function getAddHydrogenTypeRateVo() {
  return request({
    url: '/statistics/vehicle/addHydrogenTypeRateVo',
    method: 'get',
  })
}

//全网车辆累计纯氢续驶里程及纯电里程比例及值和总值
export function getFuelDrivingOdometerRate() {
  return request({
    url: '/statistics/vehicle/fuelDrivingOdometerRate',
    method: 'get',
  })
}

//全网车辆累计纯氢续驶里程及纯电里程比例及值和总值
export function getFaultTypeStatisticsVo() {
  return request({
    url: '/statistics/vehicle/faultTypeStatisticsVo',
    method: 'get',
  })
}

//全国加氢站累计加氢量分布
export function getAddHydrogenAmountStatistics() {
  return request({
    url: '/statistics/vehicle/addHydrogenAmountStatistics',
    method: 'get',
  })
}

//全国加氢站累计70MPa加氢量分布
export function getAddHydrogenAmount70MPaStatistics() {
  return request({
    url: '/statistics/vehicle/addHydrogenAmount70MPaStatistics',
    method: 'get',
  })
}