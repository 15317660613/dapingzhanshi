/**
 * @author czj
 * @date 2020/7/28
 * @Description: 行政管理 - 车辆抽检管理
 */
import request from '@/utils/http'
// 分页获取列表
export function getCheckPage (data) {
  return request({
    url: '/rdbms/vehicle-cj-page/page',
    method: 'post',
    data
  })
}
// 抽检
export function getCheckData (data) {
  return request({
    url: '/rdbms/vehicle-cj-page/sampling',
    method: 'post',
    data
  })
}
// 发送
