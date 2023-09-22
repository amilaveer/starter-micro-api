var http = require('http');

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
            let text = `You can read http://github.com/huckbit/extract-urls or https://www.npmjs.com/package/extract-urls for more info`;
            urls = getUrls(text);
        });
  

      res.statusCode = 201
      res.write(`###### ${urls} ####### ${ids}!`);
      res.end()
    })
}).listen(process.env.PORT || 3000);

getUrls = (str, lower = false) => {
    const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
    const bracketsRegexp = /[()]/g;
  
    if (typeof str !== "string") {
      throw new TypeError(`The str argument should be a string, got ${typeof str}`);
    }
  
    if (str) {
      let urls = str.match(regexp);
      if (urls) {
        return lower ? urls.map((item) => item.toLowerCase().replace(bracketsRegexp, "")) : urls.map((item) => item.replace(bracketsRegexp, ""));
      } else {
        undefined;
      }
    } else {
      undefined;
    }
  };