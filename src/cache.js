var cache = {
  forever: {},
  groups: {}
};

export function none(func) {
  return func;
}

export function forever(func) {
  return function (...args) {
    var key = args.join(':');
    if(!cache.forever[key]) {
      cache.forever[key] = func(args);
    }
    return cache.forever[key];
  };
}

export function group(name) {
  return function (func) {
    return function (...args) {
      var key = args.join(':');
      if(!cache.groups[name][key]) {
        cache.groups[name][key] = func(args);
      }
      return cache.groups[name][key];
    };
  };
}