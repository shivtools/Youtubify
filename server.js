var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);
console.log("Connected to 8080. Serve up by going to localhost:8080/index.html");