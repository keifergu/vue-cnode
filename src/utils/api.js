import {paramsOverwrite, objectToUrl, isEmptyObject} from './utils.js';

const CNODE = 'https://cnodejs.org/api/v1';
const accesstoken = 0;
const apiConfig = {
  topic_home: {
    method: 'GET',
    path: '/topics',
    params: {
      mdrender: true,
    },
  },
  topic_details: {
    method: 'GET',
    path: (id) => `/topic/${id}`,
    params: {},
  },
  user_info: {
    method: 'GET',
    path: (loginname) => `/user/${loginname}`,
    params: {},
  },
  new_reply: {
    method: 'POST',
    path: (topic_id) => `/topic/${topic_id}/replies`,
    params: {
      accesstoken: accesstoken
    }
  },
}

function setToken(accesstoken) {
  localStorage.setItem(localStorage);
}
/**
 * CNode api 封装
 * UseAge：
 * import {cnode} from '';
 * cnode('topic_home')
 * @param  {String} api_string   调用的api名称，由config对象所定义
 * @param  {Object} params       API的自定义配置参数，会覆盖默认参数,传送的数据参数
 * @param  {Array}  pathParams   路径参数，按照顺序的数组
 * @return {Promise}             返回一个Promise对象，结束后会得到具体的数据
 */

export default function cnode(
  api_string = '',
  {
    params = {},
    pathParams = [],
  } = {}
  ) {
  // 获得该API参数
  let api = apiConfig[api_string];
  // 解析URL路径
  // 如果 API 中参数为字符串则直接返回字符串
  // 如果为函数，则说明路径需要动态构造，将pathParms数组结构传入
  let path = (typeof api.path === 'string' )
    ? api.path : api.path(...pathParams);
  // 使用自定以的参数覆盖默认参数
  let fullParams = paramsOverwrite(api.params, params);
  // 获得完整的URL,如果是GET方法，则将参数附加在url之后，POST方法则在后面处理
  let fullURL = CNODE + path + '?' + objectToUrl(fullParams);

  let fetchConf = {
    method: api.method
  };

  return fetch(fullURL, fetchConf).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(json => {
    return json.data;
  });
}
