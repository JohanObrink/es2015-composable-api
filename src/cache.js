var cache = {
  forever: {},
  groups: {}
};

export function none(http, options) {
  return http(options);
}

export function forever(http, options) {
  var key = JSON.stringify(options);
  if(!cache.forever[key]) {
    cache.forever[key] = http(options);
  }
  return cache.forever[key];
}

export function group(name) {
  return function (http, options) {
    var key = JSON.stringify(options);
    if(!cache.groups[name][key]) {
      cache.groups[name][key] = http(options);
    }
    return cache.groups[name][key];
  };
}