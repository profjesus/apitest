const express = require('express')
const request = require('request');
const xpath = require('xpath')
  , dom = require('xmldom').DOMParser
  , serializer = require('xmldom').XMLSerializer;

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/predicion/:vila', (req, resp) => {
  request('http://servizos.meteogalicia.gal/rss/predicion/rssLocalidades.action?idZona=' + req.params.vila
    + '&dia=-1&request_locale=gl', (err, res, body) => {
    if (err) { return console.log(err); }
    var doc = new dom().parseFromString(body);
    var nodes = xpath.select("/rss/channel/item[1]/description", doc);
    resp.send(nodes[0].firstChild.data);
  });
});

app.get('/predicionhtml/:vila', (req, resp) => {
  request('http://servizos.meteogalicia.gal/rss/predicion/rssLocalidades.action?idZona=' + 36057/*req.params.vila*/
    + '&dia=-1&request_locale=gl', (err, res, body) => {
    if (err) { return console.log(err); }
    var doc = new dom().parseFromString(body);
    var nodes = xpath.select("/rss/channel/item[1]/description", doc);
    // Using xmldom to parse the html code inside the description element
    var html = new dom().parseFromString(nodes[0].firstChild.data);
    var images = xpath.select("//img", html);
    console.log(images.length);
    images.forEach(image => {
      var imgsource = image.getAttribute("src");
      imgsource = "https://www.meteogalicia.gal" + imgsource;
      image.setAttribute("src", imgsource);
    });
    resp.send(new serializer().serializeToString(html));
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
