import request from '@/utils/http'

/*
 EngineAdmin
  */
//我的工作-待办工作
export function getTodoWork(data) {
  return request({
    url: '/api/activiti-task/runtime-with-candidateV2',
    method: 'post',
    data
  })
}
// 政策公告
export function getPolicyNotice(data) {
  return request({
    url: '/rdbms/announcement/page',
    method: 'post',
    data
  })
}
// 行业新闻
export function getIndustryNews(data) {
  return request({
    url: '/rdbms/news/page',
    method: 'post',
    data
  })
}
