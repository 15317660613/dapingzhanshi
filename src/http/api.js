/** 引入http **/
import http from '@/http/http';

/** 区分开发环境还是生产环境 **/
import apiConfig from "../assets/js/config";
const API_CONFIG = apiConfig.API_CONFIG;

/** 配置路径 **/
let apiUrl = {
  getMenuData:API_CONFIG+"/getMenuData",//动态菜单数据
  getTable:API_CONFIG+"/getTable",//表格数据
};

/** 接口调用 **/
export default{
  getMenuData(option,success,error){
    http.get(apiUrl.getMenuData,option).then(res=>{
      return success && success(res);
    }).catch(err=>{
      return error && error(err);
    })
  },
  getTable(option,success,error){
    http.get(apiUrl.getTable,option).then(res=>{
      return success && success(res);
    }).catch(err=>{
      return error && error(err);
    })
  },
}
