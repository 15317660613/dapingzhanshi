/**
 * @Description:全局配置文件（默认路径，提示语等）
 * @author:yuanbotao
 * @Date:2019/10/16
 */

const URL = '/api-server' // 基本请求配置
export default {
  /** 路由转发 **/
  API_CONFIG: process.env.NODE_ENV === 'development' ? '/api' : URL,
  /** webSocket配置 **/
  webLocalHost: 'ws://192.168.144.247:8081/ws-server',
  // webLocalHost:"ws://" + location.host + "/ws-server",
  // webLocalHost:"ws://localhost:8081/ws-server",
  /** 刷新加载的提示语 **/
  refreshing: '拼命加载中...',
  /** 未开放功能 **/
  notice: '此功能暂未开放！'
}
