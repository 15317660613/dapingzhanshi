import request from '@/utils/http'

// 零部件待办列表
export function getComponentBacklogList(data) {
  return request({
    url: `/baseinfo/component/ComponentPageBySearchNoEdit`,
    method: 'post',
    data
  })
}
