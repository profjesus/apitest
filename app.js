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
    var titulo = xpath.select("/rss/channel/item[1]/title", doc)[0].firstChild.data;
    var select = xpath.useNamespaces({"Concellos": "Concellos"});
    var data = select("/rss/channel/item[1]/Concellos:dataPredicion", doc)[0].firstChild.data;
    var maxima = select("/rss/channel/item[1]/Concellos:tMax", doc)[0].firstChild.data;
    var minima = select("/rss/channel/item[1]/Concellos:tMin", doc)[0].firstChild.data;
    var ceoManha = select("/rss/channel/item[1]/Concellos:ceoM", doc)[0].firstChild.data;
    var ceoTarde = select("/rss/channel/item[1]/Concellos:ceoT", doc)[0].firstChild.data;
    var ceoNoite = select("/rss/channel/item[1]/Concellos:ceoN", doc)[0].firstChild.data;
    var fonte = xpath.select("/rss/channel/item[1]/link", doc)[0].firstChild.data;
    resp.send({
      titulo: titulo,
      data: data,
      maxima: maxima,
      minima: minima,
      ceoManha: ceoManha,
      ceoTarde: ceoTarde,
      ceoNoite: ceoNoite,
      fonte: fonte
    });
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
