/**
 * @Description:全局js 模块引用 每个模块是一个实体类便于维护
 * @author:ybt
 * @Date:2019/10/18
 */
import assemblingComponentsClass from './assemblingComponentsClass';
export default class{
  assemblingComponents(...params){
    let callback = new assemblingComponentsClass(...params);
    return callback.assemblingComponents(...params);
  }
}
