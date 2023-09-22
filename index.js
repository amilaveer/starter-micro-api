var http = require('http');
http.createServer(function (req, res) {

    let data = [];
    req.on("data", d => {
      data.push(d);
    })
    .on("end", () => {
      //data = Buffer.concat(data).toString()
      res.statusCode = 201
      res.write(`Just got a request at ${data.length}!`);
      res.end()
    })
}).listen(process.env.PORT || 3000);