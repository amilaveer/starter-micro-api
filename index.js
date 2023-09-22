var http = require('http');
const extractUrls = require("./node_modules/extract-urls");
http.createServer(function (req, res) {

    let data = [];
    req.on("data", d => {
      data.push(d);
    })
    .on("end", () => {
        
        let dataMap = JSON.parse(data[0]);
        let ids = [];
        let urls = [];
        dataMap.forEach((element) => {
            ids.push(element.Id);
            let text = `You can read https://github.com/huckbit/extract-urls or https://www.npmjs.com/package/extract-urls for more info`;
            urls = extractUrls(text);
        });
  

      res.statusCode = 201
      res.write(`###### ${urls} ####### ${ids}!`);
      res.end()
    })
}).listen(process.env.PORT || 3000);