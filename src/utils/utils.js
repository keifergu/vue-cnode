/**
 * 将一个对象转换为URL的参数字符串
 * @param  {[type]} obj 需要转换的对象
 * @return {[type]}     返回agiel转换后的字符串
 */
export function objectToUrl(obj) {
  let url = '';
  for(let param in obj) {
    // url.concat(param,'=',obj[param]);
    url += param + '=' + obj[param] + '&';
  }
  return url;
}

/**
 * 使用自定义参数覆盖默认参数
 * @param  {Object} params     默认参数
 * @param  {Object} new_params 自定义参数
 * @return {[type]}            返回覆盖后的新参数对象
 */
export function paramsOverwrite(params = {}, new_params = {}) {
  for(let key in params) {
    if (new_params.hasOwnProperty(key)) {
      params[key] = new_params[key];
    }
  }

  for(let key in new_params) {
    if (params.hasOwnProperty(key) === false) {
      params[key] = new_params[key];
    }
  }

  return params;
}
