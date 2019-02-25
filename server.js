const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => {

  let addr = request.url;
  let q = url.parse(addr, true);
  let filePath = '';
  let timeStamp = new Date();

  if (q.pathname.includes('documentation')) {
    filePath = `${__dirname}/documentation.html`;
  } else {
    filePath = `${__dirname}/index.html`;
  }

  fs.appendFile('log.txt', 'URL: ' + q.path + '\nTimestamp: ' + timeStamp + '\n\n', function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Added to log.');
    }
  });

  fs.readFile(filePath, function(err, data) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  })

}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
