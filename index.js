var http = require('http');

http.createServer(function (req, res) {

    let data = [];
    let responseData = [];
    req.on("data", d => {
      data.push(d);
    })
    .on("end", () => {
        
        let dataMap = JSON.parse(data[0]);
        let urls = [];
        dataMap.forEach((element) => {
            let fileText = unescape(decodeURI(element.fileText));
            urls = getUrls(fileText);
            let responseRecord = {Id : element.Id, urls : urls};
            responseData.push(responseRecord);
        });
        

      res.statusCode = 201
      res.write(JSON.stringify(responseData));
      res.end()
    })
}).listen(process.env.PORT || 3000);

getUrls = (fileText, lower = false) => {
    const regexp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
    const bracketsRegexp = /[()]/g;
  
    if (fileText) {
      let urls = fileText.match(regexp);
      if (urls) {
        return lower ? urls.map((item) => item.toLowerCase().replace(bracketsRegexp, "")) : urls.map((item) => item.replace(bracketsRegexp, ""));
      } else {
        undefined;
      }
    } else {
      undefined;
    }
  };