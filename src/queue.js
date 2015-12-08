var queued = [];
var isExecuting = false;

function addToQueue(func, args) {
  return new Promise((resolve, reject) => {
    queued.push({func, args, resolve, reject});
  });
}

function next() {
  if(isExecuting) { return; }
  if(!queued.length) { return; }
  isExecuting = true;

  var cmd = queued.shift();
  cmd.func(...cmd.args)
    .then(result => {
      isExecuting = false;
      next();
      cmd.resolve(result);
    })
    .catch(err => {
      isExecuting = false;
      next();
      cmd.reject(err);
    });
}

export default function queue(func) {
  return function () {
    var promise = addToQueue(func, arguments);
    next();
    return promise;
  };
}
