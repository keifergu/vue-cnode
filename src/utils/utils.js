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

/**
 * 判断一个对象是否为空的方法
 * @param  {Object}  args 需要进行判断的对象
 * @return {Boolean}      空则返回true，不为空则返回false
 */
export function isEmptyObject(args) {
  for(let t in args)
    return !1;
  return !0;
}

/**
 * 将毫秒转换为 xx小时 ， xx分钟的格式
 * 根据值的大小，返回最接近的单位
 * @param  {Number} countedMsec 需要转换的毫秒数
 * @return {[type]}             返回值，类似20小时，2分钟
 */
export function toRelativeTime(countedMsec) {
  countedMsec = countedMsec / 1000;
  var dict = [
    ['31536000','年'],
    ['2592000','月'],
    ['604800','星期'],
    ['86400','天'],
    ['3600','小时'],
    ['60','分钟'],
    ['1','秒']
  ]
  for(let i = 0; i < 7; i++) {
    var unitMesc = dict[i][0];
    if (countedMsec > unitMesc) {
      return Math.floor(countedMsec / unitMesc) + ' ' + dict[i][1];
    };
  };
};
