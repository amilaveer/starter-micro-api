var http = require('http');
http.createServer(function (req, res) {

    let data = [];
    req.on("data", d => {
      data.push(d);
    })
    .on("end", () => {
        
        let dataMap = data[0];
        let ids = [];
        dataMap.forEach((element) => ids.push(element.Id));
  

      res.statusCode = 201
      res.write(`Just got a request at ${ids}!`);
      res.end()
    })
}).listen(process.env.PORT || 3000);