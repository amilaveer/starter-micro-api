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
    //const regexp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
    const regexp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    const bracketsRegexp = /[()]/g;

    const httpwwwString = '^https?';
    const httpwwwwregexp = new RegExp(httpwwwString);

    const wwwString = '^www\.';
    const wwwwregexp = new RegExp(wwwString);
  
    if (fileText) {
      let urls = fileText.match(regexp);
      let normalizedUrls = [];
      if (urls) {

        urls.forEach(function(url,index) { 
            if(!httpwwwwregexp.test(url)){

                //normalizedUrls.push('http://'+url);
                let normalizedUrl = url;
                if(wwwwregexp.test(url)){
                    normalizedUrl = 'http://'+url;
                } else {

                    let domain = url.split('/')[0];
                    urlParts = domain.split('.');
                    if(urlParts.size()==0){
                        if(urlParts[1]=='com' || urlParts[1]=='net' || urlParts[1]=='io'){
                            normalizedUrl = 'http://'+url;
                        }
                    }
                    normalizedUrls.push(normalizedUrl);

                }

            } else{
                normalizedUrls.push(url);
            }
         })  

        return lower ? normalizedUrls.map((item) => item.toLowerCase().replace(bracketsRegexp, "")) : normalizedUrls.map((item) => item.replace(bracketsRegexp, ""));
      } else {
        undefined;
      }
    } else {
      undefined;
    }
  };