var port = Number(process.env.PORT || 8000),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    proxy = require('express-http-proxy');


app.use("/", express.static(__dirname + '/'));

 
app.use('/public', proxy('https://www.touchnote.com', {
  forwardPath: function(req, res) {
    return require('url').parse(/public/ + req.url).path;
  }
}));

server.listen(port, function(req, res) {

  console.log("Express server listening on port %d", port);
  
});