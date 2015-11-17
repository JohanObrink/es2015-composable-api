var queued = [];
var isExecuting = false;

function next() {
  if(isExecuting) { return; }
  if(!queued.length) { return; }
  isExecuting = true;

  var cmd = queued.shift();
  cmd.func(...cmd.args)
    .then(result => {
      isExecuting = false;
      next();
      return result;
    })
    .catch(err => {
      isExecuting = false;
      next();
      return Promise.reject(err);
    });
}

export default function queue(func) {
  return function (...args) {
    queued.push({func, args});
    next();
  };
}
