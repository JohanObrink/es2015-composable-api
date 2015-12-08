var finalhandler = require('finalhandler'),
  http = require('http'),
  https = require('https'),
  url = require('url'),
  _ = require('lodash'),
  serveStatic = require('serve-static');


// disable all sensible security
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Serve up public/ftp folder
var serve = serveStatic('./', {'index': ['angular.html']});
var apiHost = 'auth.s36.tdeappt03.swedbank.net';


// Create server
var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  console.log(req.url);
  if(req.url === '/' || req.url.match(/.js$/) || req.url.match(/.map$/)) {
    serve(req, res, done);
  } else {
    req.pause();

    var options = _.assign(url.parse(req.url), {
      protocol: 'https:',
      host: apiHost,
      method: req.method,
      headers: _.assign(req.headers, {
        host: apiHost,
        origin: 'https://' + apiHost
      })
    });

    var proxyReq = https.request(options);

    proxyReq.on('response', function (proxyRes) {
      Object.keys(proxyRes.headers).forEach(function (name) {
        res.setHeader(name, proxyRes.headers[name]);
      });
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);

    req.resume();
  }
});

// Listen
server.listen(3000);