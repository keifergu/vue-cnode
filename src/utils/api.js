import {paramsOverwrite, objectToUrl, isEmptyObject} from './utils.js';

const CNODE = 'https://cnodejs.org/api/v1';
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
  }
}

/**
 * CNode api 封装
 * UseAge：
 * import {cnode} from '';
 * cnode('topic_home')
 * @param  {String} api_string   调用的api名称，由config对象所定义
 * @param  {Object} data         使用POST方法时需要传送的数据
 * @param  {Object} params       API的自定义配置参数，会覆盖默认参数
 * @param  {Array}  pathParams   路径参数，按照顺序的数组
 * @return {Promise}             返回一个Promise对象，结束后会得到具体的数据
 */

export default function cnode(
  api_string = '',
  {
    data = {},
    params = {},
    pathParams = [],
  } = {}
  ) {
  let api = apiConfig[api_string];
  let path = (typeof api.path === 'string' )
    ? api.path : api.path(...pathParams);
  let fullParams = paramsOverwrite(api.params, params);
  let fullPath = CNODE + path + '?' + objectToUrl(fullParams);

  let fetchConf = {};
  if (api.method === ('POST' || 'post')) {
    let formData = new FormData();
    formData.append(json, JSON.stringify(data));
    fetchConf = {
      method: 'POST',
      body: formData,
    }
  } else {
    if (!isEmptyObject(data)) {
      console.error("GET can't have the data");
    }
    fetchConf = {
      method: 'GET',
    }
  }

  return fetch(fullPath, fetchConf).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(json => {
    return json.data;
  });
}
