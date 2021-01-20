import request from '@/utils/http'

//批量启动流程
export function startProcessBatch(code, data) {
  return request({
    url: `/api/activiti/noLogin/repository/startProcessBatch/${code}`,
    method: 'post',
    data
  })
}

//批量审批
export function completeTaskBatch(data) {
  return request({
    url: `/api/activiti-task/complete-include-candidate-batch`,
    method: 'post',
    data
  })
}

//零部件撤回
export function componentRecall(data) {
  return request({
    url: `/api/activiti/noLogin/repository/revoke-to-committed`,
    method: 'post',
    data
  })
}

//车型撤回
export function modelRecall(data) {
  return request({
    url: `/api/activiti/noLogin/repository/revoke-to-vehicleModel`,
    method: 'post',
    data
  })
}

//车辆撤回
export function vehicleRecall(data) {
  return request({
    url: `/api/activiti/noLogin/repository/revoke-to-vehicle`,
    method: 'post',
    data
  })
}

// 流程图绘制
export function getProgressImageData(data) {
  return request({
    url: `/api/customized-branch/progressImageData`,
    method: 'get',
    params: data
  })
}
