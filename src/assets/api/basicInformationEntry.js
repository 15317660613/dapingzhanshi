/**
 * @author wm
 * @date 2020/7/24
 * @Description: 行政管理 - 企业基本信息
 */
import request from '@/utils/http'
// 整车企业数据列表
export function getTenantListByPage (data) {
  return request({
    url: '/system/tenant/page',
    method: 'post',
    data
  })
}
// 企业类型
export function getTenantType (data) {
  return request({
    url: '/system/tenant/type/list',
    method: 'GET',
    data
  })
}

// 获取地区信息
export function getAreaList (data) {
  return request({
    url: '/rdbms/area/list',
    method: 'POST',
    data
  })
}
// 企业信息编辑
export function editTenant (data) {
  return request({
    url:'/system/tenant/',
    method: 'PUT',
    data
  })
}
// 零部件企业
// 加氢站企业
