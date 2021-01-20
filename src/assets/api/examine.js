import request from '@/utils/http'

/*
 EngineAdmin
  */
//我的工作-待办工作
export function getFileInfo(params) {
  return request({
    url: '/rdbms/settlement/approve/area-attachment/',
    method: 'get',
    params
  })
}
