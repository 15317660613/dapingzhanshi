import request from '@/utils/http'

// 技术提升-百公里氢耗优化潜力
export function getOpHydrogenConsumption(p1,p2) {
  return request({
    url: '/baseinfo/chip/opHydrogenConsumption/',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-耐久性优化潜力
export function getOpDurability(p1,p2) {
  return request({
    url: '/baseinfo/chip/opDurability',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-低温冷启动优化潜力
export function getOpColdStart(p1,p2) {
  return request({
    url: '/baseinfo/chip/opColdStart',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-动力电池功率占比优化潜力
export function getOpPowerBatteryPowerRatio(p1,p2) {
  return request({
    url: '/baseinfo/chip/opPowerBatteryPowerRatio',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-各个因素百分比
export function getOpFactorPercentage(p1,p2) {
  return request({
    url: '/baseinfo/chip/opFactorPercentage',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-阳极压力
export function getPlAnodePressur(p1,p2) {
  return request({
    url: '/baseinfo/chip/plAnodePressure',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-阴极压力
export function getPlCathodePressure(p1,p2) {
  return request({
    url: '/baseinfo/chip/plCathodePressure',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-阴极压力
export function getPlVeryPoor(p1,p2) {
  return request({
    url: '/baseinfo/chip/plVeryPoor',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-电堆电压限值过高
export function getPlVoltageLimitTooHigh(p1,p2) {
  return request({
    url: '/baseinfo/chip/plVoltageLimitTooHigh',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-电堆电压限值过低
export function getPlVoltageLimitTooLow(p1,p2) {
  return request({
    url: '/baseinfo/chip/plVoltageLimitTooLow',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-出口冷却液温度过高
export function getPlOutletCoolantTemperatureIsTooHigh(p1,p2) {
  return request({
    url: '/baseinfo/chip/plOutletCoolantTemperatureIsTooHigh',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-出口冷却液温度过低
export function getPlOutletCoolantTemperatureIsTooLow(p1,p2) {
  return request({
    url: '/baseinfo/chip/plOutletCoolantTemperatureIsTooLow',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-入口冷却液温度过高
export function getPlInletCoolantTemperatureIsTooHigh(p1,p2) {
  return request({
    url: '/baseinfo/chip/plInletCoolantTemperatureIsTooHigh',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-入口冷却液温度过低
export function getPlInletCoolantTemperatureIsTooLow(p1,p2) {
  return request({
    url: '/baseinfo/chip/plInletCoolantTemperatureIsTooLow',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-出入口温差过大
export function getPlLetTemperatureDifferenceTooBig(p1,p2) {
  return request({
    url: '/baseinfo/chip/plLetTemperatureDifferenceTooBig',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-空气进气温度过高
export function getPlAirIntakeTemperatureIsTooHigh(p1,p2) {
  return request({
    url: '/baseinfo/chip/plAirIntakeTemperatureIsTooHigh',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}

// 技术提升-单体电池电压差过大
export function getPlBatteryVoltageDifferenceTooBig(p1,p2) {
  return request({
    url: '/baseinfo/chip/plBatteryVoltageDifferenceTooBig',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}


// 技术提升-能耗占比
export function getPlEnergyConsumption(p1,p2) {
  return request({
    url: '/baseinfo/chip/plEnergyConsumption',
    method: 'get',
    params: {
      vehicleEnterpriseId: p1,
      vehicleModelId: p2
    },
  })
}