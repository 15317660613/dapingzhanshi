import request from '@/utils/http'

//查询零部件类型
export function getComponentType() {
  return request({
    url: `/baseinfo/component`,
    method: 'get'
  })
}

// 零部件列表表头
export function getComponentListHeader(pid) {
  return request({
    url: `/baseinfo/component/${pid}`,
    method: 'get'
  })
}

// 零部件列表
export function getComponentListByPage(data) {
  return request({
    url: `/baseinfo/component/ComponentPageBySearch`,
    method: 'post',
    data
  })
}

//新增零部件
export function addComponent(data){
  return request({
    url: '/baseinfo/component',
    method: 'post',
    data
  })
}

//修改零部件
export function editComponent(data){
  return request({
    url: '/baseinfo/component/updateDetail',
    method: 'put',
    data
  })
}

//删除零部件
export function deleteComponent(ids){
  return request({
    url: `/baseinfo/component/${ids}`,
    method: 'delete'
  })
}

//零部件详情
export function getComponentDetail(businessId, pid) {
  return request({
    url: `/baseinfo/component/${businessId}/${pid}`,
    method: 'get'
  })
}

// 车辆列表
export function getVehicleListByPage(data) {
  return request({
    url: '/baseinfo/vehicle/page',
    method: 'post',
    data
  })
}

// 车型列表
export function getModelListByPage(data) {
  return request({
    url: '/baseinfo/vehicle-model/page',
    method: 'post',
    data
  })
}

//车型字段列表
export function getModelField() {
  return request({
    url: '/baseinfo/vehicle-model/findAll',
    method: 'get'
  })
}

//车型新增
export function addModel(data){
  return request({
    url: '/baseinfo/vehicle-model',
    method: 'post',
    data
  })
}

//删除车型
export function deleteModel(ids){
  return request({
    url: `/baseinfo/vehicle-model/${ids}`,
    method: 'delete'
  })
}

//车型详情
export function getModelDetail(id) {
  return request({
    url: `/baseinfo/vehicle-model/${id}`,
    method: 'get'
  })
}

//修改车型
export function editModel(data){
  return request({
    url: '/baseinfo/vehicle-model/update',
    method: 'put',
    data
  })
}

//车辆字段列表
export function getVehicleField() {
  return request({
    url: '/baseinfo/vehicle/findAll',
    method: 'get'
  })
}

//车辆新增
export function addVehicle(data){
  return request({
    url: '/baseinfo/vehicle/save',
    method: 'post',
    data
  })
}

//修改车辆
export function editVehicle(data){
  return request({
    url: '/baseinfo/vehicle/update',
    method: 'put',
    data
  })
}

//车辆详情
export function getVehicleDetail(id) {
  return request({
    url: `/baseinfo/vehicle/${id}`,
    method: 'get'
  })
}

//删除车辆
export function deleteVehicle(ids){
  return request({
    url: `/baseinfo/vehicle/${ids}`,
    method: 'delete'
  })
}

//获取已审批零部件列表
export function getComponentList(type) {
  return request({
    url: `/baseinfo/component/${type}`,
    method: 'post'
  })
}
