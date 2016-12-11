import {paramsOverwrite, objectToUrl} from './utils/utils.js';

const CNODE = 'https://cnodejs.org/api/v1';
const apiConfig = {
  topic_home: {
    method: 'get',
    url: '/topics',
    params: {
      mdrender: true,
    },
  },
  topic_details: {
    method: 'get',
    url: '/topic/',
  }
}

export function cnode(api_string = '', params = {}, data = {}) {
  let api = apiConfig[api_string];
  params = paramsOverwrite(api.params, params);
  let path = CNODE + api.url + '?' + objectToUrl(params);
  return fetch(path).then(response => {
    if (response.ok) {
      return response.json();
    }
  }).then(json => {
    return json.data;
  });
}
