import {none, forever, group} from './cache';
import {version} from './config';
import {dsid, authorization} from './appId';
import queue from './queue';

function options(method, url, data) {
  url = `/TDE_DAP_Portal_REST_WEB/api/${version}${url}`;
  var params= {dsid: dsid()};
  if(method === 'GET') {
    if(data) {
      params = Object.keys(data).reduce((params, key) => {
        params[key] = data[key];
        return params;
      }, params);
    }
  }
  return {
    method,
    url,
    headers: {
      'Authorization': authorization()
    },
    params,
    data
  };
}
function wrap(http) {
  http.get = (url, data, cache) => cache(http(options('GET', url, data)));
  http.del = (url, data) => queue(http(options('DELETE', url, data)));
  http.post = (url, data) => queue(http(options('POST', url, data)));
  http.put = (url, data) => queue(http(options('PUT', url, data)));
  return http;
}

export default class Api {
  constructor(http) {
    this.http = wrap(http);
    this.cache = {
      none,
      forever,
      group
    };
  }
  mixin(func) {
  	return func(this);
  }
}