import request from '@/utils/http'


//获取省份
export function getProvince() {
  return request({
    url: "/rdbms/settlement/apply/support/province",
    method: 'get'
  })
}
//获取新技术的车辆推广数据
export function getVehicleList(params) {
  return request({
    url: '/rdbms/settlement/apply/list/vehicle',
    method: 'get',
    params
  })
}
//获取加氢站列表
export function getSite(params) {
  return request({
    url: "/rdbms/settlement/apply/list/hydrogen-station",
    method: 'get',
    params
  })
}
//获取零部件企业列表
export function getComponent(params) {
  return request({
    url: "/rdbms/settlement/apply/list/component",
    method: 'get',
    params
  })
}
//加入待清算
export function addAwaitSettlement(data) {
  return request({
    url: "/rdbms/settlement/apply/addAwaitSettlement",
    method: 'post',
    data
  })
}
//查询企业列表
export function getCompanyNameOption(params) {
  return request({
    url: "/rdbms/settlement/apply/list/tenant-name",
    method: "get",
    params
  })
}
//查询待清算车辆列表
export function getToBeSettledVehicleList(params) {
  return request({
    url: "/rdbms/settlement/apply/list/wait-for-settlement",
    method: "get",
    params
  })
}
//取消待清算
export function cancelToBeSettledVehicleList(data) {
  return request({
    url: "/rdbms/settlement/apply/cancelAwaitSettlement",
    method: "post",
    data
  })
}
//暂存当前操作状态
export function stash(params) {
  return request({
    url: "/rdbms/settlement/apply/score",
    method: "get",
    params
  })
}
//提交申报
export function submit(params) {
  return request({
    url: "/rdbms/settlement/apply/submit",
    method: "put",
    params
  })
}
