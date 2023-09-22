var http = require('http');
http.createServer(function (req, res) {

    let data = []
    let i = 0;
    req.on("data", d => {
      data.push(i+ d)
      i++;5
    })
    .on("end", () => {
      data = Buffer.concat(data).toString()
      res.statusCode = 201
      res.write(`Just got a request at ${data}!`);
      res.end()
    })
}).listen(process.env.PORT || 3000);