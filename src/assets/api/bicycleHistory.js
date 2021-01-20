import request from '@/utils/http'

/* 
 EngineAdmin
  */
// 单车管理历史轨迹
export function getHistory(data) {
  return request({
    url: '/monitor/history-position',
    method: 'post',
    data
  })
}